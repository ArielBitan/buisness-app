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
exports.logout = exports.login = exports.signup = exports.updateUserDetails = exports.getUserBusinesses = exports.getSavedBusinesses = exports.getUserById = void 0;
const userService = __importStar(require("../services/user.service"));
// Get user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userService.getUserDetails(id);
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
});
exports.getUserById = getUserById;
// get user saved Businesses
const getSavedBusinesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const businesses = yield userService.getUserSavedBusinesses(id);
        if (!businesses) {
            res.status(404).json({ message: "no businesses found" });
        }
        res.status(200).json(businesses);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
});
exports.getSavedBusinesses = getSavedBusinesses;
// get user  businesses
const getUserBusinesses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const businesses = yield userService.getUserBusinesses(id);
        if (!businesses) {
            res.status(404).json({ message: "no businesses found" });
        }
        res.status(200).json(businesses);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
});
exports.getUserBusinesses = getUserBusinesses;
const updateUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const _id = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString();
        console.log(req.body);
        const { name, email, profilePic } = req.body;
        if (!_id) {
            res.status(404).json({ message: "no user found" });
        }
        const updatedUser = userService.updateUserDetails(_id, name, email, profilePic);
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(500).json({
            error: error instanceof Error ? error.message : "Internal Server Error",
        });
    }
});
exports.updateUserDetails = updateUserDetails;
// User Signup
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password, plan } = req.body;
        const newUser = yield userService.signupUser(email, name, password, plan);
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.signup = signup;
// User Login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token, user } = yield userService.loginUser(email, password);
        res
            .cookie("jwt", token, {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
            maxAge: 3600000,
        })
            .status(200)
            .json({ user });
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
exports.login = login;
// User Logout
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("jwt", {
            httpOnly: false,
            secure: false,
            sameSite: "strict",
        });
        // Respond with a success message
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.logout = logout;
//# sourceMappingURL=user.controller.js.map