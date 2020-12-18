import logger from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import path from "path";
import indexRouter from "../routes";
import bodyParser from "body-parser";
import { errors } from "celebrate";
export default async ({ app }) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, "../../public")));

  //  Include the router
  app.use("/", indexRouter);

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
