import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; 
import razorpay from 'razorpay';
import transactionModel from '../models/transactionModel.js';
import { SchemaTypeOptions } from 'mongoose';

const registerUser = async (req, res) => {
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password) {
            return res.json({success: false, message: "All fields are required"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name, 
            email, 
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.json({success: true, message: "User registered successfully", token, user: {name: user.name}});

    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if(!user) {
            return res.json({success: false, message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            res.json({success: true, message: "User logged in successfully", token, user: {name: user.name}});
        }else{
            return res.json({success: false, message: "Invalid credentials"});
        }

    }catch(err){
        console.log(err);
        res.json({success: false, message: err.message});
    }
}

const userCredits = async (req, res) => {
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        res.json({success: true, credits: user.creditBalance, user: {name: user.name}});
    }catch(e){
        console.log(e);
        res.json({success: false, message: e.message});
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
    try {
        const { userId, planId } = req.body;

        if (!userId || !planId) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Check if there's an existing pending transaction for this user and plan
        const existingTransaction = await transactionModel.findOne({ userId, plan: planId, payment: false });
        if (existingTransaction) {
            return res.json({ success: false, message: "You already have a pending transaction for this plan." });
        }

        let credits, amount;
        switch (planId) {
            case 'Basic': credits = 100; amount = 10; break;
            case 'Advanced': credits = 500; amount = 50; break;
            case 'Business': credits = 5000; amount = 250; break;
            default: return res.json({ success: false, message: "Invalid plan" });
        }

        const newTransaction = await transactionModel.create({ userId, plan: planId, amount, credits });

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id.toString(),
        };

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                return res.json({ success: false, message: error.message });
            }
            res.json({ success: true, order });
        });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};


const verifyRazorpayPayment = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        if (!razorpay_order_id) {
            return res.json({ success: false, message: "Order ID is required" });
        }

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === "paid") {
            const transactionData = await transactionModel.findById(orderInfo.receipt);

            if (!transactionData) {
                return res.json({ success: false, message: "Transaction not found" });
            }

            if (transactionData.payment) {
                return res.json({ success: false, message: "Payment already processed" });
            }

            const userData = await userModel.findById(transactionData.userId);
            if (!userData) {
                return res.json({ success: false, message: "User not found" });
            }

            const updatedCredits = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance: updatedCredits });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            return res.json({ success: true, message: "Payment successful, credits added" });
        } else {
            return res.json({ success: false, message: "Payment failed" });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};

export {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpayPayment};