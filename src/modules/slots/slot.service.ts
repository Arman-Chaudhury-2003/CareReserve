// src/modules/slots/slot.service.ts
import { prisma } from '../../db/client';

export const SlotService = {
  createSlot: async (data: {
    doctorId: string;
    startTime: Date;
    endTime?: Date;
    totalCapacity?: number;
  }) => {
    const totalCapacity = data.totalCapacity ?? 1;
    return prisma.slot.create({
      data: {
        doctorId: data.doctorId,
        startTime: data.startTime,
        endTime: data.endTime,
        totalCapacity,
        availableCapacity: totalCapacity
      }
    });
  },

  listSlots: async (doctorId?: string) => {
    return prisma.slot.findMany({
      where: doctorId ? { doctorId, isActive: true } : { isActive: true },
      orderBy: { startTime: 'asc' }
    });
  }
};
