/* imports */
const express = require("express");
const {
  openStudentsPage,
  createStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentController,
  deleteStudentController,
  getAllMajorsController,
  searchController,
} = require("../controllers/student.controller");

const { 
  insertStudentValidation,
  updateStudentValidation,
  getStudentByIdValidation,
  deleteStudentByIdValidation,
} = require('../validation/student.validator');

/* router */
const router = express.Router();

/* routes */
router.get('/home', openStudentsPage);
router.get("/getAll", getAllStudentsController);
router.get("/get/:id", getStudentByIdValidation, getStudentByIdController);
router.post("/create", insertStudentValidation, createStudentController);
router.post("/update/:id", updateStudentValidation, updateStudentController); // put --> post
router.get("/delete/:id", deleteStudentByIdValidation, deleteStudentController); // delete --> get
router.get("/search", searchController);

router.get('/getAllMajors', getAllMajorsController);

/* exports */
module.exports = router;