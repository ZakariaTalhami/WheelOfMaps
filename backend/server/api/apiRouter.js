import { Router } from "express";
import bookRouter from "./Book/routes";
import locationRouter from "./Location/routes";
import characterRouter from "./Character/routes";

const router = Router();

router.use("/book", bookRouter);
router.use("/location", locationRouter);
router.use("/character", characterRouter);

export default router;
