import { Context, Scenes } from "telegraf";

export default interface MyContext extends Context {
  scene: Scenes.SceneContextScene<MyContext, Scenes.WizardSessionData>;
  wizard: Scenes.WizardContextWizard<MyContext>;
}

export interface IQuestionaire {
  fullname: string;
  phoneNumber: string;
  pppokerId: string;
  usdTexId: string;
}
