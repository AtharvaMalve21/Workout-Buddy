const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors") ;
dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));

//connect to DB
const connectDB = require("./config/database");
connectDB();

const workouts = require("./routes/workouts");

app.use("/api/workouts",cors(), workouts);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
