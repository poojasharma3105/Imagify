import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import morgan from "morgan";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "*"
  })
);

// Database Connection with Error Handling
(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit the app on failure
  }
})();

// Routes
app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);
app.get("/", (req, res) => res.send("API Working"));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
