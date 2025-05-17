
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGalleryData, updateGallery } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";
import { Trash, Plus } from "lucide-react";

const GalleryEditor = () => {
  const [galleryData, setGalleryData] = useState(getGalleryData());
  const { toast } = useToast();

  const handleSave = () => {
    updateGallery(galleryData);
    toast({
      title: "Gallery updated",
      description: "The gallery has been successfully updated",
    });
  };

  const handleImageChange = (index: number, field: keyof (typeof galleryData.images)[0], value: string) => {
    const newImages = [...galleryData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setGalleryData({ ...galleryData, images: newImages });
  };

  const addImage = () => {
    const newImages = [
      ...galleryData.images,
      {
        src: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800",
        alt: "New gallery image",
        caption: "Add a caption for this image"
      }
    ];
    setGalleryData({ ...galleryData, images: newImages });
  };

  const removeImage = (index: number) => {
    const newImages = [...galleryData.images];
    newImages.splice(index, 1);
    setGalleryData({ ...galleryData, images: newImages });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gallery Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Gallery Title</label>
          <Input 
            value={galleryData.title} 
            onChange={(e) => setGalleryData({...galleryData, title: e.target.value})}
            className="mt-1"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Gallery Images</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleryData.images.map((image, index) => (
              <Card key={index} className="border border-border">
                <CardContent className="pt-4 pb-2">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Image URL</label>
                      <Input 
                        value={image.src} 
                        onChange={(e) => handleImageChange(index, 'src', e.target.value)}
                        className="mt-1"
                      />
                      {image.src && (
                        <div className="mt-2">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="h-32 w-full object-cover rounded-md" 
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium">Alt Text</label>
                      <Input 
                        value={image.alt} 
                        onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Caption</label>
                      <Input 
                        value={image.caption} 
                        onChange={(e) => handleImageChange(index, 'caption', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => removeImage(index)}
                        className="mt-1"
                      >
                        <Trash className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={addImage}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" /> Add new image
            </Button>
            
            <Button 
              onClick={handleSave}
              className="mt-2 bg-bright-orange hover:bg-orange-600"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryEditor;
