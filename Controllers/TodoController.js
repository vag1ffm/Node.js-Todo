const { Todos} = require("../models");
const {createTodoSchema, getTodoSchema, getTodoAllSchema, deleteTodoAllSchema} = require("../utils/schemas");


class TodoControllers {
    async createTodo(req, res) {
        try {
            const validateTodo = await createTodoSchema.validateAsync({
                ...req.body,
                user_id: req.user_id,
            })
            const newTodo = await Todos.create(validateTodo)
            console.log(req.body)
            return res.status(200).json(newTodo.dataValues)
        } catch (e) {
            return res.status(400).json({error: e.details[0].message});
        }
    }

    async getTodo(req, res) {
        try {
            await getTodoSchema.validateAsync({
                ...req.body,
                user_id: req.user_id,
            })
        } catch (e) {
            return res.status(400).json({error: e.details[0].message});
        }

        const {group_id, id:todo_id} = req.body
        const todo = await Todos.findOne({
            where: {
                group_id: group_id,
                id: todo_id,
            }
        })

        return res.status(200).json(todo)


    }

    async getAllTodos(req, res) {
        try {
            await getTodoAllSchema.validateAsync({
                ...req.body,
                user_id: req.user_id,
            })
        } catch (e) {
            return res.status(400).json({error: e.details[0].message});
        }

        const {group_id} = req.body
        let todos = await Todos.findAll({
            where: {
                group_id: group_id
            }
        })
        todos = todos.map(todo => todo.dataValues)
        return res.status(200).json(todos)

    }

    //TODO: finish delete
    async deleteTodo(req, res) {
        try {
            await deleteTodoAllSchema.validateAsync({
                ...req.body,
                user_id: req.user_id,
            })
        } catch (e) {
            return res.status(400).json({error: e.details[0].message});
        }

        const {group_id, id:todo_id} = req.body

        const todoExist = await Todos.find({
            where: {
                group_id: group_id,
                id: todo_id
            }
        })

        if (todoExist === null) {
            return res.status(400).json({"error": "todo is not exist"})
        }

        todoExist.destroy()

        return res.status(200).json({'status': "OK"})

    }

}


module.exports = new TodoControllers();