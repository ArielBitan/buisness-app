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
exports.isReviewOwner = exports.deleteReview = exports.updateReview = exports.getReviewsByBusiness = exports.createReview = void 0;
const review_model_1 = __importDefault(require("../models/review.model"));
// Create a new review
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_model_1.default.create(data);
        return review;
    }
    catch (err) {
        throw new Error("Failed to create review");
    }
});
exports.createReview = createReview;
// Get all reviews for a specific business
const getReviewsByBusiness = (businessId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_model_1.default.find({ business: businessId })
            .populate("user", "name email profilePic")
            .sort({ createdAt: -1 });
        return reviews;
    }
    catch (err) {
        throw new Error("Failed to get reviews");
    }
});
exports.getReviewsByBusiness = getReviewsByBusiness;
// Update a review
const updateReview = (reviewId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedReview = yield review_model_1.default.findByIdAndUpdate(reviewId, updatedData, {
            new: true,
        });
        if (!updatedReview) {
            throw new Error("Review not found");
        }
        return updatedReview;
    }
    catch (err) {
        throw new Error("Failed to update review");
    }
});
exports.updateReview = updateReview;
// Delete a review
const deleteReview = (reviewId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedReview = yield review_model_1.default.findOneAndDelete({
            _id: reviewId,
            user: userId,
        });
        if (!deletedReview) {
            throw new Error("Review not found");
        }
        return deletedReview;
    }
    catch (err) {
        throw new Error("Failed to delete review");
    }
});
exports.deleteReview = deleteReview;
const isReviewOwner = (userId, reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const isOwner = yield review_model_1.default.findOne({
        user: userId,
        _id: reviewId,
    });
    return !!isOwner;
});
exports.isReviewOwner = isReviewOwner;
//# sourceMappingURL=review.service.js.map