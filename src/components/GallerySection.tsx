
import { useEffect, useState } from 'react';
import { getGalleryData } from "@/utils/dataManager";
import { Card, CardContent } from "@/components/ui/card";

const GallerySection = () => {
  const [galleryData, setGalleryData] = useState(getGalleryData());

  // Listen for localStorage changes to update gallery in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      setGalleryData(getGalleryData());
    };

    // Listen for storage events (cross-tab updates)
    window.addEventListener('storage', handleStorageChange);
    
    // Check for updates every 5 seconds instead of every second for better performance
    const interval = setInterval(() => {
      const currentData = getGalleryData();
      setGalleryData(currentData);
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <section id="gallery" className="py-16">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">{galleryData.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryData.images.map((image, index) => (
            <Card key={`${index}-${image.src}`} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-0 relative">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-80 object-cover" 
                  onError={(e) => {
                    console.error('Image failed to load:', image.src);
                    e.currentTarget.src = '/placeholder.svg';
                  }}
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
