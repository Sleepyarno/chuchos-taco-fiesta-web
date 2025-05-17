
import { getGalleryData } from "@/utils/dataManager";
import { Card, CardContent } from "@/components/ui/card";

const GallerySection = () => {
  const galleryData = getGalleryData();

  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">{galleryData.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.images.map((image, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0 relative">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <p className="text-white font-medium">{image.caption}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
