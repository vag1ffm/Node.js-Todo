const express = require('express')
const {json} = require("express");
const router = require("./routes/Router");



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

app.use('/api', router)



app.listen(PORT, ()=> {
    console.log('Юнис бэка рот ебал на порту', PORT)
})

