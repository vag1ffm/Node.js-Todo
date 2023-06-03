const {User, Token} = require("../models");
const {hash, compare} = require("bcrypt");
const {where} = require("sequelize");
const {sign} = require("jsonwebtoken");
const Joi = require("joi");


class UserController {
    async create(req, res) {
        const {username, password, email} = req.body

        if (!!username && !!password && !!email) {

            const isUserExist = await User.findOne({where: {username: username}})

            if (isUserExist === null) {
                const hashPassword = await hash(password, 10)
                const newUser = await User.create({
                    username, password: hashPassword, email
                })
                return res.status(200).json({
                    id: newUser.id, username: newUser.username, email: newUser.email
                })
            } else {
                return res.status(400).json('username is exist')
            }
        } else if (username === undefined || username === '') {
            return res.status(400).json('username is required')
        } else if (password === undefined || password === '') {
            return res.status(400).json('password is required')
        }
        return res.status(400).send("Отправь мне эти ключи username, email, password")
    }

    async login(req, res) {
        const {username, password} = req.body

        console.log(req.body)
        if (username === undefined || username === '') {
            return res.status(401).json('username is required')
        } else if (password === undefined || password === '') {
            return res.status(400).json('password is required')
        }

        const user = await User.findOne({where: {username}})

        if (!user) {
            return res.status(400).json('username is not exist')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            return res.status(400).json('password is not match')
        }

        const token = sign({userId: user.id}, 'amirSoska')

        await Token.create({id: token, user_id: user.id, last_login: new Date()})

        return res.status(200).json(`${token}`)
    }

    async update(req, res) {
        const schema = Joi.object({
            username: Joi.string(),
            email: Joi.string(),
        })

        try {
            await schema.validateAsync(req.body)
            const user =  await  User.findOne({where: {id: req.user_id}})
            await user.update(req.body)
            await user.save()
            return res.status(200).json({id: user.id, username: user.username, email: user.email})
        } catch (e) {
            return res.status(400).json({ error: e.details[0].message });
        }
    }
}


module.exports = new UserController();