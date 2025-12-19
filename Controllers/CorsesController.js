const { validationResult } = require("express-validator");
let Courses = require("../Data/Courses");
const GetAllCorses = (req, res) => {
  res.status(200).json(Courses);
};
const GetSingleCorses = (req, res) => {
  const cid = req.params.id;
  const course = Courses.find((c) => c.id === cid);
  res.status(200).json(course);
};

const AddCorse = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    res.status(400).json(err.array());
  } else {
    Courses.push({
      ...req.body,
    });
    res.status(201).json(Courses);
  }
};

const UpdateCorse = (req, res) => {
  const cid = req.params.id;
  const courseIndex = Courses.findIndex((c) => c.id === cid);
  if (courseIndex === -1) return res.status(404).json("Course not found ...");

  // PATCH يسمح بتحديث أي حقل، مش لازم كل الحقول
  Courses[courseIndex] = { ...Courses[courseIndex], ...req.body };
  res.status(200).json(Courses[courseIndex]);
};

const DeleteCorse = (req, res) => {
  const cid = req.params.id;
  Courses = Courses.filter((c) => c.id !== cid);
  res.status(200).json(Courses);
};

module.exports = {
  GetAllCorses,
  GetSingleCorses,
  AddCorse,
  UpdateCorse,
  DeleteCorse,
};
