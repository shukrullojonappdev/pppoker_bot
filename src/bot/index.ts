import { Markup, Scenes, session, Telegraf } from "telegraf";
import { questionnaireScene, myData } from "./scenes/questionnaire.scene";
import mongoose from "mongoose";
import { User } from "./models/user.model";

export const mainKeyboard = Markup.keyboard([
  ["🙎‍♂Мой профиль", "🏡На главную"],
  ["📞Связь с оператором"],
])
  .oneTime()
  .resize();

export default async function Bot(botToken: string, dataSource: string) {
  const bot = new Telegraf<Scenes.WizardContext>(botToken);
  await mongoose.connect(dataSource);

  const stage = new Scenes.Stage<Scenes.WizardContext>([questionnaireScene]);
  bot.use(session());
  bot.use(stage.middleware());

  bot.start(async (ctx) => {
    const candidant = await User.findOne({
      username: ctx.from.username,
    }).exec();
    if (candidant) {
      try {
        ctx.reply("С возращением!", mainKeyboard);
      } catch (e) {
        console.error(e);
      }
    } else {
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
    const user = await User.findOne({
      username: ctx.from.username,
    }).exec();
    await ctx.reply("", Markup.removeKeyboard());
    await ctx.reply(
      `💁Ваши данные находятся тут! \nНомер телефона: ${user?.phoneNumber} \nID в приложении: ${user?.pppokerId} \nАдрес кошелька: ${user?.usdTexId}`,
      Markup.inlineKeyboard([
        [Markup.button.callback("⚙️Изменить данные", "changeData")],
        [Markup.button.callback("🔙Назад", "back")],
      ])
    );
  });

  bot.hears("📞Связь с оператором", async (ctx) => {
    await ctx.replyWithHTML(
      `Привет, @${ctx.from.username}! \n\n<b>Это связь с командой</b>⚙️ тех.поддержки проекта. \n\n<b>Напиши вопрос</b> в поле ввода сообщений. \n\nА если вопросов нет 👉 жми [Завершить диалог].`,
      Markup.inlineKeyboard([
        Markup.button.callback("❌📞Завершить диалог", "stopDialog"),
      ])
    );
  });

  bot.action("back", async (ctx) => {
    await ctx.reply("", mainKeyboard);
  });

  bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
}
