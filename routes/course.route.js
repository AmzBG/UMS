/* imports */
const express = require('express');
const {
  openCoursesPage,
  createCourseController,
  getAllCoursesController,
  getCourseByIdController,
  updateCourseController,
  deleteCourseController,
} = require("../controllers/course.controller");

const {
  insertCourseValidation,
  updateCourseValidation,
  getCourseByIdValidation,
  deleteCourseByIdValidation,
} = require('../validation/course.validator');

/* router */
const router = express.Router();

/* routes */
router.get('/home', openCoursesPage);
router.get("/getAll", getAllCoursesController);
router.get("/get/:id", getCourseByIdValidation, getCourseByIdController);
router.post("/create", insertCourseValidation, createCourseController);
router.put("/update/:id", updateCourseValidation, updateCourseController);
router.delete("/delete/:id", deleteCourseByIdValidation, deleteCourseController);

/* exports */
module.exports = router;