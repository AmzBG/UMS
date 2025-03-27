/* imports */
const { check } = require('express-validator');


const usernameValidation = () => [
    check('username').notEmpty().withMessage("Username is required"),
];

const passwordValidation = () => [
    check('password').notEmpty().withMessage("Password is required"),
];


const authenticateValidation = [
    ...usernameValidation(),
    ...passwordValidation(),
];



module.exports = authenticateValidation;