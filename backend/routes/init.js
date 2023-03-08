import { Router } from "express";

import { seedProductDB } from "../controllers/init";

const router = Router();

router.post("/", seedProductDB);

export default router;