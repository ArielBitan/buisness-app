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
exports.isSubscribed = exports.unsubscribeFromBusiness = exports.subscribeToBusiness = exports.getSubscribersByBusinessId = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const subscriber_model_1 = __importDefault(require("../models/subscriber.model"));
//  get all subscribers of a specific business
const getSubscribersByBusinessId = (businessId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscribers = yield subscriber_model_1.default.find({ business: businessId });
        const users = yield Promise.all(subscribers.map((subscriber) => __awaiter(void 0, void 0, void 0, function* () { return yield user_model_1.default.findById(subscriber.user); })));
        return users;
    }
    catch (error) {
        throw new Error("Error fetching subscribers: " + error.message);
    }
});
exports.getSubscribersByBusinessId = getSubscribersByBusinessId;
// Subscribe a user to a business
const subscribeToBusiness = (userId, businessId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingSubscription = yield subscriber_model_1.default.findOne({
            user: userId,
            business: businessId,
        });
        const user = yield user_model_1.default.findById(userId);
        if (existingSubscription) {
            throw new Error("User is already subscribed to this business.");
        }
        const newSubscription = new subscriber_model_1.default({
            user: userId,
            business: businessId,
        });
        yield newSubscription.save();
        return newSubscription;
    }
    catch (err) {
        throw new Error(err.message || "Failed to subscribe to business");
    }
});
exports.subscribeToBusiness = subscribeToBusiness;
// Unsubscribe a user from a business
const unsubscribeFromBusiness = (userId, businessId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subscription = yield subscriber_model_1.default.findOneAndDelete({
            user: userId,
            business: businessId,
        });
        if (!subscription) {
            throw new Error("User is not subscribed to this business.");
        }
        return subscription;
    }
    catch (err) {
        throw new Error(err.message || "Failed to unsubscribe from business");
    }
});
exports.unsubscribeFromBusiness = unsubscribeFromBusiness;
const isSubscribed = (userId, businessId) => __awaiter(void 0, void 0, void 0, function* () {
    const subscription = yield subscriber_model_1.default.findOne({
        user: userId,
        business: businessId,
    });
    return !!subscription;
});
exports.isSubscribed = isSubscribed;
//# sourceMappingURL=subscription.service.js.map