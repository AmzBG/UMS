/* imports */
const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, getAllMajors, search } = require('../services/student.service');
const { validationResult } = require('express-validator');



/**
 * 
 * @param {*} req 
 * @param {*} res
 * renders the studentsPage on the client-side
 */
const openStudentsPage = async (req, res) => {
    try {

        const students = await getAllStudentsController();
        
        students.forEach((student) => {
            student.dataValues.Student_dateJoined = formatDate(student.dataValues.Student_dateJoined);
        });
        const allMajors = await getAllMajorsController();

        //! Render page here
        // res.render('studentsPage', { students, path: 'Student', allMajors });
        res.status(200).json({
            message: 'Home page successfully reached',
            data: {
                students,
                allMajors,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal error occurred', detail: error.message });
    }
};


/**
 * 
 * @param {*} req 
 * @param {*} res
 * creates a student, calls createStudent from the service file 
 * @returns user friendly response based on the service response
 */
const createStudentController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }

    try {
        const studentData = req.body;
        const response = await createStudent(studentData);

        if (response) {
            res.status(200).json({ status: 'success', message: 'Student created successfully.' });
        } else {
            res.status(400).json({ status: 'fail', message: 'Failed to create student.' });
        }
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Internal error occurred.', detail: e.message });
    }
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * gets all students, calls getAllStudents from the service file
 * @returns user friendly response based on the service response 
 */
const getAllStudentsController = async(req, res) => {
    /* validation(400) */
   try {
    const response = await getAllStudents();
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
 * get one student based on the id, calls getStudentById from the service file 
 * @returns user friendly response based on the service response
 */
const getStudentByIdController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
    //  return res.status(400).json({error: errors.array().map(error => error.msg)});
    return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }

   try {
    const id = req.params.id;
    const response = await getStudentById(id);
    res.status(200).json({response});
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * update student, calls updateStudent from the service file 
 * @returns user friendly response based on the service response
 */
const updateStudentController = async (req, res) => {
    /* validation(400) */
    console.log("Update");
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
    //  return res.status(400).json({error: errors.array().map(error => error.msg)});
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }

   try {
    const id = req.params.id;
    const updatedData = req.body;
    const response = await updateStudent(id, updatedData);
    // res.status(200).json({response});
    if (response) {
        return res.status(200).json({ status: 'success', message: 'Student details updated successfully.' });
    } else {
        return res.status(400).json({ status: 'fail', message: 'Failed to update student details.' });
    }
   } catch (e) {
    res.status(500).json({message: "Internal error occured", detail: e.message});
   }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * delete a student, calls deleteStudent from the service file 
 * @returns user friendly response based on the service response
 */
const deleteStudentController = async (req, res) => {
    /* validation(400) */
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ status: 'validation-error', validationErrors: errors.array().map(error => error.msg) });
    }

    try {
        const id = req.params.id;
        const response = await deleteStudent(id);

        if (response) {
            res.status(200).json({ status: 'success', message: 'Student deleted successfully.' });
        } else {
            res.status(400).json({ status: 'fail', message: 'Failed to delete student.' });
        }
    } catch (e) {
        res.status(500).json({ status: 'error', message: 'Internal error occurred.', detail: e.message });
    }
}


const getAllMajorsController = async(req, res) => {
    try {
        const allMajors = await getAllMajors();
        // res.status(200).json({allMajors})
        return allMajors;
    } catch (e) {
        res.status(500).json({message: "Internal error occured", detail: e.message});
    }
}

/**
 * private function
 * formats the date
 */
const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(date).toLocaleDateString('en-CA', options).split('/').join('-');
    return formattedDate;
}


/**
 * 
 * @param {*} req 
 * @param {*} res
 * searches the database for students that have the passed phrase
 * in their id, name, and email
 */
const searchController = async (req, res) => {
  try {
    const phrase = req.query.q;
    const result = await search(phrase, { raw: true });
    result.forEach((student) => {
      student.Student_dateJoined = formatDate(student.Student_dateJoined);
    });

    const allMajors = await getAllMajorsController();

    //! Render page here
    // res.render('studentsPage', { students: result, path: 'Student', allMajors });
    res.status(200).json({
        message: 'StudentsPage page successfully reached',
        data: {
            students: result,
            allMajors,
        }
    });
  } catch (e) {
    console.error('Error in searchController:', e);
    res.status(500).json({ message: 'Internal error occurred', detail: e.message });
  }
};  
  




/* exports */
module.exports = {
    openStudentsPage,
    createStudentController,
    getAllStudentsController,
    getStudentByIdController,
    updateStudentController,
    deleteStudentController,
    getAllMajorsController,
    searchController,
}