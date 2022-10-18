import { Bot } from "./bot";
import express from "express";
import path from "path";
import compression from "compression";
import bodyParser from "body-parser";
import router from "./routes";

const PORT = process.env.PORT;

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, "../views")));
app.use(bodyParser());

app.use("/", router);

const bot = new Bot(
  "5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw",
  "mongodb+srv://shukrullojondev:1234@pppokerbotdatabase.7zxbw4z.mongodb.net/?retryWrites=true&w=majority?directConnection=true"
);
bot.start();

app.listen(PORT || 5000, () => {
  console.log("server started.");
});
