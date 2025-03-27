/* imports */
const { check } = require('express-validator');

/* Validation functions for student endpoints */

const idValidation = () => [
    check('id').notEmpty().withMessage("ID is required").isInt({min: 0}).withMessage("ID should be a positive integer"),
];

const nameValidation = () => [
    check('name').notEmpty().withMessage("Name is required"),
    check('name').isLength({ min: 3, max: 30 }).withMessage("Name should be between 3 and 30 characters"),
];

const emailValidation = () => [
    check('email').isEmail().withMessage("Wrong email format"),
];

const majorValidation = () => [
    check('major').notEmpty().withMessage("Major is required"),
    check('major').isIn(['Computer Science', 'Mechatronics', 'Pre-med', 'Business']).withMessage("Invalid major value"),
];

const gpaValidation = () => [
     check('gpa').notEmpty().withMessage('GPA is required')
     .isFloat({ min: 0, max: 4 }).withMessage('GPA should be between 0 and 4'),
];

const passwordValidation = () => [
    check('pass')
        .custom((value, { req }) => {
            if (!('pass' in req.body)) {
                throw new Error("Password is required");
            }
            return true;
        })
        .if((value, { req }) => 'pass' in req.body)
        .isLength({ min: 6 }).withMessage("Password should be at least 6 characters")
        .isStrongPassword().withMessage("Password should contain lowercase, uppercase, number, and special characters"),
];

const insertStudentValidation = [
    ...nameValidation(),
    ...emailValidation(),
    ...majorValidation(),
    ...gpaValidation(),
    ...passwordValidation(),
];

const updateStudentValidation = [
    ...idValidation(),
    ...nameValidation(),
    ...emailValidation(),
    ...majorValidation(),
    ...gpaValidation(),
    ...passwordValidation(),
];

const getStudentByIdValidation =[
    ...idValidation(),
];

const deleteStudentByIdValidation =[
    ...idValidation(),
];


/* exports */
module.exports = {
    insertStudentValidation,
    updateStudentValidation,
    getStudentByIdValidation,
    deleteStudentByIdValidation
};