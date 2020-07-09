const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")


module.exports = (sequelize, DataTypes) =>{
    const Session = sequelize.define("Session" , {
        user_id : DataTypes.STRING,
        token : DataTypes.STRING,
        
    });
    Session.associate = function(models) {
        Session.belongsTo(models.User, {
            foreignKey: 'id',
            onDelete: 'CASCADE'
        })
    };
    return Session;
};