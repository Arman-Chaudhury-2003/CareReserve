"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRouter = void 0;
// src/modules/bookings/booking.routes.ts
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
exports.bookingRouter = (0, express_1.Router)();
// Create booking
exports.bookingRouter.post('/', booking_controller_1.BookingController.create);
// Get booking by id
exports.bookingRouter.get('/:id', booking_controller_1.BookingController.getById);
exports.bookingRouter.get("/slot/:slotId", booking_controller_1.BookingController.listBySlot);
