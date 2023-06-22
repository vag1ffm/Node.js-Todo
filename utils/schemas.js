const Joi = require("joi");

const groupSchema = Joi.object({
    group_name: Joi.string(),
    password: Joi.string(),
})

module.exports = {
    groupSchema
};