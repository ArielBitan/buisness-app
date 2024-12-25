import { Link } from "react-router-dom";
import BusinessList from "@/components/BusinessList";

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-primary text-center py-10">
        <h1 className="text-4xl font-bold">Discover and Connect</h1>
        <p className="text-lg mt-4 mb-6">
          Explore businesses, subscribe for updates, and grow your reach.
        </p>
        <Link
          to="/businesses"
          className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-white/80"
        >
          Get Started
        </Link>
      </section>

      {/* Featured Businesses */}
      <section className="py-10">
        <h2 className="text-4xl text-center mb-9 font-semibold">
          Featured Businesses
        </h2>
        <BusinessList limit={4} />
      </section>

      {/* How It Works */}
      <section className="py-10 bg-secondary">
        <h2 className="text-3xl text-center">How It Works</h2>
        <div className="flex justify-center mt-6 space-x-10">
          <div className="">
            <h3 className="font-bold">1. Explore</h3>
            <p>Find businesses easily using our platform.</p>
          </div>
          <div className="">
            <h3 className="font-bold">2. Subscribe</h3>
            <p>Get the latest updates from your favorites.</p>
          </div>
          <div className="">
            <h3 className="font-bold">3. Post</h3>
            <p>List your business and reach more customers.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials py-10">
        <h2 className="text-3xl text-center">What People Are Saying</h2>
        <div className="mt-6">
          <p>"This platform helped me find the best coffee shop!"</p>
          <p>"My business has grown tremendously thanks to this app."</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-secondary text-primary text-center">
        <p>© 2024 Business Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
