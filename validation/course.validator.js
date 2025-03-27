/* imports */
const { check } = require('express-validator');

/* Validation functions for course endpoints */

const idValidation = () => [
    check('id').notEmpty().withMessage("ID is required")
    .isInt({min: 0}).withMessage("ID should be a positive integer"),
];

const nameValidation = () => [
    check('name').notEmpty().withMessage("Name is required")
    .isLength({min: 4, max: 45}).withMessage("Name should be between 4 and 45 characters long"),
];

const codeValidation = () => [
    check('code').notEmpty().withMessage("Code is required"),
    check('code').isLength({ min: 7, max: 7 }).withMessage("Code should be 7 characters long"),
    check('code').matches(/^[A-Z]{4}\d{3}$/).withMessage("Invalid code format"),
    check('code').custom((value) => {
        const validPrefixes = ['CSIS', 'MATH', 'ENGL', 'ECON', 'ACCT', 'CSPR', 'LISP'];
        const codePrefix = value.substring(0, 4);
        if (!validPrefixes.includes(codePrefix)) {
            throw new Error("Invalid code value");
        }
        return true;
    }),     
];

const creditsValidation = () => [
    check('credits').notEmpty().withMessage("Credits is required"),
    check('credits').isIn(['1', '3', '6']).withMessage("Invalid credits value"),
];

const typeValidation = () => [
    check('type').notEmpty().withMessage("Type is required"),
    check('type').isIn(['Major Course', 'Normal Course', 'Lab']).withMessage("Invalid type value"),
];

const dayValidation = () => [
    check('day').notEmpty().withMessage("Day is required"),
    check('day').isIn(['M/W', 'T/TH', 'M', 'T', 'W', 'TH']).withMessage("Invalid day value"),
];

const timingValidation = () => [
    check('timing').notEmpty().withMessage("Timing is required"),
    check('timing').isIn(['8:00-9:30', '9:30-11:00', '11:00-12:30', '12:30-2:00', '2:00-3:30', '3:30-5:00']).withMessage("Invalid timing value"),
];

const capacityValidation = () => [
    check('capacity').notEmpty().withMessage("Capacity is required"),
    check('capacity').isInt({min: 5, max: 40}).withMessage("Capacity should be between 5 and 40"),
    check('capacity').custom((value, { req }) => {
        const enrolled = req.body.enrolled || 0; // In case enrolled was not provided in the request body
        const capacity = req.body.capacity;

        if (capacity < enrolled) {
            throw new Error('Capacity must be greater than or equal to the number of enrolled students');
        }

        return true;
    }),
];

const enrolledValidation = () => [
    check('enrolled').notEmpty().withMessage("Enrolled is required"),
    check('enrolled').isInt({min: 0}).withMessage("Enrolled should be a positive integer"),
];

const insertCourseValidation = [
    ...codeValidation(),
    ...nameValidation(),
    ...creditsValidation(),
    ...typeValidation(),
    ...dayValidation(),
    ...timingValidation(),
    ...capacityValidation(),
    ...enrolledValidation(),
    check('enrolled').equals("0").withMessage("Enrolled should be set to 0 when creating a new course"),
];

const updateCourseValidation = [
    ...idValidation(),
    ...codeValidation(),
    ...nameValidation(),
    ...creditsValidation(),
    ...typeValidation(),
    ...dayValidation(),
    ...timingValidation(),
    ...capacityValidation(),
    ...enrolledValidation(),
];

const getCourseByIdValidation = [
    ...idValidation(),
];

const deleteCourseByIdValidation = [
    ...idValidation(),
];

/* exports */
module.exports = {
    insertCourseValidation,
    updateCourseValidation,
    getCourseByIdValidation,
    deleteCourseByIdValidation
};