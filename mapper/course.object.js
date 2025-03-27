/* create a course object (similar to an interface in angular) */ 
const CourseObj = ({
    code,
    name,
    credits,
    type,
    day,
    timing,
    capacity,
    enrolled, // in the front end, I won't allow editing the enrolled field
}) => ({
    Course_code: code,
    Course_name: name,
    Course_credits: credits,
    Course_type: type,
    Course_day: day,
    Course_timing: timing,
    Course_capacity: capacity,
    Course_enrolled: enrolled,
});

/* export the object */
module.exports = CourseObj;