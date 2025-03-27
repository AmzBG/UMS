/* imports */
const { DataTypes } = require("sequelize");
const sequelize = require("../database/config");


/* Student model definition*/
const Student = sequelize.define('Student', {
    Student_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Student_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    Student_email: {
        type: DataTypes.STRING(45),
        allowNull: false,
    },
    Student_major: {
        type: DataTypes.ENUM('Computer Science', 'Mechatronics', 'Pre-med', 'Business'),
        allowNull: false,
    },
    Student_gpa: {
        type: DataTypes.DECIMAL(3, 2).UNSIGNED,
        allowNull: false,
    },
    Student_dateJoined: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    Student_password: {
        type: DataTypes.STRING(45),
        allowNull: false,
    }
}, {
    tableName: "student",
    createdAt: false,
    updatedAt: false,
});


/* export */
module.exports = Student;