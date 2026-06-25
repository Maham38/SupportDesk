const express = require("express");
const router = express.Router();

const {
  createTicket,
  getTickets,
  getTicketById,
  updateStatus,
  dashboardStats
} = require("../controllers/ticketController");

const {
  ticketValidation,
  validate
} = require("../middleware/validation");
router.post("/tickets", ticketValidation, validate, createTicket);
router.get("/tickets", getTickets);
router.get("/tickets/:id", getTicketById);
router.patch("/tickets/:id/status", updateStatus);
router.get("/dashboard", dashboardStats);

module.exports = router;