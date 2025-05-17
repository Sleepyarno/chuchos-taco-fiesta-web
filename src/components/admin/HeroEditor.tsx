
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHeroData, updateHero } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";
import { Trash, Plus } from "lucide-react";

const HeroEditor = () => {
  const [heroData, setHeroData] = useState(getHeroData());
  const { toast } = useToast();

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hero Carousel Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {heroData.slides.map((slide, index) => (
          <Card key={slide.id} className="border border-border">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Slide {index + 1}</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-sm font-medium">Image URL</label>
                    <Input 
                      value={slide.image} 
                      onChange={(e) => handleSlideChange(index, 'image', e.target.value)}
                      className="mt-1"
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
