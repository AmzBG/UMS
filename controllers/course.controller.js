/* imports */
const { createCourse, getAllCourses, getCourseById, updateCourse, deleteCourse } = require('../services/course.service');
const { validationResult } = require('express-validator');


const openCoursesPage = async(req, res) => {
    const allCourses = await getAllCoursesController();
    //! Render page here
    // res.render('coursesPage', {courses: allCourses, path: "Course"});
    res.status(200).json({
        message: 'Courses page successfully reached',
        data: {
            courses: allCourses,
        }
    });
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * creates a course, calls createCourse from the service file 
 * @returns user friend response based on the service response
 */
const createCourseController = async(req, res) => {
    /* validation(400) */
   const errors = validationResult(req);

   if(!errors.isEmpty()) {
    return res.status(400).json({error: errors.array().map(error => error.msg)});
   }

   try {
    const courseData = req.body;
    const response = await createCourse(courseData);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * gets all courses, calls getAllCourses from the service file
 * @returns user friendly response based on the service response
 */
const getAllCoursesController = async(req, res) => {
    /* validation(400) */
   try {
    const response = await getAllCourses();
    // res.status(200).json({response});
    return response;
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * get one course based on the id, calls getCourseById from the service file 
 * @returns user friendly response based on the service response
 */
const getCourseByIdController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
     return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const response = await getCourseById(id);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * update course, calls updateCourse from the service file 
 * @returns user friendly response based on the service response
 */
const updateCourseController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
     return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const updatedData = req.body;
    const response = await updateCourse(id, updatedData);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * delete a course, calls deleteCourse from the service file 
 * @returns user friendly response based on the service response
 */
const deleteCourseController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
     return res.status(400).json({error: errors.array().map(error => error.msg)});
    }

   try {
    const id = req.params.id;
    const response = await deleteCourse(id);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}


/* exports */
module.exports = {
    openCoursesPage,
    createCourseController,
    getAllCoursesController,
    getCourseByIdController,
    updateCourseController,
    deleteCourseController,
}