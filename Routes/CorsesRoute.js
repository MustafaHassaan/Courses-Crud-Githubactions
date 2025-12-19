const exp = require("express");
const router = exp.Router();
const CoursesController = require("../Controllers/CorsesController");
const VR = require("../Middleware/Validations");

// Get All List Data
router
  .route("/")
  .get(CoursesController.GetAllCorses)
  .post(VR(), CoursesController.AddCorse);

//Get Single From List Data By Id
router
  .route("/:id")
  .get(CoursesController.GetSingleCorses)
  .patch(VR(), CoursesController.UpdateCorse)
  .delete(CoursesController.DeleteCorse);

module.exports = router;
