const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    customerName: { 
       type: String, 
       required: true 
    },
    customerEmail: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/
    },

    subject: { 
        type: String, 
        required: true 
    },

    description: {
      type: String,
      required: true,
      minlength: 10
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved"],
      default: "Open"
    },

    urgent: {
      type: Boolean,
      default: false
    },

    activityHistory: [
      {
        action: String,
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);