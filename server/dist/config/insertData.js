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
exports.injectData = void 0;
const faker_1 = require("@faker-js/faker");
const business_model_1 = __importDefault(require("../models/business.model"));
const review_model_1 = __importDefault(require("../models/review.model"));
const subscriber_model_1 = __importDefault(require("../models/subscriber.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
// Inject Data into MongoDB
const injectData = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create Users
    const users = yield user_model_1.default.insertMany(yield Promise.all(Array.from({ length: 10 }).map(() => __awaiter(void 0, void 0, void 0, function* () {
        return {
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            profilePic: faker_1.faker.image.avatar(),
            plan: faker_1.faker.helpers.arrayElement([
                "Default",
                "Standard",
                "Gold",
                "Platinum",
            ]),
        };
    }))));
    // Create Businesses
    const businesses = yield business_model_1.default.insertMany(Array.from({ length: 10 }).map(() => ({
        name: faker_1.faker.company.name(),
        description: faker_1.faker.lorem.paragraph(),
        category: faker_1.faker.commerce.department(),
        image: faker_1.faker.image.urlPicsumPhotos(),
        owner: faker_1.faker.helpers.arrayElement(users)._id,
    })));
    // Create Reviews
    const reviews = yield review_model_1.default.insertMany(Array.from({ length: 20 }).map(() => ({
        user: faker_1.faker.helpers.arrayElement(users)._id,
        business: faker_1.faker.helpers.arrayElement(businesses)._id,
        content: faker_1.faker.lorem.sentence(),
    })));
    // Create Subscribers
    const subscribers = yield subscriber_model_1.default.insertMany(Array.from({ length: 50 }).map(() => ({
        user: faker_1.faker.helpers.arrayElement(users)._id,
        business: faker_1.faker.helpers.arrayElement(businesses)._id,
    })));
    // Populate 'subscribedAt' for subscribers
    yield Promise.all(subscribers.map((subscriber) => {
        return subscriber_model_1.default.findByIdAndUpdate(subscriber._id, {
            $set: { subscribedAt: faker_1.faker.date.past() }, // Random subscription date
        });
    }));
});
exports.injectData = injectData;
//# sourceMappingURL=insertData.js.map