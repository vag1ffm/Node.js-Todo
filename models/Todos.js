const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todos = sequelize.define('Todos', {
    todo_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    group_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    complited: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    deleted: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});



module.exports = Todos