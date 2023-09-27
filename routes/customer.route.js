import express from "express";
import CustomerController from "../controllers/customer.controller.js";
import { authorize } from "../auth/basicAuth.js";

const router = express.Router();

router.post("/", authorize("admin"), CustomerController.createCustomer);
router.get("/:id", authorize("admin"), CustomerController.getCustomer);
router.get("/", authorize("admin"), CustomerController.getCustomers);
router.put("/", authorize("admin"), CustomerController.updateCustomer);
router.delete("/:id", authorize("admin"), CustomerController.deleteCustomer);

export default router;
