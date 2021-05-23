import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import path from "path";
import indexRouter from "../routes";
import bodyParser from "body-parser";
import { errors } from "celebrate";
import cors from "cors";

export default async ({ app }) => {
    app.use(logger("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "../../public")));

    if (process.env.NODE_ENV === "production") {
        // Host the frontend in production
        app.use(
            express.static(path.join(__dirname, "../../../frontend/build"))
        );

        // Block CRUD API's except read in production
        app.use((req, res, next) => {
            if (req.method !== "GET") {
                next(createError(404));
            }
            next();
        });
    }

    //  Include the router
    app.use("/api/", indexRouter);

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
        next(createError(404));
    });

    // Catch Celebrate Validation Errors
    app.use(errors());

    // error handler
    app.use((err, req, res) => {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.json({ error: err.message });
    });

    return app;
};
