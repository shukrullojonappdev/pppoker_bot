import { Bot } from "./bot";
import { Server } from "./server";

const bot = new Bot("5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw");
const server = new Server();

bot.start();
server.start();
