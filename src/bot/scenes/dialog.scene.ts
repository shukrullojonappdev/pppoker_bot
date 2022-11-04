import { Composer, Scenes } from "telegraf";
import * as dotenv from "dotenv";

dotenv.config();

const dialogScene = new Scenes.BaseScene<any>("dialogScene");
dialogScene.on("message", (ctx) => {
  ctx.forwardMessage("@my_bot_support_group");
});
export { dialogScene };
