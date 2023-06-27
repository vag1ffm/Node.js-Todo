const {User, Token, Group, GroupMembers} = require("../models");
const {hash, compare} = require("bcrypt");
const {where} = require("sequelize");
const {groupSchema} = require("../utils/schemas");


class GroupControllers {
    async createGroup(req, res) {
        console.log(req.user_id)
        if (req.user_id === undefined) {
            return res.status(400).json({error: 'Token was not provided'});
        }

        try {
            await groupSchema.validateAsync(req.body)
        } catch (e) {
            return res.status(400).json({error: e.details[0].message});
        }

        const {group_name, password} = req.body
        const isGroupExist = await Group.findOne({where: {group_name: group_name}})

        if (isGroupExist !== null) {
            return res.status(400).json({error: "group_name is exist"});
        }

        const newGroup = await Group.create({
            group_name, password
        })

        GroupMembers.create({
            group_id: newGroup.id,
            user_id: req.user_id,
        })

        return res.status(200).json(newGroup.dataValues);

    }

    async getGroup(req, res) {

        let participatedGroups = await GroupMembers.findAll({where: {user_id: req.user_id}})

        participatedGroups = participatedGroups.map(group => group.dataValues)

        return res.status(200).json({data: participatedGroups})
    }

    async deleteGroupMember(req, res) {
        const { group_id } = req.params;

        const isGroupExist = await Group.findOne({where: {id: group_id}})

        if (isGroupExist === null) {
            return res.status(400).json({ error: 'Group is not exist' });
        }

        const GroupMember = await GroupMembers.findOne({where: {group_id: group_id, user_id: req.user_id}})

        if (!GroupMember) {
            return res.status(400).json({ error: 'User is not in this group' });
        }

        await GroupMember.destroy()
        return res.status(204).json({});


    }

    // TODO: добавить найти группу
}


module.exports = new GroupControllers();