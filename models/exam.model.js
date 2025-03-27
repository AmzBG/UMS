/* imports */
const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");
const Course = require("./course.model")


/* exam model definition*/
const Exam = sequelize.define('Exam', {
    Exam_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Exam_day: {
        type: DataTypes.ENUM('F', 'Sat'),
        allowNull: false,
    },
    Exam_timing: {
        type: DataTypes.ENUM('8:00-9:30', '9:30-11:00', '11:00-12:30', '12:30-2:00', '2:00-3:30', '3:30-5:00'),
        allowNull: false,
    },
    Exam_room: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },
    Exam_course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: "exam",
    createdAt: false,
    updatedAt: false,
});

/* exam model relations */
Exam.belongsTo(Course, {foreignKey: 'Exam_course_id', onUpdate: 'CASCADE', onUpdate: 'CASCADE'});

/* exports */
module.exports = Exam;