
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getGalleryData, updateGallery } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";
import { Trash, Plus, Upload, Eye } from "lucide-react";
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

  const handlePreview = () => {
    // Save current changes first
    updateGallery(galleryData);
    // Open main site in new tab
    window.open('/', '_blank');
    toast({
      title: "Preview opened",
      description: "Gallery changes have been saved and preview opened in new tab",
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
    
    // Clean up uploaded image data
    if (imageToRemove.src.startsWith('data:') || imageToRemove.src.startsWith('blob:')) {
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
    
    // Updated file size limit to 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB.",
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
      const base64Data = await uploadImageLocally(file);
      
      // Clean up previous image if it was uploaded
      const currentImage = galleryData.images[imageIndex];
      if (currentImage.src.startsWith('data:') || currentImage.src.startsWith('blob:')) {
        cleanupUploadedImage(currentImage.src);
      }
      
      // Replace the current image with the new one
      const newImages = [...galleryData.images];
      newImages[imageIndex] = {
        ...newImages[imageIndex],
        src: base64Data,
        alt: file.name.replace(/\.[^/.]+$/, "")
      };
      
      const updatedGalleryData = { ...galleryData, images: newImages };
      setGalleryData(updatedGalleryData);
      
      // Auto-save the changes
      updateGallery(updatedGalleryData);
      
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast({
        title: "Image Replaced Successfully",
        description: `The image "${file.name}" (${fileSizeMB}MB) has been processed and saved automatically.`,
        duration: 5000,
      });
    } catch (error) {
      console.error("Error uploading image locally:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Could not process the image. Please try again with a smaller file.",
        variant: "destructive",
      });
    }
    
    // Clear the input value so the same file can be selected again
    e.target.value = '';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Gallery Editor</CardTitle>
          <div className="flex gap-2">
            <Button 
              onClick={handlePreview}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" /> Preview Customer View
            </Button>
            <Button 
              onClick={handleSave}
              className="bg-bright-orange hover:bg-orange-600"
            >
              Save Changes
            </Button>
          </div>
        </div>
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
                        value={image.src.startsWith('data:') ? 'Uploaded image (base64)' : image.src} 
                        onChange={(e) => handleImageChange(index, 'src', e.target.value)}
                        className="mt-1"
                        placeholder="Image URL or click 'Replace Image' to upload (max 10MB)"
                        disabled={image.src.startsWith('data:')}
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
          
          <div className="flex justify-start">
            <Button 
              variant="outline" 
              onClick={addImage}
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-1" /> Add new image
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GalleryEditor;
