"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    fullname: { type: String, required: true },
    pppokerId: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    usdTexId: { type: String, required: true },
    chips: { type: Number },
});
exports.User = (0, mongoose_1.model)("User", userSchema);
