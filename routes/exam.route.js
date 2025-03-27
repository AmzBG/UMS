/* imports */
const express = require('express');
const {
    createExamController,
    getAllExamsController,
    getExamByIdController,
    updateExamController,
    deleteExamController,
  } = require("../controllers/exam.controller");
  
  const { 
    insertExamValidation,
    updateExamValidation,
    getExamByIdValidation,
    deleteExamByIdValidation,
  } = require('../validation/exam.validator');

/* router */
const router = express.Router();

/* routes */
router.get("/getAll", getAllExamsController);
router.get("/get/:id", getExamByIdValidation, getExamByIdController);
router.post("/create", insertExamValidation, createExamController);
router.put("/update/:id", updateExamValidation, updateExamController);
router.delete("/delete/:id", deleteExamByIdValidation, deleteExamController);

/* exports */
module.exports = router;