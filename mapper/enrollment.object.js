/* create a enrollment object (similar to an interface in angular) */
const EnrollmentObj = ({
    course_id,
    student_id,
}) => ({
    Enrollment_course_id: course_id,
    Enrollment_student_id: student_id,
});

/* export the object */
module.exports = EnrollmentObj;