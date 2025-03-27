/* imports */
const { createExam, getAllExams, getExamById, updateExam, deleteExam } = require('../services/exam.service');
const { validationResult } = require('express-validator');


/**
 * 
 * @param {*} req 
 * @param {*} res
 * creates a exam, calls createExam from the service file 
 * @returns user friendly response based on the service response
 */
const createExamController = async(req, res) => {
    /* validation(400) */
   const errors = validationResult(req);

   if(!errors.isEmpty()) {
    return res.status(400).json({error: errors.array().map(error => error.msg)});
   }

   try {
    const examData = req.body;
    const response = await createExam(examData);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * gets all exams, calls getAllExams from the service file
 * @returns user friendly response based on the service response
 */
const getAllExamsController = async(req, res) => {
    /* validation(400) */
   try {
    const response = await getAllExams();
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * get one exam based on the id, calls getExamById from the service file 
 * @returns user friendly response based on the service response
 */
const getExamByIdController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
     return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const response = await getExamById(id);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * update exam, calls updateExam from the service file
 * @returns user friendly response based on the service response
 */
const updateExamController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
     return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const updatedData = req.body;
    const response = await updateExam(id, updatedData);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * delete a exam, calls deleteExam from the service file 
 * @returns user friendly response based on the service response
 */
const deleteExamController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const response = await deleteExam(id);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}


/* exports */
module.exports = {
    createExamController,
    getAllExamsController,
    getExamByIdController,
    updateExamController,
    deleteExamController,
}