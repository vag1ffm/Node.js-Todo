const TodoController = require("../Controllers/TodoController");
const express = require('express')
const {verify, decode} = require("jsonwebtoken");

const todoRouter = express()

todoRouter.use((req, res, next) => {
    verify(req.headers?.token, 'amirSoska', (err, decode) => {
        if (err) {
            return res.status(400).json({error: 'Token was not provided'});
        } else {
            req.user_id = decode.userId;
            next();
        }
    })
})

todoRouter.post('/todo', TodoController.createTodo)
todoRouter.get('/todo', TodoController.getTodo)
todoRouter.get('/todos', TodoController.getAllTodos)
todoRouter.delete('/todo', TodoController.deleteTodo)


module.exports = todoRouter