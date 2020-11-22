import express from 'express';

import indexRouter from './routes/index';
import testsRouter from './routes/tests';
import usersRouter from './routes/user';

var router = express.Router();

router.use("/", indexRouter);
router.use("/tests", testsRouter);
router.use("/users", usersRouter);

export default router;
