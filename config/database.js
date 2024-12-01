const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`Connected with Db!`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
