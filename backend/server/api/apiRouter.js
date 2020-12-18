import { Router } from "express";
import bookRouter from "./book/routes";
const router = Router();

router.use("/book", bookRouter);
export default router;
