import express from 'express';
import {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpayPayment} from '../controllers/userController.js'; 
import userAuth from '../middlewares/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', userAuth, userCredits);
userRouter.post('/payment', userAuth, paymentRazorpay);
userRouter.post('/verify-payment', verifyRazorpayPayment);

export default userRouter;