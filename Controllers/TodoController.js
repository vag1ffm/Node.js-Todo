const {User, Token, Group, GroupMembers} = require("../models");
const {hash, compare} = require("bcrypt");
const {where} = require("sequelize");
const {sign} = require("jsonwebtoken");
const Joi = require("joi");
const {groupSchema} = require("../utils/schemas");
const {number} = require("joi");


class TodoControllers {
    async createTodo(req, res) {

    }
    async getTodo(req, res) {

    }
    async getAllTodo(req, res) {

    }
    async deleteTodo(req, res) {

    }

}


module.exports = new TodoControllers();