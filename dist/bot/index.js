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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const telegraf_1 = require("telegraf");
const questionnaire_scene_1 = require("./scenes/questionnaire.scene");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./models/user.model");
class Bot {
    constructor(botToken, dataSource) {
        this.botToken = botToken;
        this.dataSource = dataSource;
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const bot = new telegraf_1.Telegraf(this.botToken);
            yield mongoose_1.default.connect(this.dataSource);
            const stage = new telegraf_1.Scenes.Stage([questionnaire_scene_1.questionnaireScene]);
            bot.use((0, telegraf_1.session)());
            bot.use(stage.middleware());
            bot.start((ctx) => __awaiter(this, void 0, void 0, function* () {
                const candidant = yield user_model_1.User.findOne({
                    username: ctx.from.username,
                }).exec();
                if (candidant) {
                    try {
                        ctx.reply("С возращением!");
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                else {
                    try {
                        yield ctx.reply(`🃏Привет, @${ctx.from.username}! Спасибо, что воспользовались PPPoker_bot! С помощью этого бота вы сможете удобным способом пополнять, снимать, переводить фишки между клубами, в общем - красота! Заполнив анкету вы получите бонус! Особенность нашего бота в том, что вы можете получать рейкбек не раз в неделю, а каждый день!   Для того, чтобы мы с вами могли приступить к работе, нам необходимо заполнить анкету пользователя. Следуте следующим простым инструкциям👇`, telegraf_1.Markup.inlineKeyboard([
                            telegraf_1.Markup.button.callback("Я готов!🔥", "questionaire"),
                        ]));
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            }));
            bot.action("questionaire", (ctx) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield ctx.scene.enter("questionnaireWizard");
                }
                catch (e) {
                    console.error(e);
                }
            }));
            bot.hears("🙎‍♂Мой профиль", (ctx) => __awaiter(this, void 0, void 0, function* () {
                yield ctx.reply(`💁Ваши данные находятся тут! \nНомер телефона: ${questionnaire_scene_1.myData.phoneNumber} \nID в приложении: ${questionnaire_scene_1.myData.pppokerId} \nАдрес кошелька: ${questionnaire_scene_1.myData.usdTexId}`, telegraf_1.Markup.inlineKeyboard([
                    [telegraf_1.Markup.button.callback("⚙️Изменить данные", "changeData")],
                    [telegraf_1.Markup.button.callback("🔙Назад", "back")],
                ]));
            }));
            bot.hears("📞Связь с оператором", (ctx) => __awaiter(this, void 0, void 0, function* () {
                yield ctx.replyWithHTML(`Привет, @${ctx.from.username}! \n\n<b>Это связь с командой</b>⚙️ тех.поддержки проекта. \n\n<b>Напиши вопрос</b> в поле ввода сообщений. \n\nА если вопросов нет 👉 жми [Завершить диалог].`, telegraf_1.Markup.inlineKeyboard([
                    telegraf_1.Markup.button.callback("❌📞Завершить диалог", "stopDialog"),
                ]));
            }));
            bot.launch();
            process.once("SIGINT", () => bot.stop("SIGINT"));
            process.once("SIGTERM", () => bot.stop("SIGTERM"));
        });
    }
}
exports.Bot = Bot;
