"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myData = exports.questionnaireScene = void 0;
const telegraf_1 = require("telegraf");
const user_model_1 = require("../models/user.model");
let myData = null;
exports.myData = myData;
const fullnameStep = new telegraf_1.Composer();
fullnameStep.action("questionaire", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        exports.myData = myData = ctx.wizard.state;
        yield ctx.replyWithHTML("<b>Шаг 1 - как мне к вам обращаться?</b> \nУкажите ваше имя!");
        return ctx.wizard.next();
    }
    catch (e) {
        console.error(e);
    }
}));
const pppokerStep = new telegraf_1.Composer();
pppokerStep.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    myData.fullname = ctx.message.text;
    if (/^[a-zа-ё ]+$/i.test(myData.fullname)) {
        yield ctx.reply("Шаг 2 - ваш ID в приложении PPPoker! \nУкажите, пожалуйста, ваш ID в PPPoker");
        return ctx.wizard.next();
    }
    else {
        ctx.reply('❌Так не получится! Укажите имя в формате "имя фамилия" без смайликов, цифр, и иных символов.');
    }
}));
const phoneNumStep = new telegraf_1.Composer();
phoneNumStep.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    myData.pppokerId = ctx.message.text;
    if (/^[0-9]+$/i.test(myData.pppokerId)) {
        yield ctx.reply("Шаг 3 - контактные данные! Укажите, пожалуйста, номер вашего телефона, это важно!");
        return ctx.wizard.next();
    }
    else {
        ctx.reply("❌Так не получится! Укажите ваш ID только цифрами!");
    }
}));
const usdTexStep = new telegraf_1.Composer();
usdTexStep.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    myData.phoneNumber = ctx.message.text;
    if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(myData.phoneNumber)) {
        yield ctx.reply("Шаг 4 - ваш адрес в USDTexBot! Пожалуйста, укажите адрес вашего кошелька в боте USDTex bot! Только так бот сможет понять, от кого поступают средства");
        return ctx.wizard.next();
    }
    else {
        ctx.reply("❌Так не получится! Укажите ваш номер телефона в формате +79.......");
    }
}));
const congulationStep = new telegraf_1.Composer();
congulationStep.on("text", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    myData.usdTexId = ctx.message.text;
    myData.username = ctx.from.username;
    const user = new user_model_1.User(myData);
    yield user.save();
    console.log(myData);
    yield ctx.reply("🥳");
    yield ctx.reply("Поздравляем! Вы прошли заполнение анкеты, и получаете бонус в размере 5 фишек на свой баланс! Теперь вам доступен весь функционал бота.", telegraf_1.Markup.keyboard([
        ["🙎‍♂Мой профиль", "🏡На главную"],
        ["📞Связь с оператором"],
    ])
        .oneTime()
        .resize());
    return ctx.scene.leave();
}));
const questionnaireScene = new telegraf_1.Scenes.WizardScene("questionnaireWizard", fullnameStep, pppokerStep, phoneNumStep, usdTexStep, congulationStep);
exports.questionnaireScene = questionnaireScene;
