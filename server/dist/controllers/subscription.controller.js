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
exports.toggleSubscription = exports.checkSubscription = exports.getSubscribers = void 0;
const subscriptionService = __importStar(require("../services/subscription.service"));
// get all subscribers of a business
const getSubscribers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const businessId = req.params.id;
        const subscribers = yield subscriptionService.getSubscribersByBusinessId(businessId);
        if (subscribers.length === 0) {
            res
                .status(404)
                .json({ message: "No subscribers found for this business." });
            return;
        }
        res.status(200).json(subscribers);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching subscribers.",
            error: error.message,
        });
        return;
    }
});
exports.getSubscribers = getSubscribers;
const checkSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
    const { id } = req.params;
    const isSubscribed = yield subscriptionService.isSubscribed(_id, id);
    res.status(200).json(isSubscribed);
});
exports.checkSubscription = checkSubscription;
const toggleSubscription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
    const { id } = req.params;
    try {
        // Check if the user is already subscribed
        const isSubscribed = yield subscriptionService.isSubscribed(_id, id);
        let subscription;
        let message;
        if (isSubscribed) {
            // Unsubscribe if already subscribed
            subscription = yield subscriptionService.unsubscribeFromBusiness(_id, id);
            message = "Unsubscribed successfully";
        }
        else {
            // Subscribe if not subscribed
            subscription = yield subscriptionService.subscribeToBusiness(_id, id);
            message = "Subscribed successfully";
        }
        res.status(200).json({ message, subscription });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.toggleSubscription = toggleSubscription;
//# sourceMappingURL=subscription.controller.js.map