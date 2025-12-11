"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotService = void 0;
// src/modules/slots/slot.service.ts
const client_1 = require("../../db/client");
exports.SlotService = {
    createSlot: async (data) => {
        var _a;
        const totalCapacity = (_a = data.totalCapacity) !== null && _a !== void 0 ? _a : 1;
        return client_1.prisma.slot.create({
            data: {
                doctorId: data.doctorId,
                startTime: data.startTime,
                endTime: data.endTime,
                totalCapacity,
                availableCapacity: totalCapacity
            }
        });
    },
    listSlots: async (doctorId) => {
        return client_1.prisma.slot.findMany({
            where: doctorId ? { doctorId, isActive: true } : { isActive: true },
            orderBy: { startTime: 'asc' }
        });
    }
};
