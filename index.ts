import { Markup, Scenes, session, Telegraf } from "telegraf";
import { questionnaireScene, myData } from "./scenes/questionnaire";
import MyContext from "./interfaces";

const bot = new Telegraf<MyContext>(
  "5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw"
);

const stage = new Scenes.Stage<MyContext>([questionnaireScene]);
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

bot.hears("🙎‍♂Мой профиль", async (ctx) => {
  await ctx.reply(
    `💁Ваши данные находятся тут! \nНомер телефона: ${myData.phoneNumber} \nID в приложении: ${myData.pppokerId} \nАдрес кошелька: ${myData.usdTexId}`,
    Markup.inlineKeyboard([
      [Markup.button.callback("⚙️Изменить данные", "changeData")],
      [Markup.button.callback("🔙Назад", "back")],
    ])
  );
});
// bot.hears("", async (ctx) => {
//   await ctx.reply();
// });
bot.hears("📞Связь с оператором", async (ctx) => {
  await ctx.replyWithHTML(
    `Привет, @${ctx.from.username}! \n\n<b>Это связь с командой</b>⚙️ тех.поддержки проекта. \n\n<b>Напиши вопрос</b> в поле ввода сообщений. \n\nА если вопросов нет 👉 жми [Завершить диалог].`,
    Markup.inlineKeyboard([
      Markup.button.callback("❌📞Завершить диалог", "stopDialog"),
    ])
  );
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
