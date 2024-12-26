import BusinessCarousel from "@/components/BusinessCarousel";
import ErrorMessage from "@/components/ErrorMessage";
import { getSavedBusinesses, getUserDetails } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id: userId } = useParams();
  const {
    data: user,
    status: userStatus,
    error: userError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetails(userId as string),
    enabled: !!userId,
  });

  const {
    data: savedBusinesses,
    status: savedBusinessesStatus,
    error: savedBusinessesError,
  } = useQuery({
    queryKey: ["business", userId],
    queryFn: () => getSavedBusinesses(userId as string),

    enabled: !!userId,
  });

  if (userStatus === "pending")
    return (
      <div className="absolute inset-0 flex items-center justify-center ">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  if (userStatus === "error" || !userId)
    return (
      <ErrorMessage
        message={userError?.message || "Error fetching user details"}
      />
    );
  if (savedBusinessesStatus === "pending")
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <Loader className="animate-spin" size={48} />
      </div>
    );

  if (savedBusinessesStatus === "error" || !userId)
    return (
      <ErrorMessage
        message={savedBusinessesError?.message || "Error fetching user details"}
      />
    );

  return (
    <div className=" mx-20 px-6 py-8 bg-primary/5 rounded-lg shadow-md mt-12">
      <div className="flex items-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
          <img
            src={user.profilePic || "https://via.placeholder.com/150"}
            alt={`${user.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p>{user.email}</p>
          <div className="mt-4">
            <span
              className="inline-block px-3 py-1 text-sm font-semibold  rounded-full 
              bg-primary/60"
            >
              {user.plan}
            </span>
            <p className="text-sm mt-1">
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Your Saved Businesses</h2>
        {/* <BusinessCarousel businesses={userBusinesses} /> */}
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Your Saved Businesses</h2>
        <BusinessCarousel businesses={savedBusinesses} />
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Business Count</h2>
        <p className="mt-2 text-xl ">{user.businessCount}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
