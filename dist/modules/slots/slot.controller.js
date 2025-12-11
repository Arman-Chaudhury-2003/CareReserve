"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotController = void 0;
const slot_service_1 = require("./slot.service");
exports.SlotController = {
    create: async (req, res, next) => {
        try {
            const { doctorId, startTime, endTime, totalCapacity } = req.body;
            if (!doctorId || !startTime) {
                return res
                    .status(400)
                    .json({ message: 'doctorId and startTime are required' });
            }
            const slot = await slot_service_1.SlotService.createSlot({
                doctorId,
                startTime: new Date(startTime),
                endTime: endTime ? new Date(endTime) : undefined,
                totalCapacity
            });
            res.status(201).json(slot);
        }
        catch (err) {
            next(err);
        }
    },
    list: async (req, res, next) => {
        try {
            const { doctorId } = req.query;
            const slots = await slot_service_1.SlotService.listSlots(doctorId ? String(doctorId) : undefined);
            res.json(slots);
        }
        catch (err) {
            next(err);
        }
    }
};
