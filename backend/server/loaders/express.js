import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import indexRouter from "../routes";
import path from 'path'

export default async ({ app }) => {

    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../public')));
    
    //  Include the router
    app.use("/", indexRouter);
    
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        next(createError(404));
    });
    
    // error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.json({'error': err.message});
    });

    return app;
};