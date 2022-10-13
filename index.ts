import { Markup, Scenes, session, Telegraf } from "telegraf";
import questionnaireScene from "./scenes/Questionnaire";

const bot = new Telegraf<Scenes.WizardContext>(
  "5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw"
);

const stage = new Scenes.Stage<Scenes.WizardContext>([questionnaireScene]);
bot.use(session());
bot.use(stage.middleware());

bot.start(async (ctx) => {
  try {
    await ctx.reply(
      `🃏Привет, @${ctx.from.username}! Спасибо, что воспользовались PPPoker_bot! С помощью этого бота вы сможете удобным способом пополнять, снимать, переводить фишки между клубами, в общем - красота! Заполнив анкету вы получите бонус! Особенность нашего бота в том, что вы можете получать рейкбек не раз в неделю, а каждый день!   Для того, чтобы мы с вами могли приступить к работе, нам необходимо заполнить анкету пользователя. Следуте следующим простым инструкциям👇`,
      Markup.inlineKeyboard([
        Markup.button.callback("Я готов!🔥", "questionaire"),
      ])
    );
  } catch (e) {
    console.error(e);
  }
});

bot.action("questionaire", async (ctx) => {
  try {
    await ctx.scene.enter("questionnaireWizard");
  } catch (e) {
    console.error(e);
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
