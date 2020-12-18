import { Router } from "express";
import bookRouter from "./book/routes";
import locationRouter from "./location/routes";

const router = Router();

router.use("/book", bookRouter);
router.use("/location", locationRouter);

export default router;
