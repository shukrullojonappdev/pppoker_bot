import { model, Schema } from "mongoose";
import { IClub } from "../interfaces/club.interface";

const clubScheme = new Schema<IClub>({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	cur: { type: String, required: true },
	usdtexid: { type: String, required: true }
})

export const Club = model<IClub>('Club', clubScheme)
