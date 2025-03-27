/* imports */
const { check } = require('express-validator');

/* Validation functions for enrollment endpoints */

const idValidation = () => [
    check('id').notEmpty().withMessage("ID is required").isInt({min: 0}).withMessage("ID should be a positive integer"),
];

const courseIdValidation = () => [
    check('course_id').notEmpty().withMessage("Course ID is required").isInt({min: 0}).withMessage("Course ID should be a positive integer"),
];

const studentIdValidation = () => [
    check('student_id').isInt({min: 0}).withMessage("Student ID should be a positive integer"),
];

const insertEnrollmentValidation = [
    ...courseIdValidation(),
    ...studentIdValidation(),
];

const updateEnrollmentValidation = [
    ...courseIdValidation(),
    ...studentIdValidation(),
];

const getEnrollmentByIdValidation =[
    ...idValidation(),
];

const deleteEnrollmentByIdValidation =[
    ...idValidation(),
];


/* exports */
module.exports = {
    insertEnrollmentValidation,
    updateEnrollmentValidation,
    getEnrollmentByIdValidation,
    deleteEnrollmentByIdValidation
};