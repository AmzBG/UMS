/* create a exam object (similar to an interface in angular) */
const ExamObj = ({
    day,
    timing,
    room,
    course_id,
}) => ({
    Exam_day: day,
    Exam_timing: timing,
    Exam_room: room,
    Exam_course_id: course_id,
});

/* export the object */
module.exports = ExamObj;