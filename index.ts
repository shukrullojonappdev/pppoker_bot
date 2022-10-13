import { Telegraf } from "telegraf";

const bot = new Telegraf("5420356035:AAG_za1nsfUZvVDt-KBPJuMzLTqdOK2lOjw");

let name = "";
let pppokerId = "";
let phoneNumber = "";
let usdTexBotId = "";

bot.start(async (ctx) => {
  const userId = await ctx.message.chat.id;

  bot.telegram.getChat(userId).then(async (chat) => {
    await ctx.reply(
      `🃏Привет, ! Спасибо, что воспользовались PPPoker_bot! С помощью этого бота вы сможете удобным способом пополнять, снимать, переводить фишки между клубами, в общем - красота! Заполнив анкету вы получите бонус! Особенность нашего бота в том, что вы можете получать рейкбек не раз в неделю, а каждый день!   Для того, чтобы мы с вами могли приступить к работе, нам необходимо заполнить анкету пользователя. Следуте следующим простым инструкциям👇`,
      {
        reply_markup: {
          inline_keyboard: [[{ text: "Я готов", callback_data: "step_1" }]],
        },
      }
    );
  });
});

bot.action("step_1", async (ctx) => {
  try {
    await ctx.reply("Шаг 1 - как мне к вам обращаться? Укажите ваше имя!");
    await bot.on("text", async (ctx) => {
      name = await ctx.message.text;
      if (/^[a-zа-ё ]*$/i.test(name)) {
        await ctx.reply(
          "Шаг 2 - ваш ID в приложении PPPoker! Укажите, пожалуйста, ваш ID в PPPoker"
        );
        bot.hears(name, async (ctx) => {
          try {
            await ctx.reply("step_3");
          } catch {}
        });
      } else {
        await ctx.reply(
          '❌Так не получится! Укажите имя в формате "имя фамилия" без смайликов, цифр, и иных символов. '
        );
      }
    });
  } catch (e) {
    console.log(e);
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
