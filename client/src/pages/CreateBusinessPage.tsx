import { CreateBusinessForm } from "@/components/CreateBusinessForm";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";
import { Link } from "react-router-dom";

const CreateBusinessPage = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col mx-32 my-10">
      {user ? (
        <>
          <h1 className="mb-6 text-3xl">Create New Business</h1>
          <CreateBusinessForm />
        </>
      ) : (
        <>
          <h1 className="mb-6 text-3xl">Please Login to continue</h1>
          <Link to="/login">
            <Button>To login page</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default CreateBusinessPage;
