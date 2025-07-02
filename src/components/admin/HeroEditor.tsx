
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHeroData, updateHero } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";
import { Trash, Plus, Upload } from "lucide-react";
import { uploadImageLocally, cleanupUploadedImage } from '@/utils/fileUploader';

const HeroEditor = () => {
  const [heroData, setHeroData] = useState(getHeroData());
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateHero(heroData);
    toast({
      title: "Hero content updated",
      description: "The hero slides have been successfully updated",
    });
  };

  const handleSlideChange = (index: number, field: keyof (typeof heroData.slides)[0], value: any) => {
    const newSlides = [...heroData.slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setHeroData({ ...heroData, slides: newSlides });
  };

  const addSlide = () => {
    const newId = heroData.slides.length > 0 ? Math.max(...heroData.slides.map(slide => slide.id)) + 1 : 1;
    const newSlides = [
      ...heroData.slides,
      {
        id: newId,
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=1200",
        title: "New Slide Title",
        description: "Add a description for this slide"
      }
    ];
    setHeroData({ ...heroData, slides: newSlides });
  };

  const removeSlide = (id: number) => {
    const newSlides = heroData.slides.filter(slide => slide.id !== id);
    setHeroData({ ...heroData, slides: newSlides });
  };

  const handleFileUpload = (index: number) => {
    if (fileInputRef.current) {
      fileInputRef.current.dataset.slideIndex = index.toString();
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const slideIndex = fileInputRef.current?.dataset.slideIndex 
      ? parseInt(fileInputRef.current.dataset.slideIndex)
      : -1;
    
    if (slideIndex === -1) return;
    
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB.",
        variant: "destructive",
      });
      e.target.value = '';
      return;
    }
    
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
      const currentSlide = heroData.slides[slideIndex];
      if (currentSlide.image.startsWith('data:') || currentSlide.image.startsWith('blob:')) {
        cleanupUploadedImage(currentSlide.image);
      }
      
      // Update the slide with the new image
      handleSlideChange(slideIndex, 'image', base64Data);
      
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast({
        title: "Image uploaded successfully",
        description: `"${file.name}" (${fileSizeMB}MB) has been processed and will be saved when you click Save Changes.`,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Could not process the image. Please try again.",
        variant: "destructive",
      });
    }
    
    e.target.value = '';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hero Carousel Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Hidden file input */}
        <input 
          type="file" 
          ref={fileInputRef}
          className="hidden" 
          accept="image/*"
          onChange={handleFileChange}
        />
        
        {heroData.slides.map((slide, index) => (
          <Card key={slide.id} className="border border-border">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Slide {index + 1}</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium">Image URL</label>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleFileUpload(index)}
                        className="flex items-center gap-2"
                      >
                        <Upload className="h-4 w-4" /> Upload Image
                      </Button>
                    </div>
                    <Input 
                      value={slide.image.startsWith('data:') ? 'Uploaded image (base64)' : slide.image} 
                      onChange={(e) => handleSlideChange(index, 'image', e.target.value)}
                      className="mt-1"
                      placeholder="Image URL or click 'Upload Image' to upload (max 10MB)"
                      disabled={slide.image.startsWith('data:')}
                    />
                    {slide.image && (
                      <div className="mt-2">
                        <img 
                          src={slide.image} 
                          alt={`Preview of slide ${index + 1}`} 
                          className="h-32 w-full object-cover rounded-md" 
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      value={slide.title} 
                      onChange={(e) => handleSlideChange(index, 'title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      value={slide.description} 
                      onChange={(e) => handleSlideChange(index, 'description', e.target.value)}
                      className="mt-1"
                      rows={2}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => removeSlide(slide.id)}
                    className="mt-2"
                    disabled={heroData.slides.length <= 1}
                  >
                    <Trash className="h-4 w-4 mr-1" /> Remove Slide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={addSlide}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add new slide
          </Button>
          
          <Button 
            onClick={handleSave}
            className="mt-2 bg-bright-orange hover:bg-orange-600"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeroEditor;
