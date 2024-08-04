// Importing modules Model and DataTypes from sequelize, bcrypt for password hashing, and sequelize instance from config
const { Model, DataTypes } = require ('sequelize');
const bcrypt = require ('bcrypt')
const sequelize = require('../config/connections')

// define user class extending sequelize model class, checking and hashing password
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}


User.init(
    {
        id: {
            type: DataTypes. INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [6],
            },
        },
    },
    {
        // The hook is hashing the password before a creation of a new user and once it is updating an existing user
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            beforeUpdate: async (updatedUserData) => {
                updatedUserData.password =await bcrypt.hash(updatedUserData.password,10);
                return updatedUserData;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'User',
    }

);

module.exports = User;