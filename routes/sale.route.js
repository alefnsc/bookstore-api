import express from "express";
import SaleController from "../controllers/sale.controller.js";
import { authorize } from "../auth/basicAuth.js";
const router = express.Router();

router.post("/", authorize("admin", "user"), SaleController.createSale);
router.get("/:id", authorize("admin"), SaleController.getSale);
router.get("/", authorize("admin", "user"), SaleController.getSales);
router.put("/", authorize("admin"), SaleController.updateSale);

export default router;
