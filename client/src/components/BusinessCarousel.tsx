import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import React from "react";

interface BusinessCarouselProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const BusinessCarousel = <T,>({
  items,
  renderItem,
}: BusinessCarouselProps<T>) => {
  return (
    <>
      <Carousel opts={{ loop: true }}>
        <CarouselContent>
          {items.slice(0, 10).map((item, index) => (
            <CarouselItem
              key={index}
              className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              {renderItem(item)}
              {/* Render the item using the passed function */}
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
