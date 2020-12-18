import express from "express";

import indexRouter from "./routes/index";
import testsRouter from "./routes/tests";
import usersRouter from "./routes/user";
import apiRouter from "./api/apiRouter";

var router = express.Router();

router.use("/", indexRouter);
router.use("/tests", testsRouter);
router.use("/users", usersRouter);
router.use("/api", apiRouter);

export default router;
