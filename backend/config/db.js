const mongoose = require("mongoose");

mongoose.connection.on("error", (err) => {
  console.log("Mongoose not found");
});

mongoURI =
  "mongodb+srv://projectmanagement:tcejorp@projectmanagement.uaexwyv.mongodb.net/?retryWrites=true&w=majority&appName=ProjectManagement";
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      connectTimeoutMS: 3000,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
