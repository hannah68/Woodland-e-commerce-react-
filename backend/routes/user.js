import { Router } from "express";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);

export default router;