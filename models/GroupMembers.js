const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const GroupMembers = sequelize.define('GroupMembers', {
    group_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});



module.exports = GroupMembers