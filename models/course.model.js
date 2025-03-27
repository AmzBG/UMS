/* imports */
const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");

/* course model definition */
const Course = sequelize.define('Course', {
    Course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Course_code: {
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    Course_name: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    Course_credits: {
        type: DataTypes.ENUM('1', '3', '6'),
        allowNull: false,
    },
    Course_type: {
        type: DataTypes.ENUM('Major Course', 'Normal Course', 'Lab'),
        allowNull: false,
    },
    Course_day: {
        type: DataTypes.ENUM('M/W', 'T/TH', 'M', 'T', 'W', 'TH'),
        allowNull: false,
    },
    Course_timing: {
        type: DataTypes.ENUM('8:00-9:30', '9:30-11:00', '11:00-12:30', '12:30-2:00', '2:00-3:30', '3:30-5:00'),
        allowNull: false,
    },
    Course_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Course_enrolled: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
}, {
    tableName: "course",
    createdAt: false,
    updatedAt: false,
});


/* exports */
module.exports = Course;