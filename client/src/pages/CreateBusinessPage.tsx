import { CreateBusinessForm } from "@/components/CreateBusinessForm";

const CreateBusinessPage = () => {
  return (
    <div className="flex flex-col mx-32 my-10">
      <h1 className="mb-6 text-3xl">Create New Business</h1>

      <CreateBusinessForm />
    </div>
  );
};

export default CreateBusinessPage;
