const groupControllers = require( "../Controllers/GroupController");
const express = require('express')
const {verify, decode} = require("jsonwebtoken");

const groupRouter = express()

groupRouter.use((req, res, next)=> {
    verify(req.headers?.token, 'amirSoska', (err, decode)=> {
        if (err) {
            next();
        } else {
            req.user_id = decode.userId;
            next();
        }
    })
})

groupRouter.post('/groups', groupControllers.createGroup)


module.exports = groupRouter