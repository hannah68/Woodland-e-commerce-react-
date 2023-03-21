import { Router } from "express";
import { addItemsToBasket, getItemsFromBasket } from "../controllers/basket.js";
import { isLoggedIn } from "../middleware.js";

const router = Router();

router.post("/", isLoggedIn, addItemsToBasket);
router.get("/:userId", isLoggedIn, getItemsFromBasket);

export default router;
