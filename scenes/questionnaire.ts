import { Markup, Composer, Scenes } from "telegraf";

const fullnameStep = new Composer<Scenes.WizardContext>();
fullnameStep.action("questionaire", async (ctx) => {
  try {
    ctx.wizard.state.fullname = await ctx.reply(
      "Шаг 1 - как мне к вам обращаться? Укажите ваше имя!"
    );
    return ctx.wizard.next();
  } catch (e) {
    console.error(e);
  }
});

const pppokerStep = new Composer<Scenes.WizardContext>();
pppokerStep.on("text", async (ctx) => {
  await ctx.reply(
    "Шаг 2 - ваш ID в приложении PPPoker!  Укажите, пожалуйста, ваш ID в PPPoker"
  );
  return ctx.wizard.next();
});

const congulationStep = new Composer<Scenes.WizardContext>();
congulationStep.on("text", async (ctx) => {
  await ctx.reply(
    "Поздравляем! Вы прошли заполнение анкеты, и получаете бонус в размере 5 фишек на свой баланс! Теперь вам доступен весь функционал бота."
  );
  return ctx.scene.leave();
});

const questionnaireScene = new Scenes.WizardScene(
  "questionnaireWizard",
  fullnameStep,
  pppokerStep,
  congulationStep
);

export default questionnaireScene;
