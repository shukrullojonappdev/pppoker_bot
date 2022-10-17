import { Bot } from "./bot";
import express from "express";
import path from "path";

const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, "views")));
app.use("/", router);

app.set("view engine", "html");

const bot = new Bot(
  "5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw",
  "mongodb+srv://shukrullojondev:1234@pppokerbotdatabase.7zxbw4z.mongodb.net/?retryWrites=true&w=majority"
);
bot.start();

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("server started.");
});
