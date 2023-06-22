const TodoControllers = require("../Controllers/TodoControllers");
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

todoRouter.post('/todo', TodoControllers.createTodo)
todoRouter.get('/todo', TodoControllers.getTodo)
todoRouter.get('/todo', TodoControllers.getAllTodo)
todoRouter.delete('/todo', TodoControllers.deleteTodo)


module.exports = todoRouter