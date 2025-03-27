/* create a student object (similar to an interface in angular) */
const StudentObj = ({
    name,
    email,
    major,
    gpa,
    pass
}) => ({
    Student_name: name,// Did not include Student_dateJoined because I don't want the caller to create or update it
    Student_email: email,
    Student_major: major,
    Student_gpa: gpa,
    Student_password: pass,
});

/* export the object */
module.exports = StudentObj;