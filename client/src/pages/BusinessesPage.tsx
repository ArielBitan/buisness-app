import BusinessList from "@/components/BusinessList";

const BusinessesPage = () => {
  return (
    <div>
      <h1 className="text-center my-6 text-4xl font-bold font-sans">
        Our Businesses
      </h1>
      <BusinessList limit={20} />
    </div>
  );
};

export default BusinessesPage;
