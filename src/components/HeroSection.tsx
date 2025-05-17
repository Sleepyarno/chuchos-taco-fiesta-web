
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const HeroSection = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?q=80&w=1200",
      title: "Authentic Mexican Tacos",
      description: "Experience the vibrant flavors of traditional Mexican street food",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=1200",
      title: "Freshly Made Tacos",
      description: "Handcrafted with love and the finest ingredients",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1613514785940-daed07799d9b?q=80&w=1200",
      title: "THE REAL MEXICAN FOOD",
      description: "Secret recipes passed down through generations",
    },
  ];

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative">
              <div className="h-[500px] w-full relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4 bg-gradient-to-t from-black/60 to-transparent">
                  {slide.id === 3 ? (
                    <div className="mb-4">
                      <Logo size="lg" />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-4xl md:text-6xl font-bold mb-4 text-center shadow-text">
                        {slide.title}
                      </h2>
                      <p className="text-xl md:text-2xl mb-8 max-w-2xl text-center shadow-text">
                        {slide.description}
                      </p>
                    </>
                  )}
                  <div className="flex gap-4">
                    <Button className="bg-bright-orange hover:bg-orange-500 text-white">
                      Order Online
                    </Button>
                    <Button variant="outline" className="text-white border-white hover:bg-white/20">
                      View Menu
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default HeroSection;
