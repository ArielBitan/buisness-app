"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subscriberSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    business: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Business",
        required: true,
    },
}, {
    timestamps: { createdAt: "subscribedAt", updatedAt: false },
    versionKey: false,
});
const Subscriber = mongoose_1.default.model("Subscriber", subscriberSchema);
exports.default = Subscriber;
//# sourceMappingURL=subscriber.model.js.map