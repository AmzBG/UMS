const { authenticate, getSessionId } = require('../services/auth.service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const authenticationController = async(req, res) => {
    /* validation(400) */
    const errors = validationResult(req);
    
    if(!errors.isEmpty()) {
        return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

    try {
        const { username, password } = req.body;
        const result = await authenticate(username, password);
        if (result.session_id !== getSessionId()) {
            return res.redirect('/?message=Wrong%20credentials%20entered');
            // return res.status(403).json({ message: 'Unauthorized access' });
        }
        const token = jwt.sign({ username: result.username }, process.env.JWT_SECRET_KEY);
        // res.status(200).json({ message: 'Authenticated', user: result, token });
        console.log({ message: 'Authenticated', user: result, token });
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 30 * 60 * 1000, // expires after 10 minutes
        })
        
        res.redirect('api/student/home');
    } catch (e) {
        res.status(500).json({message: "Internal error occured", detail: e.message});
    }
}

const signOutController = (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
}


module.exports = {
    authenticationController,
    signOutController,
};

