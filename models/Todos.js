const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todos = sequelize.define('Todos', {
    todo_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    group_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    complited: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
    }
});



module.exports = Todos