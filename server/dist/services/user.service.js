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
exports.loginUser = exports.signupUser = exports.updateUserDetails = exports.getUserBusinesses = exports.getUserSavedBusinesses = exports.getUserDetails = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const business_model_1 = __importDefault(require("../models/business.model"));
const subscriber_model_1 = __importDefault(require("../models/subscriber.model"));
// Get user by id service
const getUserDetails = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            throw new Error("User doesnt exist");
        }
        const businessCount = yield business_model_1.default.countDocuments({ owner: user._id });
        const userWithBusinessCount = Object.assign(Object.assign({}, user.toObject()), { businessCount });
        return userWithBusinessCount;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUserDetails = getUserDetails;
// Get user saved businesses
const getUserSavedBusinesses = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            throw new Error("User doesnt exist");
        }
        const subscriptions = yield subscriber_model_1.default.find({ user: id });
        const savedBusinesses = yield Promise.all(subscriptions.map((subscription) => __awaiter(void 0, void 0, void 0, function* () { return yield business_model_1.default.findById(subscription.business); })));
        return savedBusinesses;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUserSavedBusinesses = getUserSavedBusinesses;
const getUserBusinesses = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(id);
        if (!user) {
            throw new Error("User doesnt exist");
        }
        const businesses = yield business_model_1.default.find({ owner: id });
        return businesses;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getUserBusinesses = getUserBusinesses;
const updateUserDetails = (id, name, email, profilePic) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOneAndUpdate({ _id: id }, { name, email, profilePic });
        if (!user) {
            throw new Error("User doesn't exist");
        }
        return user;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updateUserDetails = updateUserDetails;
// Signup Service
const signupUser = (email, name, password, plan) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("User already exists");
    }
    const newUser = new user_model_1.default({
        email,
        name,
        password,
        plan,
    });
    yield newUser.save();
    return newUser;
});
exports.signupUser = signupUser;
// Login Service
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }
    const businessCount = yield business_model_1.default.countDocuments({ owner: user._id });
    const isMatch = yield bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    // Generate a JWT token
    const token = jsonwebtoken_1.default.sign({
        email,
        _id: user._id,
        plan: user.plan,
        businessCount,
        profilePic: user.profilePic,
    }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.service.js.map