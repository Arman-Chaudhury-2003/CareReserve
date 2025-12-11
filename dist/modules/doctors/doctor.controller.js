"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const doctor_service_1 = require("./doctor.service");
exports.DoctorController = {
    create: async (req, res, next) => {
        try {
            const { name, specialization, location } = req.body;
            if (!name) {
                return res.status(400).json({ message: 'Name is required' });
            }
            const doctor = await doctor_service_1.DoctorService.createDoctor({
                name,
                specialization,
                location
            });
            res.status(201).json(doctor);
        }
        catch (err) {
            next(err);
        }
    },
    list: async (_req, res, next) => {
        try {
            const doctors = await doctor_service_1.DoctorService.listDoctors();
            res.json(doctors);
        }
        catch (err) {
            next(err);
        }
    }
};
