import { Router } from "express";

import { getAllProducts, getSearchValue } from "../controllers/product.js";

const router = Router();

router.get("/:searchvalue", getSearchValue);
router.get("/", getAllProducts);


export default router;