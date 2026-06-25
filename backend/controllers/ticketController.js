const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const { customerName, customerEmail, subject, description, priority } = req.body;

    const urgent =
      priority === "High" ||
      description.toLowerCase().includes("urgent");

    const ticket = await Ticket.create({
      customerName,
      customerEmail,
      subject,
      description,
      priority,
      urgent,
      activityHistory: [
        { action: "Ticket created" }
      ]
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//get all tickets
exports.getTickets = async (req, res) => {
  try {
    const { search, priority, status } = req.query;

    let filter = {};

    if (priority) filter.priority = priority;
    if (status) filter.status = status;

    if (search) {
      filter.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { customerEmail: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } }
      ];
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get single ticket

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket)
      return res.status(404).json({ message: "Ticket not found" });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowed = ["Open", "In Progress", "Resolved"];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const ticket = await Ticket.findById(req.params.id);

    ticket.status = status;
    ticket.activityHistory.push({
      action: `Status changed to ${status}`
    });

    await ticket.save();

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.dashboardStats = async (req, res) => {
  try {
    const total = await Ticket.countDocuments();
    const open = await Ticket.countDocuments({ status: "Open" });
    const inProgress = await Ticket.countDocuments({ status: "In Progress" });
    const resolved = await Ticket.countDocuments({ status: "Resolved" });
    const urgent = await Ticket.countDocuments({ urgent: true });

    res.json({ total, open, inProgress, resolved, urgent });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};