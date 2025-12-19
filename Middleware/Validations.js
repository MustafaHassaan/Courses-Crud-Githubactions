const { body } = require("express-validator");

const VR = () => {
  return [
    body("id").notEmpty().withMessage("id is required"),
    body("course_name").notEmpty().withMessage("course name is required"),
    body("duration_hours").notEmpty().withMessage("duration hours is required"),
    body("price").notEmpty().withMessage("price is required"),
  ];
};

module.exports = VR;
