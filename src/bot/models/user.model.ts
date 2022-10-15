import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  fullname: { type: String, required: true },
  pppokerId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  usdTexId: { type: String, required: true },
  chips: { type: Number },
});

export const User = model<IUser>("User", userSchema);
