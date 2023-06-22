const userController = require( "../Controllers/UserController");
const express = require('express')
const {verify, decode} = require("jsonwebtoken");

const userRouter = express()

userRouter.use((req, res, next)=> {
    verify(req.headers?.token, 'amirSoska', (err, decode)=> {
        if (err) {
            next();
        } else {
            req.user_id = decode.userId;
            next();
        }
    })
})

userRouter.post('/user/auth', userController.create)
userRouter.post('/user/login', userController.login)
userRouter.put('/user', userController.update)


module.exports = userRouter