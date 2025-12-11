import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { requireAdmin } from "../../middleware/requireAdmin";

export const doctorRouter = Router();

// Only admin can create doctors
doctorRouter.post("/", requireAdmin, DoctorController.create);

// Anyone can list doctors
doctorRouter.get("/", DoctorController.list);
