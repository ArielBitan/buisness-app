import { IBusiness } from "@/types/business.type";
import { Loader } from "lucide-react";
import { Img } from "react-image";

interface BusinessCardProps {
  business: IBusiness;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <div className="flex flex-col items-center font-poppins">
      <div className="w-4/6 h-[200px] overflow-hidden">
        <Img
          className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          src={[business.image]}
          loader={<Loader />}
        />
      </div>
      <div className="text-center mt-4 font-semi-bold text-2xl">
        {business.name}
      </div>
      <div className="mb-6 mt-2 px-3 rounded-xl text-sm bg-primary/20 hover:scale-110 hover:underline">
        {business.category}
      </div>
      <div className="px-10 text-primary/70">{business.description}</div>
    </div>
  );
};

export default BusinessCard;
