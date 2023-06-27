const express = require('express')
const {json} = require("express");
const userRouter = require("./routes/UserRouter");
const groupRouter = require("./routes/GroupRouter");
const todoRouter = require("./routes/TodoRouter");



const sequelize = require('./config/database');
const User = require('./models/Users');

async function initDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('База данных успешно инициализирована');
    } catch (error) {
        console.error('Ошибка при инициализации базы данных:', error);
    }
}
// initDatabase()



const app = express();

const PORT = 5000

app.use(json())

app.use('/api', userRouter)
app.use('/api', groupRouter)
app.use('/api', todoRouter)



app.listen(PORT, ()=> {
    console.log('Server is running on the port:', PORT)
})

