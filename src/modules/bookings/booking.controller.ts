// src/modules/bookings/booking.controller.ts
import { Request, Response, NextFunction } from "express";
import { BookingService } from "./booking.service";
import { prisma } from "../../db/client";

export const BookingController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;
      if (!user) {
        return res.status(401).json({ message: "Unauthenticated" });
      }

      const { slotId, numSeats } = req.body;

      if (!slotId) {
        return res.status(400).json({ message: "slotId is required" });
      }

      const seats = numSeats ? Number(numSeats) : 1;

      const booking = await BookingService.createBooking({
        userId: user.id,
        slotId,
        numSeats: seats,
      });

      res.status(201).json(booking);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const booking = await BookingService.getBookingById(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (err) {
      next(err);
    }
  },
  listBySlot: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { slotId } = req.params;
      const bookings = await prisma.booking.findMany({ where: { slotId } });
      res.json(bookings);
    } catch (err) {
      next(err);
    }
  },
};
