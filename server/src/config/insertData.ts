import { faker } from "@faker-js/faker";
import Business from "../models/business.model";
import Review from "../models/review.model";
import Subscriber from "../models/subscriber.model";
import User from "../models/user.model";

// Inject Data into MongoDB
export const injectData = async () => {
  // Create Users
  const users = await User.insertMany(
    await Promise.all(
      Array.from({ length: 10 }).map(async () => {
        return {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          profilePic: faker.image.avatar(),
          plan: faker.helpers.arrayElement([
            "Default",
            "Standard",
            "Gold",
            "Platinum",
          ]),
        };
      })
    )
  );
  console.log(`${users.length} users inserted.`);

  // Create Businesses
  const businesses = await Business.insertMany(
    Array.from({ length: 10 }).map(() => ({
      name: faker.company.name(),
      description: faker.lorem.paragraph(),
      category: faker.commerce.department(),
      image: faker.image.urlPicsumPhotos(),
      owner: faker.helpers.arrayElement(users)._id,
    }))
  );
  console.log(`${businesses.length} businesses inserted.`);

  // Create Reviews
  const reviews = await Review.insertMany(
    Array.from({ length: 20 }).map(() => ({
      user: faker.helpers.arrayElement(users)._id,
      business: faker.helpers.arrayElement(businesses)._id,
      content: faker.lorem.sentence(),
    }))
  );
  console.log(`${reviews.length} reviews inserted.`);

  // Create Subscribers
  const subscribers = await Subscriber.insertMany(
    Array.from({ length: 50 }).map(() => ({
      user: faker.helpers.arrayElement(users)._id,
      business: faker.helpers.arrayElement(businesses)._id,
    }))
  );
  console.log(`${subscribers.length} subscribers inserted.`);

  // Populate 'subscribedAt' for subscribers
  await Promise.all(
    subscribers.map((subscriber) => {
      return Subscriber.findByIdAndUpdate(subscriber._id, {
        $set: { subscribedAt: faker.date.past() }, // Random subscription date
      });
    })
  );
  console.log("Subscriber subscription dates populated.");
};
