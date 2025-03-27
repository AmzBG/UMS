/* imports */
const Exam = require('../models/exam.model');
const ExamObj = require('../mapper/exam.object');

/**
 * 
 * @param {ExamObj} examData 
 * create exam in the database
 * @returns created exam
 */
const createExam = async (examData) => {
    try {
        const newExam = await Exam.create(ExamObj(examData));
        return newExam.toJSON();
    } catch (e) {
        throw (e.name == 'SequelizeForeignKeyConstraintError')? new Error('Invalid course ID entered', e) :
        new Error('Error creating exam', e);
    }
}

/**
 * get all exams
 * @returns all exams found
 */
const getAllExams = async () => {
    try {
        const exams = await Exam.findAll();
        return exams;
    } catch (e) {
        throw new Error('Error while fetching all exams', e);
    }
}

/**
 * 
 * @param {int} id
 * get a exam based on the id 
 * @returns exam found
 */
const getExamById = async (id) => {
    try {
        const exam = await Exam.findByPk(id);
        if (exam) {
            return exam.toJSON();
        }
        return `Exam with id: ${id} not found`;
    } catch (e) {
        throw new Error(`Error while fetching exam with id: ${id}`, e);
    }
}

/**
 * 
 * @param {int} id 
 * @param {ExamObj} examData
 * update the data for the exam with a specific id 
 * @returns 0/1
 */
const updateExam = async (id, examData) => {
    try {
        const exam = await Exam.update(ExamObj(examData), {where: { Exam_id: id }});
        if (exam == 0) {
            return `No changes done || Exam with id: ${id} not found`; 
        }
        return exam;//       returns 1/0
    } catch (e) {
        throw (e.name == 'SequelizeForeignKeyConstraintError')? new Error('Invalid course ID entered', e) :
        new Error(`Error in updating exam with id: ${id}`, e);
    }
}

/**
 * 
 * @param {int} id
 * delete exam with a specific id 
 * @returns 0/1
 */
const deleteExam = async (id) => {
    try {
        const exam = await Exam.findByPk(id);
        if (exam){
            const deleteExam = await Exam.destroy({where: { Exam_id: id }});
            return deleteExam;//         returns 1/0
        }
        return `Exam with id: ${id} not found`;
    } catch (e) {
        throw new Error(`Error deleting exam with id: ${id}`, e);
    }
}


/* exports */
module.exports = {
    createExam,
    getAllExams,
    getExamById,
    updateExam,
    deleteExam,
}