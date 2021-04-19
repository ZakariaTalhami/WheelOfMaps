import mongoose from "mongoose";

export default async () => {
    // should take the URL From the Env
    const DB_HOST = process.env.DB_HOST;
    const DB_PORT = process.env.DB_PORT;

    let DB_ADDRESS = "mongodb";
    if (!DB_PORT) {
        DB_ADDRESS += "+srv";
    }
    DB_ADDRESS += `://${DB_HOST}`;
    if (DB_PORT) {
        DB_ADDRESS += `:${DB_PORT}`;
    }

    console.log(`Connecting to ${DB_ADDRESS}`);
    try {
        await mongoose.connect(DB_ADDRESS, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
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
