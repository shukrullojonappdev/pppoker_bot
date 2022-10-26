import { Markup, Composer, Scenes } from "telegraf";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

let myData: any = null;

const fullnameStep = new Composer<Scenes.WizardContext>();
fullnameStep.action("questionaire", async (ctx) => {
  try {
    myData = ctx.wizard.state as IUser;
    await ctx.replyWithHTML(
      "<b>Шаг 1 - как мне к вам обращаться?</b> \nУкажите ваше имя!"
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const pppokerStep = new Composer<Scenes.WizardContext>();
pppokerStep.on("text", async (ctx) => {
  myData.fullname = ctx.message.text;
  if (/^[a-zа-ё ]+$/i.test(myData.fullname)) {
    await ctx.reply(
      "Шаг 2 - ваш ID в приложении PPPoker! \nУкажите, пожалуйста, ваш ID в PPPoker"
    );
    return ctx.wizard.next();
  } else {
    ctx.reply(
      '❌Так не получится! Укажите имя в формате "имя фамилия" без смайликов, цифр, и иных символов.'
    );
  }
});

const phoneNumStep = new Composer<Scenes.WizardContext>();
phoneNumStep.on("text", async (ctx) => {
  myData.pppokerId = ctx.message.text;
  if (/^[0-9]+$/i.test(myData.pppokerId)) {
    await ctx.reply(
      "Шаг 3 - контактные данные! Укажите, пожалуйста, номер вашего телефона, это важно!"
    );
    return ctx.wizard.next();
  } else {
    ctx.reply("❌Так не получится! Укажите ваш ID только цифрами!");
  }
});

const usdTexStep = new Composer<Scenes.WizardContext>();
usdTexStep.on("text", async (ctx) => {
  myData.phoneNumber = ctx.message.text;
  if (
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
      myData.phoneNumber
    )
  ) {
    await ctx.reply(
      "Шаг 4 - ваш адрес в USDTexBot! Пожалуйста, укажите адрес вашего кошелька в боте USDTex bot! Только так бот сможет понять, от кого поступают средства"
    );
    return ctx.wizard.next();
  } else {
    ctx.reply(
      "❌Так не получится! Укажите ваш номер телефона в формате +79......."
    );
  }
});

const congulationStep = new Composer<Scenes.WizardContext>();
congulationStep.on("text", async (ctx) => {
  myData.usdTexId = ctx.message.text;
  myData.username = ctx.from.username;

  const user = new User(myData);
  await user.save();

  await ctx.reply("🥳");
  await ctx.reply(
    "Поздравляем! Вы прошли заполнение анкеты, и получаете бонус в размере 5 фишек на свой баланс! Теперь вам доступен весь функционал бота.",
    Markup.keyboard([
      ["🙎‍♂Мой профиль", "🏡На главную"],
      ["📞Связь с оператором"],
    ])
      .oneTime()
      .resize()
  );
  return ctx.scene.leave();
});

const questionnaireScene = new Scenes.WizardScene(
  "questionnaireWizard",
  fullnameStep,
  pppokerStep,
  phoneNumStep,
  usdTexStep,
  congulationStep
);

export { questionnaireScene, myData };
