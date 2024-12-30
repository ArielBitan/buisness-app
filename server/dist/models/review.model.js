"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviewSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    business: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Business",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
const Review = mongoose_1.default.model("Review", reviewSchema);
exports.default = Review;
//# sourceMappingURL=review.model.js.map