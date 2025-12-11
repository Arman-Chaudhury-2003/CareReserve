"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotRouter = void 0;
const express_1 = require("express");
const slot_controller_1 = require("./slot.controller");
const requireAdmin_1 = require("../../middleware/requireAdmin");
exports.slotRouter = (0, express_1.Router)();
exports.slotRouter.post("/", requireAdmin_1.requireAdmin, slot_controller_1.SlotController.create);
// Anyone can list doctors
exports.slotRouter.get("/", slot_controller_1.SlotController.list);
