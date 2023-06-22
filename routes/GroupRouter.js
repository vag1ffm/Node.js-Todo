const groupControllers = require("../Controllers/GroupController");
const express = require('express')
const {verify, decode} = require("jsonwebtoken");

const groupRouter = express()

groupRouter.use((req, res, next) => {
    verify(req.headers?.token, 'amirSoska', (err, decode) => {
        if (err) {
            return res.status(400).json({error: 'Token was not provided'});
        } else {
            req.user_id = decode.userId;
            next();
        }
    })
})

groupRouter.post('/groups', groupControllers.createGroup)
groupRouter.get('/groups', groupControllers.getGroup)
groupRouter.delete('/groups/:group_id', groupControllers.deleteGroupMember)


module.exports = groupRouter