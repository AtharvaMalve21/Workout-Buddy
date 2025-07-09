import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log(`MongoDb connected successfully.`);
    })
    .catch((err) => {
      console.log("Connection failed");
      console.error(err.message);
      process.exit(1);
    });
};

export default connectDB;
