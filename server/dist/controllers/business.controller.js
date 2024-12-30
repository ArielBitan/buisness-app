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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBusiness = exports.updateBusiness = exports.createBusiness = exports.checkBusinessOwnership = exports.getBusinessById = exports.getBusinesses = void 0;
const businessService = __importStar(require("../services/business.service"));
const business_model_1 = __importDefault(require("../models/business.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const user_types_1 = require("../types/user.types");
// Get businesses with optional filters
const getBusinesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter = "", limit = "10", category = "" } = req.query;
        const parsedLimit = Math.min(Math.max(parseInt(limit), 1), 100);
        const filterObj = {};
        if (filter) {
            filterObj.name = { $regex: filter, $options: "i" };
        }
        if (category) {
            filterObj.category = category;
        }
        const businesses = yield businessService.getBusinesses(filterObj, parsedLimit);
        res.status(200).json(businesses);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to get businesses" });
    }
});
exports.getBusinesses = getBusinesses;
const getBusinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const business = yield business_model_1.default.findById(id);
        if (!business) {
            res.status(404).json({ error: "Business not found" });
            return;
        }
        res.status(201).json(business);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to get business" });
    }
});
exports.getBusinessById = getBusinessById;
const checkBusinessOwnership = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.user._id;
    try {
        const isOwner = yield businessService.checkBusinessOwnerService(id, userId);
        if (!isOwner) {
            res.status(403).json({
                error: "You are not authorized to perform this action",
            });
            return;
        }
        res.status(200).json({ message: "You own this business" });
    }
    catch (err) {
        console.error(err);
        res
            .status(500)
            .json({ error: "An error occurred while checking ownership" });
    }
});
exports.checkBusinessOwnership = checkBusinessOwnership;
// Create a new business (authenticated, owner only)
const createBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, category, image } = req.body;
        const owner = req.user._id;
        const user = yield user_model_1.default.findById(owner);
        const businessCount = yield business_model_1.default.countDocuments({ owner });
        const planLimit = user_types_1.PLAN_LIMITS[user.plan];
        if (businessCount >= planLimit) {
            res.status(403).json({
                message: `Limit reached. Your plan (${user.plan}) allows only ${planLimit} businesses.`,
            });
            return;
        }
        const newBusiness = yield businessService.createBusiness(name, description, category, image, owner);
        res.status(201).json(newBusiness);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create business" });
    }
});
exports.createBusiness = createBusiness;
// Update business (authenticated, owner only)
const updateBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const updatedBusiness = yield businessService.updateBusiness(id, req.body);
        res.status(200).json(updatedBusiness);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.updateBusiness = updateBusiness;
// Delete business (authenticated, owner only)
const deleteBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedBusiness = yield businessService.deleteBusiness(id);
        res.status(200).json({ message: "Business deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.deleteBusiness = deleteBusiness;
//# sourceMappingURL=business.controller.js.map