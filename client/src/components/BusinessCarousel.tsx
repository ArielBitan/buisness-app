import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import BusinessCard from "./BusinessCard";
import { IBusiness } from "@/types/business.type";
import React from "react";

interface BusinessCarouselProps {
  businesses: IBusiness[];
}

const BusinessCarousel: React.FC<BusinessCarouselProps> = ({ businesses }) => {
  return (
    <>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {businesses.slice(0, 10).map((business) => (
            <CarouselItem
              key={business._id}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <Link to={`/businesses/${business._id}`}>
                <div className="shadow-md rounded-lg">
                  <BusinessCard business={business} />
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 transform -translate-y-1/2 bg-primary text-secondary rounded-full p-2 " />
        <CarouselNext className="absolute top-1/2 transform -translate-y-1/2 bg-primary text-secondary rounded-full p-2 " />
      </Carousel>
    </>
  );
};

export default BusinessCarousel;
