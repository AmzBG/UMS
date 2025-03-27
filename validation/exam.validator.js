/* imports */
const { check } = require('express-validator');

/* Validation functions for exam endpoints */

const idValidation = () => [
    check('id').notEmpty().withMessage("ID is required").isInt({min: 0}).withMessage("ID should be a positive integer"),
];

const dayValidation = () => [
    check('day').notEmpty().withMessage("Day is required"),
    check('day').isIn(['F', 'Sat']).withMessage("Invalid day value"),
];

const timingValidation = () => [
    check('timing').notEmpty().withMessage("Timing is required"),
    check('timing').isIn(['8:00-9:30', '9:30-11:00', '11:00-12:30', '12:30-2:00', '2:00-3:30', '3:30-5:00']).withMessage("Invalid timing value"),
];

const roomValidation = () => [
    check('room').notEmpty().withMessage("Room is required"),
    check('room').isLength({ min: 6, max: 6 }).withMessage("Room should be 6 characters long"),
    check('room').matches(/^[A-Z]{3}\d{3}$/).withMessage("Invalid room format"),
    check('room').custom((value) => {
        const validPrefixes = ['MAT', 'NAS'];
        const roomPrefix = value.substring(0, 3);
        if (!validPrefixes.includes(roomPrefix)) {
            throw new Error("Invalid room value");
        }
        return true;
    }),
];

const courseIdValidation = () => [
    check('course_id').notEmpty().withMessage("Course ID is required")
    .isInt({min: 0}).withMessage("Course ID should be a positive integer"),
];



const insertExamValidation = [
    ...dayValidation(),
    ...timingValidation(),
    ...roomValidation(),
    ...courseIdValidation(),
];

const updateExamValidation = [
    ...idValidation(),
    ...dayValidation(),
    ...timingValidation(),
    ...roomValidation(),
    ...courseIdValidation(),
];

const getExamByIdValidation =[
    ...idValidation(),
];

const deleteExamByIdValidation =[
    ...idValidation(),
];


/* exports */
module.exports = {
    insertExamValidation,
    updateExamValidation,
    getExamByIdValidation,
    deleteExamByIdValidation
};
