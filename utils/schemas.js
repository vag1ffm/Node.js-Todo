const Joi = require("joi");

const groupSchema = Joi.object({
    group_name: Joi.string(),
    password: Joi.string(),
})


const createTodoSchema = Joi.object({
    id: Joi.string().optional().optional(),
    todo_name: Joi.string(),
    group_id: Joi.string(),
    user_id: Joi.optional(),
    completed: Joi.string().optional(),
})

const getTodoSchema = Joi.object({
    id: Joi.string(),
    todo_name: Joi.string().optional(),
    group_id: Joi.string(),
    user_id: Joi.optional(),
    completed: Joi.string().optional(),
})

const getTodoAllSchema = Joi.object({
    id: Joi.string().optional(),
    todo_name: Joi.string().optional(),
    group_id: Joi.string(),
    user_id: Joi.optional(),
    completed: Joi.string().optional(),
})

const deleteTodoAllSchema = Joi.object({
    id: Joi.string(),
    todo_name: Joi.string().optional(),
    group_id: Joi.string(),
    user_id: Joi.optional(),
    completed: Joi.string().optional(),
})

module.exports = {
    groupSchema,
    createTodoSchema,
    getTodoSchema,
    getTodoAllSchema,
    deleteTodoAllSchema,
};