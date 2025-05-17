
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { getHeroData } from "@/utils/dataManager";

const HeroSection = () => {
  const heroData = getHeroData();

  return (
    <div className="relative">
      <Carousel className="w-full">
        <CarouselContent>
          {heroData.slides.map((slide) => (
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
