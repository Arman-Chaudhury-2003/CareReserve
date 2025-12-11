import { Router } from "express";
import { SlotController } from "./slot.controller";
import { requireAdmin } from "../../middleware/requireAdmin";

export const slotRouter = Router();

slotRouter.post("/", requireAdmin, SlotController.create);

// Anyone can list doctors
slotRouter.get("/", SlotController.list);
