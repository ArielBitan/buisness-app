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
exports.deleteBusiness = exports.updateBusiness = exports.createBusiness = exports.checkBusinessOwnerService = exports.getBusinesses = void 0;
const subscriber_model_1 = __importDefault(require("../models/subscriber.model"));
const business_model_1 = __importDefault(require("../models/business.model"));
const notification_model_1 = __importDefault(require("../models/notification.model"));
const index_1 = require("../index");
// Get businesses with optional filters
const getBusinesses = (filter, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const businesses = yield business_model_1.default.find(filter).limit(limit).exec();
        return businesses;
    }
    catch (err) {
        throw new Error("Failed to get businesses");
    }
});
exports.getBusinesses = getBusinesses;
const checkBusinessOwnerService = (businessId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const business = yield business_model_1.default.findById(businessId);
        if (!business) {
            throw new Error("Business not found");
        }
        return business.owner.toString() === userId;
    }
    catch (err) {
        throw new Error("Error checking business ownership");
    }
});
exports.checkBusinessOwnerService = checkBusinessOwnerService;
// Create a new business
const createBusiness = (name, description, category, image, owner) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBusiness = yield business_model_1.default.create({
            name,
            description,
            category,
            image,
            owner,
        });
        return newBusiness;
    }
    catch (err) {
        throw new Error("Failed to create business");
    }
});
exports.createBusiness = createBusiness;
const updateBusiness = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribedUsers = yield subscriber_model_1.default.find({ business: id });
        const notifications = yield Promise.all(subscribedUsers.map((subscription) => __awaiter(void 0, void 0, void 0, function* () {
            return yield notification_model_1.default.create({
                user: subscription.user,
                business: id,
                message: `${id} Updated!`,
            });
        })));
        const updatedBusiness = yield business_model_1.default.findByIdAndUpdate(id, updatedData, {
            new: true,
        });
        if (!updatedBusiness) {
            throw new Error("Business not found");
        }
        // Notify all users subscribed to the business
        index_1.io.to(id).emit("businessUpdated", {
            businessId: id,
            message: `The business has been updated.`,
        });
        return updatedBusiness;
    }
    catch (err) {
        throw new Error("Failed to update business");
    }
});
exports.updateBusiness = updateBusiness;
// Delete business by ID
const deleteBusiness = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Delete the business
        const deletedBusiness = yield business_model_1.default.findByIdAndDelete(id);
        if (!deletedBusiness) {
            throw new Error("Business not found");
        }
        // Delete all subscriptions to the business
        const deletedSubscriptions = yield subscriber_model_1.default.deleteMany({ business: id });
        // Emit the deletion event to all subscribers (rooms)
        index_1.io.to(id).emit("businessDeleted", {
            businessId: id,
            message: `The business has been deleted.`,
        });
        return deletedBusiness;
    }
    catch (err) {
        throw new Error("Failed to delete business");
    }
});
exports.deleteBusiness = deleteBusiness;
//# sourceMappingURL=business.service.js.map