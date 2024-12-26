import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import BusinessCarousel from "@/components/BusinessCarousel";
import ErrorMessage from "@/components/ErrorMessage";
import {
  getUserDetails,
  getSavedBusinesses,
  getUserBusinesses,
} from "@/services/user.service";
import BusinessCard from "@/components/BusinessCard";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { id: userId } = useParams();

  // Consolidated query for user details and saved businesses
  const { data, status, error } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      if (!userId)
        return { user: null, savedBusinesses: [], userBusinesses: [] };

      const user = await getUserDetails(userId as string);
      const savedBusinesses = await getSavedBusinesses(userId as string);
      const userBusinesses = await getUserBusinesses(userId as string);

      return { user, savedBusinesses, userBusinesses };
    },
    enabled: !!userId,
  });

  if (status === "pending")
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader className="animate-spin" size={48} />
      </div>
    );

  if (status === "error" || !userId)
    return (
      <ErrorMessage message={error?.message || "Error fetching user details"} />
    );

  const { user, savedBusinesses, userBusinesses } = data;

  if (!user) {
    return;
  }

  return (
    <div className="mx-20 px-6 py-8 bg-primary/5 rounded-lg shadow-md mt-12">
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
          <img
            src={user?.profilePic || "https://via.placeholder.com/150"}
            alt={`${user?.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user?.name}</h1>
          <p>{user?.email}</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-primary/60">
              {user?.plan}
            </span>
            <p className="text-sm mt-1">
              Member since: {new Date(user?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">User Businesses</h2>
        {userBusinesses.length > 0 ? (
          <BusinessCarousel
            items={userBusinesses}
            renderItem={(business) => (
              <div className="shadow-md rounded-lg">
                <Link to={`/businesses/${business._id}`}>
                  <BusinessCard business={business} />
                </Link>
              </div>
            )}
          />
        ) : (
          <h2>User doesn't have any businesses yet</h2>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">User Saved Businesses</h2>
        {savedBusinesses.length > 0 ? (
          <BusinessCarousel
            items={savedBusinesses}
            renderItem={(business) => (
              <div className="shadow-md rounded-lg">
                <Link to={`/businesses/${business._id}`}>
                  <BusinessCard business={business} />
                </Link>
              </div>
            )}
          />
        ) : (
          <h2>User doesn't have any saved businesses yet</h2>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
