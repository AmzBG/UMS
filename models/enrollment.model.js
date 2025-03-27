/* imports */
const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");
const Student = require("./student.model");
const Course = require("./course.model");

/* enrollment model definition */
const Enrollment = sequelize.define('Enrollment', {
    Enrollment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Enrollment_course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Enrollment_student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "enrollment",
    createdAt: false,
    updatedAt: false,
});

/* enrollment model relations */
Enrollment.belongsTo(Course, {foreignKey: 'Enrollment_course_id', onUpdate: 'CASCADE', onDelete: 'CASCADE'});
Enrollment.belongsTo(Student, {foreignKey: 'Enrollment_student_id', onUpdate: 'CASCADE', onDelete: 'CASCADE'});

/* exports */
module.exports = Enrollment;