/* imports */
const Enrollment = require("../models/enrollment.model");
const EnrollmentObj = require("../mapper/enrollment.object");
const { getCourseById, updateCourse } = require("../services/course.service");

/**
 * 
 * @param {EnrollmentObj} enrollmentData 
 * create enrollment in the database
 * @returns created enrollment
 */
const createEnrollment = async (enrollmentData) => {
  const course_id = enrollmentData.course_id;
  let course = await getCourseById(course_id);
  if (course) {
    let enrolled = course.Course_enrolled;
    if (enrolled >= course.Course_capacity) {
      throw new Error("Course is full");
    }
    try {
      const newEnrollment = await Enrollment.create(EnrollmentObj(enrollmentData));
      course.Course_enrolled = ++enrolled;
      await updateCourse(course_id, course, 1);
      return newEnrollment.toJSON();
    } catch (e) {
      throw (e.name == 'SequelizeUniqueConstraintError')
        ? new Error("Student already enrolled in the course", e)
        : new Error("Error creating enrollment", e);
    }
  }
};

/**
 * get all Enrollments
 * @returns all enrollments found
 */
const getAllEnrollments = async () => {
  try {
    const enrollments = await Enrollment.findAll();
    return enrollments;
  } catch (e) {
    throw new Error("Error while fetching all enrollments", e);
  }
};

/**
 * 
 * @param {int} id
 * get enrollment based on the id 
 * @returns course found
 */
const getEnrollmentById = async (id) => {
  try {
    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
      return enrollment.toJSON();
    }
    return `Enrollment with id: ${id} not found`;
  } catch (e) {
    throw new Error(`Error while fetching enrollment with id: ${id}`, e);
  }
};

/**
 * 
 * @param {int} id 
 * @param {EnrollmentObj} enrollmentData
 * update the data for enrollment with a specific id
 * if course_id was updated, decrement/increment enrolled in the old/new course 
 * @returns 0/1
 */
const updateEnrollment = async (id, enrollmentData) => {
    const enrollment = await getEnrollmentById(id);
    if (enrollment) {
        const course_id = enrollment.Enrollment_course_id;
        const newCourse_id = enrollmentData.course_id;    
        try {
            let newCourse = await getCourseById(newCourse_id); // get the newCourse to check if it has space
            const newCapacity = newCourse.Course_capacity;
            let newEnrolled = newCourse.Course_enrolled;
            if (newEnrolled >= newCapacity) { // first check if the course is full before excuting the update
                throw new Error(1);// throw an error and catch it down below
            }
            const newEnrollment = await Enrollment.update(EnrollmentObj(enrollmentData), {where: { Enrollment_id: id }});
            if (newCourse_id != course_id) { // If course_id was updated, decrement/increment enrolled in the old/new course
                let course = await getCourseById(course_id);
                let enrolled = course.Course_enrolled;
                course.Course_enrolled = --enrolled;
                await updateCourse(course_id, course, 1);
                
                newCourse.Course_enrolled = ++newEnrolled;
                await updateCourse(newCourse_id, newCourse, 1);
            }
            return newEnrollment; //       returns 1/0
        } catch (e) {
            console.log(e);
            throw (e.message == 1)? new Error("Course is full", e) : 
            (e.name == "SequelizeUniqueConstraintError")? new Error("Student already enrolled in the course", e) :
            new Error(`Error in updating enrollment with id: ${id}`, e);
        }
    }
};

/**
 * 
 * @param {int} id
 * delete enrollment with a specific id 
 * @returns 0/1
 */
const deleteEnrollment = async (id) => {
  try {
    const enrollment = await Enrollment.findByPk(id);
    if (enrollment) {
      const course_id = enrollment.Enrollment_course_id;
      let course = await getCourseById(course_id);
      if (course) {
        let enrolled = course.Course_enrolled;
        const deleteEnrollment = await Enrollment.destroy({where: { Enrollment_id: id }});
        course.Course_enrolled = --enrolled;
        await updateCourse(course_id, course, 1);
        return deleteEnrollment; //         returns 1/0
      }
    }
    return `Enrollment with id: ${id} not found`;
  } catch (e) {
    throw new Error(`Error deleting enrollment with id: ${id}`, e);
  }
};

/* exports */
module.exports = {
  createEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  updateEnrollment,
  deleteEnrollment,
};
