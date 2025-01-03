"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteReview = exports.updateReview = exports.getReviewsByBusiness = exports.checkReviewOwnership = exports.createReview = void 0;
const reviewService = __importStar(require("../services/review.service")); // Adjust based on your actual file structure
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const { content } = req.body;
        const user = req.user._id;
        if (!businessId || !content) {
            res.status(400).json({ error: "Business ID and content are required" });
            return;
        }
        const review = yield reviewService.createReview({
            user,
            business: businessId,
            content,
        });
        res.status(201).json(review);
    }
    catch (err) {
        console.error("Error creating review:", err);
        res.status(500).json({ error: "Failed to create review" });
    }
});
exports.createReview = createReview;
const checkReviewOwnership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
    const { id } = req.params;
    const isSubscribed = yield reviewService.isReviewOwner(_id, id);
    res.status(200).json(isSubscribed);
});
exports.checkReviewOwnership = checkReviewOwnership;
// Get all reviews for a specific business
const getReviewsByBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { businessId } = req.params;
        const reviews = yield reviewService.getReviewsByBusiness(businessId);
        res.status(200).json(reviews);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get reviews" });
    }
});
exports.getReviewsByBusiness = getReviewsByBusiness;
// Update a review
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId } = req.params;
        const { content } = req.body;
        const updatedReview = yield reviewService.updateReview(reviewId, {
            content,
        });
        if (!updatedReview) {
            res.status(404).json({ error: "Review not found" });
            return;
        }
        res.status(200).json(updatedReview);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update review" });
    }
});
exports.updateReview = updateReview;
// Delete a review
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reviewId } = req.params;
        const userId = req.user._id;
        const deletedReview = yield reviewService.deleteReview(reviewId, userId);
        if (!deletedReview) {
            res.status(404).json({ error: "Review not found" });
            return;
        }
        res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete review" });
    }
});
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.controller.js.map