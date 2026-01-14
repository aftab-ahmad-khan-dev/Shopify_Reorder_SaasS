import express from "express";

import ShopifyController from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/orders", ShopifyController.getAllOrders);
router.post("/getOrderById", ShopifyController.getOrderById);
router.post("/reorderOrder", ShopifyController.reorderOrder);
router.post("/generateToken", ShopifyController.generateAccessToken);
router.get("/code", ShopifyController.getAuthLink);

export default router;
