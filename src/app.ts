// src/app.ts
import express from "express";
import cors from "cors";
import { json } from "body-parser";

import { doctorRouter } from "./modules/doctors/doctor.routes";
import { slotRouter } from "./modules/slots/slot.routes";
import { bookingRouter } from "./modules/bookings/booking.routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFoundHandler } from "./middleware/notFoundHandler";
import { authMock } from "./middleware/authMock";

export const app = express();

app.use(cors());
app.use(json());

// simple health endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// mock auth (just sets req.user = { id, role })
app.use(authMock);

// main routes
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/slots", slotRouter);
app.use("/api/v1/bookings", bookingRouter);

// 404 + error handling
app.use(notFoundHandler);
app.use(errorHandler);
