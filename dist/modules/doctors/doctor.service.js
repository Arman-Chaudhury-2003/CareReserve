"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
// src/modules/doctors/doctor.service.ts
const client_1 = require("../../db/client");
exports.DoctorService = {
    createDoctor: async (data) => {
        return client_1.prisma.doctor.create({ data });
    },
    listDoctors: async () => {
        return client_1.prisma.doctor.findMany();
    }
};
