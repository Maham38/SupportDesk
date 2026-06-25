const { body, validationResult } = require("express-validator");

exports.ticketValidation = [
  body("customerName").notEmpty().withMessage("Name required"),

  body("customerEmail").isEmail().withMessage("Valid email required"),

  body("subject").notEmpty().withMessage("Subject required"),

  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be 10+ characters"),

  body("priority")
    .isIn(["Low", "Medium", "High"])
    .withMessage("Invalid priority")
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }

  next();
};