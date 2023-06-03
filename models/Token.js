const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Token = sequelize.define('Token', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey:true
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: false
    },
});



module.exports = Token