/* imports */
const express = require('express');
const {
  createEnrollmentController,
  getAllEnrollmentsController,
  getEnrollmentByIdController,
  updateEnrollmentController,
  deleteEnrollmentController,
} = require("../controllers/enrollment.controller");

const { insertEnrollmentValidation,
  updateEnrollmentValidation,
  getEnrollmentByIdValidation,
  deleteEnrollmentByIdValidation,
} = require('../validation/enrollment.validator');

/* router */
const router = express.Router();

/* routes */
router.get("/getAll", getAllEnrollmentsController);
router.get("/get/:id", getEnrollmentByIdValidation, getEnrollmentByIdController);
router.post("/create", insertEnrollmentValidation, createEnrollmentController);
router.put("/update/:id", updateEnrollmentValidation, updateEnrollmentController);
router.delete("/delete/:id", deleteEnrollmentByIdValidation, deleteEnrollmentController);

/* exports */
module.exports = router;