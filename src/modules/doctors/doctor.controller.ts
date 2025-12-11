// src/modules/doctors/doctor.controller.ts
import { Request, Response, NextFunction } from 'express';
import { DoctorService } from './doctor.service';

export const DoctorController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, specialization, location } = req.body;
      if (!name) {
        return res.status(400).json({ message: 'Name is required' });
      }
      const doctor = await DoctorService.createDoctor({
        name,
        specialization,
        location
      });
      res.status(201).json(doctor);
    } catch (err) {
      next(err);
    }
  },

  list: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const doctors = await DoctorService.listDoctors();
      res.json(doctors);
    } catch (err) {
      next(err);
    }
  }
};
