import { Bot } from "./bot";
import express from "express";
import path from "path";
import compression from "compression";
import bodyParser from "body-parser";

const PORT = process.env.PORT;

const app = express();
const router = express.Router();

app.use(compression());
app.use(express.static(path.join(__dirname, "../views")));
app.use(bodyParser());

const bot = new Bot(
  "5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw",
  "mongodb+srv://shukrullojondev:1234@pppokerbotdatabase.7zxbw4z.mongodb.net/?retryWrites=true&w=majority?directConnection=true"
);
bot.start();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

app.listen(PORT || 5000, () => {
  console.log("server started.");
});
