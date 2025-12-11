"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
// src/modules/bookings/booking.service.ts
const client_1 = require("../../db/client");
exports.BookingService = {
    createBooking: async (data) => {
        const { userId, slotId, numSeats } = data;
        // Concurrency-safe booking using a transaction
        return client_1.prisma.$transaction(async (tx) => {
            // Try to decrement availableCapacity only if enough seats remain
            const updateResult = await tx.slot.updateMany({
                where: {
                    id: slotId,
                    isActive: true,
                    availableCapacity: {
                        gte: numSeats,
                    },
                },
                data: {
                    availableCapacity: {
                        decrement: numSeats,
                    },
                },
            });
            if (updateResult.count === 0) {
                // Not enough capacity → create FAILED booking
                const failedBooking = await tx.booking.create({
                    data: {
                        userId,
                        slotId,
                        numSeats,
                        status: "FAILED", // BookingStatus enum value
                        failureReason: "Not enough capacity",
                    },
                });
                return failedBooking;
            }
            // Capacity reserved successfully → create CONFIRMED booking
            const booking = await tx.booking.create({
                data: {
                    userId,
                    slotId,
                    numSeats,
                    status: "CONFIRMED", // BookingStatus enum value
                },
            });
            return booking;
        });
    },
    getBookingById: async (id) => {
        return client_1.prisma.booking.findUnique({
            where: { id },
        });
    },
};
