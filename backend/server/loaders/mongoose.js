import mongoose from "mongoose";

export default async () => {
  // should take the URL From the Env

  try {
    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "wheelofmaps",
      user: process.env.DB_USER,
      pass: process.env.DB_PASSWORD,
    });
    const db = mongoose.connection.db;

    console.log("Connected to the Mongoose Database");

    return db;
  } catch (error) {
    console.log(error);
  }
};
