/* imports */
const Course = require('../models/course.model');
const CourseObj = require('../mapper/course.object');

/**
 * 
 * @param {CourseObj} courseData
 * creates a course in the database 
 * @returns created course
 */
const createCourse = async (courseData) => {
    try {
        const newCourse = await Course.create(CourseObj(courseData));
        return newCourse.toJSON();
    } catch (e) {
        throw new Error('Error creating course', e);
    }
}

/**
 * gets all courses available in the database
 * @returns all courses found
 */
const getAllCourses = async () => {
    try {
        const courses = await Course.findAll();
        return courses;
    } catch (e) {
        throw new Error('Error while fetching all courses', e);
    }
}

/**
 * 
 * @param {int} id
 * gets a course from the database based on the id 
 * @returns course found
 */
const getCourseById = async (id) => {
    try {
        const course = await Course.findByPk(id);
        if (course) {
            return course.toJSON();
        }
        return `Course with id: ${id} not found`;
    } catch (e) {
        throw new Error(`Error while fetching course with id: ${id}`, e);
    }
}

/**
 * 
 * @param {int} id 
 * @param {CourseObj} courseData 
 * @param {int} cond
 * updates the data for a course with a specific id in the database
 * cond = 0 -> cannot update enrolled data field
 * cond = 1 -> update all data fields  
 * @returns 0/1
 */
const updateCourse = async (id, courseData, cond = 0) => {
    const existingCourse = await getCourseById(id); // get the course to compare enrolled with the newly arrived enrolled data field
    if (cond == 0 && existingCourse.Course_enrolled != courseData.enrolled) {
        throw new Error("Cannot update enrolled data field");
    }
    try {
        const course = await (cond == 1)?  Course.update((courseData), {where: { Course_id: id }}) :
        Course.update(CourseObj(courseData), {where: { Course_id: id }});
        if (course == 0) {
            return `No changes done || Course with id: ${id} not found`; 
        }
        return course;//       returns 1/0
    } catch (e) {
        throw new Error(`Error in updating course with id: ${id}`, e);
    }
}

/**
 * 
 * @param {int} id
 * delete course with a specific id 
 * @returns 0/1 
 */
const deleteCourse = async (id) => {
    try {
        const course = await Course.findByPk(id);
        if (course){
            const deleteCourse = await Course.destroy({where: { Course_id: id }});
            return deleteCourse;//         returns 1/0
        }
        return `Course with id: ${id} not found`;
    } catch (e) {
        throw new Error(`Error deleting course with id: ${id}`, e);
    }
}


/* exports */
module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
}