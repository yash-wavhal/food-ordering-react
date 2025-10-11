import express from "express";
import { getAllFoodItems, getFoodItem, getFoodItemsByType, saveFoodItem } from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getAllFoodItems);
router.get("/fooditem/:itemid", getFoodItem);
router.get("/foodtype/:type", getFoodItemsByType);
router.post("/", saveFoodItem);

export default router;