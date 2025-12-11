"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingController = void 0;
const booking_service_1 = require("./booking.service");
const client_1 = require("../../db/client");
exports.BookingController = {
    create: async (req, res, next) => {
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
            const booking = await booking_service_1.BookingService.createBooking({
                userId: user.id,
                slotId,
                numSeats: seats,
            });
            res.status(201).json(booking);
        }
        catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            const { id } = req.params;
            const booking = await booking_service_1.BookingService.getBookingById(id);
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.json(booking);
        }
        catch (err) {
            next(err);
        }
    },
    listBySlot: async (req, res, next) => {
        try {
            const { slotId } = req.params;
            const bookings = await client_1.prisma.booking.findMany({ where: { slotId } });
            res.json(bookings);
        }
        catch (err) {
            next(err);
        }
    },
};
