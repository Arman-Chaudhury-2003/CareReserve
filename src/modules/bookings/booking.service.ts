// src/modules/bookings/booking.service.ts
import { prisma } from "../../db/client";

export const BookingService = {
  createBooking: async (data: {
    userId: string;
    slotId: string;
    numSeats: number;
  }) => {
    const { userId, slotId, numSeats } = data;

    // Concurrency-safe booking using a transaction
    return prisma.$transaction(async (tx: any) => {
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

  getBookingById: async (id: string) => {
    return prisma.booking.findUnique({
      where: { id },
    });
  },
};
