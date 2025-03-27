/* imports */
const { Op } = require("sequelize");
const Student = require('../models/student.model');
const StudentObj = require('../mapper/student.object');

/**
 * 
 * @param {StudentObj} studentData
 * create a student 
 * @returns created student
 */
const createStudent = async (studentData) => {
    try {
        const newStudent = await Student.create(StudentObj(studentData));
        return newStudent.toJSON();
    } catch (e) {
        throw new Error('Error creating student', e);
    }
}

/**
 * get all students
 * @returns all students found
 */
const getAllStudents = async () => {
    try {
        const students = await Student.findAll();
        return students;
    } catch (e) {
        throw new Error('Error while fetching all students', e);
    }
}

/**
 * 
 * @param {int} id 
 * get a student based on the id
 * @returns student found
 */
const getStudentById = async (id) => {
    try {
        const student = await Student.findByPk(id);
        if (student) {
            return student.toJSON();
        }
        return `Student with id: ${id} not found`;
    } catch (e) {
        throw new Error(`Error while fetching student with id: ${id}`, e);
    }
}

/**
 * 
 * @param {int} id 
 * @param {StudentObj} studentData
 * update the data for the student with a specific id 
 * @returns 0/1
 */
const updateStudent = async (id, studentData) => {
    try {
        const student = await Student.update(StudentObj(studentData), {where: { Student_id: id }});
        if (student == 0) {
            return `No changes done || Student with id: ${id} not found`; 
        }
        return student;//       returns 1/0
    } catch (e) {
        throw new Error(`Error in updating student with id: ${id}`, e);
    }
}

/**
 * 
 * @param {int} id 
 * delete student with a specific id
 * @returns 0/1
 */
const deleteStudent = async (id) => {
    try {
        const student = await Student.findByPk(id);
        if (student){
            const deleteStudent = await Student.destroy({where: { Student_id: id }});
            return deleteStudent;//         returns 1/0
        }
        return `Student with id: ${id} not found`;
    } catch (e) {
        throw new Error(`Error deleting student with id: ${id}`, e);
    }
}

const getAllMajors = async() => {
    try {
        const allMajors = await Student.findAll({
            attributes: ['Student_major'],
            group: ['Student_major'],
        });
        return allMajors;
    } catch (e) {
        throw new Error('Error while fetching all majors', e);
    }
}

const search = async(phrase) => {
    try {
        const foundStudents = await Student.findAll({
            where: {
              [Op.or]: [
                { Student_id: { [Op.like]: `%${phrase}%` } },
                { Student_name: { [Op.like]: `%${phrase}%` } },
                { Student_email: { [Op.like]: `%${phrase}%` } },
              ],
            },
          });
        //   const plainStudents = foundStudents.map(student => student.get({ plain: true }));

        //   return plainStudents;
        return foundStudents;
        } catch (e) {
        throw new Error('Error while searching for student', e);
    }
}


/* exports */
module.exports = {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
    getAllMajors,
    search,
}