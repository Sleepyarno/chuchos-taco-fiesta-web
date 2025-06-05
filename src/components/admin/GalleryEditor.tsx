
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGalleryData, updateGallery } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";
import { Trash, Plus, Upload } from "lucide-react";
import { uploadImageLocally, cleanupUploadedImage } from '@/utils/fileUploader';

const GalleryEditor = () => {
  const [galleryData, setGalleryData] = useState(getGalleryData());
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        src: "/placeholder.svg",
        alt: "New gallery image",
        caption: "Add a caption for this image"
      }
    ];
    setGalleryData({ ...galleryData, images: newImages });
  };

  const removeImage = (index: number) => {
    const imageToRemove = galleryData.images[index];
    
    // Clean up uploaded image data if it's a blob URL
    if (imageToRemove.src.startsWith('blob:')) {
      cleanupUploadedImage(imageToRemove.src);
    }
    
    const newImages = [...galleryData.images];
    newImages.splice(index, 1);
    setGalleryData({ ...galleryData, images: newImages });
  };

  const handleFileUpload = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.imageIndex = index.toString();
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageIndex = fileInputRef.current?.dataset.imageIndex 
      ? parseInt(fileInputRef.current.dataset.imageIndex)
      : -1;
    
    if (imageIndex === -1) return;
    
    // Check file size (limit to 20MB)
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 20MB.",
        variant: "destructive",
      });
      e.target.value = '';
      return;
    }
    
    // Check if it's an image file
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, GIF, etc.).",
        variant: "destructive",
      });
      e.target.value = '';
      return;
    }
    
    try {
      const objectUrl = await uploadImageLocally(file);
      
      // Clean up previous image if it was a blob URL
      const currentImage = galleryData.images[imageIndex];
      if (currentImage.src.startsWith('blob:')) {
        cleanupUploadedImage(currentImage.src);
      }
      
      // Replace the current image with the new one
      handleImageChange(imageIndex, 'src', objectUrl);
      handleImageChange(imageIndex, 'alt', file.name.replace(/\.[^/.]+$/, "")); // Remove extension from alt text
      
      toast({
        title: "Image Replaced Successfully",
        description: `The image has been replaced with "${file.name}". This preview will persist across browser sessions.`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error uploading image locally:", error);
      toast({
        title: "Upload Failed",
        description: "Could not create local image preview. Please try again.",
        variant: "destructive",
      });
    }
    
    // Clear the input value so the same file can be selected again
    e.target.value = '';
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
          
          {/* Hidden file input */}
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleFileChange}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {galleryData.images.map((image, index) => (
              <Card key={index} className="border border-border">
                <CardContent className="pt-4 pb-2">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium">Image</label>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleFileUpload(index)}
                          className="flex items-center gap-2"
                        >
                          <Upload className="h-4 w-4" /> Replace Image
                        </Button>
                      </div>
                      
                      <Input 
                        value={image.src} 
                        onChange={(e) => handleImageChange(index, 'src', e.target.value)}
                        className="mt-1"
                        placeholder="Image URL or click 'Replace Image' to upload"
                      />
                      
                      {image.src && (
                        <div className="mt-2">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="h-32 w-full object-cover rounded-md" 
                            onError={(e) => {
                              console.error('Image failed to load:', image.src);
                              e.currentTarget.src = '/placeholder.svg';
                            }}
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
