/* imports */
const { createEnrollment, getAllEnrollments, getEnrollmentById, updateEnrollment, deleteEnrollment } = require('../services/enrollment.service');
const { validationResult } = require('express-validator');


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * creates enrollment, calls createEnrollment from the service file
 * @returns user friendly response based on the service response
 */
const createEnrollmentController = async(req, res) => {
    /* validation(400) */
   const errors = validationResult(req);

   if(!errors.isEmpty()) {
    return res.status(400).json({error: errors.array().map(error => error.msg)});
   }

   try {
    const enrollmentData = req.body;
    const response = await createEnrollment(enrollmentData);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * gets all enrollments, calls getAllEnrollments from the service file
 * @returns user friendly response based on the service response
 */
const getAllEnrollmentsController = async(req, res) => {
    /* validation(400) */
   try {
    const response = await getAllEnrollments();
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * get one enrollment based on the id, calls getEnrollmentById from the service file 
 * @returns user friendly response based on the service response
 */
const getEnrollmentByIdController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
     return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const response = await getEnrollmentById(id);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * update enrollment, calls updateEnrollment from the service file
 * @returns user friendly response based on the service response
 */
const updateEnrollmentController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
     return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const updatedData = req.body;
    const response = await updateEnrollment(id, updatedData);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * delete enrollment, calls deleteEnrollment from the service file 
 * @returns user friendly response based on the service response
 */
const deleteEnrollmentController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const response = await deleteEnrollment(id);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}


/* exports */
module.exports = {
    createEnrollmentController,
    getAllEnrollmentsController,
    getEnrollmentByIdController,
    updateEnrollmentController,
    deleteEnrollmentController,
}