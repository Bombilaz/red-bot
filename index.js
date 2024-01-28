require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'redbot',
    password: '1234', // ваш пароль
    port: 5432, // порт базы данных PostgreSQL
});

const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TOKEN, {polling: true});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    console.log(msg)
    bot.sendMessage(chatId, 'Привет! Что вы хотите заказать?', {
        reply_markup: {
            keyboard: [
                ['Пицца'],
                ['Бургер', 'Салат']
            ]
        }
    });
});

bot.onText(/\Пицца/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'я хачу пиццы')
})

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end();
});

server.listen(port, hostname, () => {
    console.log(process.env.TOKEN)
    console.log(`Server running at http://${hostname}:${port}/`);
});