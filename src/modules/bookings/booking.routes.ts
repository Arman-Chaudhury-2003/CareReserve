// src/modules/bookings/booking.routes.ts
import { Router } from 'express';
import { BookingController } from './booking.controller';

export const bookingRouter = Router();

// Create booking
bookingRouter.post('/', BookingController.create);

// Get booking by id
bookingRouter.get('/:id', BookingController.getById);

bookingRouter.get("/slot/:slotId", BookingController.listBySlot);
