"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const router = express_1.default.Router();
app.use(express_1.default.static(path_1.default.join(__dirname, "../views")));
app.use("/", router);
app.set("view engine", "html");
const bot = new bot_1.Bot("5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw", "mongodb+srv://shukrullojondev:1234@pppokerbotdatabase.7zxbw4z.mongodb.net/?retryWrites=true&w=majority");
bot.start();
app.get("/", (req, res) => {
    res.render("index");
});
app.listen(3000, () => {
    console.log("server started.");
});
