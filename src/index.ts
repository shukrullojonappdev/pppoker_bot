import { Bot } from "./bot";
import express from "express";
import path from "path";
import serverless from "serverless-http";

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, "views")));
app.use("/.netlify/functions/server", router);

const bot = new Bot(
  "5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw",
  "mongodb+srv://shukrullojondev:1234@pppokerbotdatabase.7zxbw4z.mongodb.net/?retryWrites=true&w=majority"
);
bot.start();

app.get("/", (req, res) => res.sendFile("index.html"));

serverless(app);

app.listen(3000, () => {
  console.log("server started.");
});
