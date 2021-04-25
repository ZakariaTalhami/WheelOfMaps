import express from "express";

import apiRouter from "./api/apiRouter";

var router = express.Router();

router.use("/", apiRouter);

export default router;
