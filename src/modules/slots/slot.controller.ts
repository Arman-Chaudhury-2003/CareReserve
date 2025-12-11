// src/modules/slots/slot.controller.ts
import { Request, Response, NextFunction } from 'express';
import { SlotService } from './slot.service';

export const SlotController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { doctorId, startTime, endTime, totalCapacity } = req.body;
      if (!doctorId || !startTime) {
        return res
          .status(400)
          .json({ message: 'doctorId and startTime are required' });
      }

      const slot = await SlotService.createSlot({
        doctorId,
        startTime: new Date(startTime),
        endTime: endTime ? new Date(endTime) : undefined,
        totalCapacity
      });

      res.status(201).json(slot);
    } catch (err) {
      next(err);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { doctorId } = req.query;
      const slots = await SlotService.listSlots(
        doctorId ? String(doctorId) : undefined
      );
      res.json(slots);
    } catch (err) {
      next(err);
    }
  }
};
