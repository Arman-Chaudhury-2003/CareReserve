// src/modules/doctors/doctor.service.ts
import { prisma } from '../../db/client';

export const DoctorService = {
  createDoctor: async (data: {
    name: string;
    specialization?: string;
    location?: string;
  }) => {
    return prisma.doctor.create({ data });
  },

  listDoctors: async () => {
    return prisma.doctor.findMany();
  }
};
