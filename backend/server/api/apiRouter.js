import { Router } from "express";
import bookRouter from "./book/routes";
import locationRouter from "./location/routes";
import characterRouter from "./character/routes";

const router = Router();

router.use("/book", bookRouter);
router.use("/location", locationRouter);
router.use("/character", characterRouter);

export default router;
