"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = require("express");
const doctor_controller_1 = require("./doctor.controller");
const requireAdmin_1 = require("../../middleware/requireAdmin");
exports.doctorRouter = (0, express_1.Router)();
// Only admin can create doctors
exports.doctorRouter.post("/", requireAdmin_1.requireAdmin, doctor_controller_1.DoctorController.create);
// Anyone can list doctors
exports.doctorRouter.get("/", doctor_controller_1.DoctorController.list);
