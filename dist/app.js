"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const doctor_routes_1 = require("./modules/doctors/doctor.routes");
const slot_routes_1 = require("./modules/slots/slot.routes");
const booking_routes_1 = require("./modules/bookings/booking.routes");
const errorHandler_1 = require("./middleware/errorHandler");
const notFoundHandler_1 = require("./middleware/notFoundHandler");
const authMock_1 = require("./middleware/authMock");
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, body_parser_1.json)());
// simple health endpoint
exports.app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
// mock auth (just sets req.user = { id, role })
exports.app.use(authMock_1.authMock);
// main routes
exports.app.use("/api/v1/doctors", doctor_routes_1.doctorRouter);
exports.app.use("/api/v1/slots", slot_routes_1.slotRouter);
exports.app.use("/api/v1/bookings", booking_routes_1.bookingRouter);
// 404 + error handling
exports.app.use(notFoundHandler_1.notFoundHandler);
exports.app.use(errorHandler_1.errorHandler);
