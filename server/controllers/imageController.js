import axios from "axios";
import userModel from "../models/userModel.js";
import FormData from "form-data";

const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;

        const user = await userModel.findById(userId);

        if (!user || !prompt) {
            return res.json({ success: false, message: "User not found or missing details." });
        }

        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: "Insufficient Credits. Please top up your account." });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                "x-api-key": process.env.CLIPDROP_API,
                "Content-Type": "multipart/form-data",
            },
            responseType: "arraybuffer"
        });

        const base64Image = Buffer.from(data, "binary").toString("base64");
        console.log("Base64 Image Length:", base64Image.length);

        const resultImage = `data:image/png;base64,${base64Image}`;

        // Atomic update using $inc to prevent concurrency issues
        await userModel.findByIdAndUpdate(userId, { $inc: { creditBalance: -1 } });

        res.json({ success: true, message: "Image generated successfully", creditBalance: user.creditBalance - 1, resultImage });

    } catch (err) {
        console.error(err);
        res.json({ success: false, message: err.message });
    }
};

export { generateImage };
