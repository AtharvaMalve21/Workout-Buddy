import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import workoutRoutes from "./routes/workout.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//middleware configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
app.use(cookieParser());

//connect to Mongo Database
connectDB();

//route handlers
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/workouts", workoutRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Workout Buddy!" });
});

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
