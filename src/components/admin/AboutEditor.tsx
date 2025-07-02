
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAboutData, updateAbout } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import { uploadImageLocally, cleanupUploadedImage } from '@/utils/fileUploader';

const AboutEditor = () => {
  const [aboutData, setAboutData] = useState(getAboutData());
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateAbout(aboutData);
    toast({
      title: "About content updated",
      description: "The about section has been successfully updated",
    });
  };

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...aboutData.paragraphs];
    newParagraphs[index] = value;
    setAboutData({ ...aboutData, paragraphs: newParagraphs });
  };

  const updateFeature = (index: number, field: keyof (typeof aboutData.features)[0], value: string) => {
    const newFeatures = [...aboutData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setAboutData({ ...aboutData, features: newFeatures });
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
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
      if (aboutData.image.startsWith('data:') || aboutData.image.startsWith('blob:')) {
        cleanupUploadedImage(aboutData.image);
      }
      
      // Update the about data with the new image
      setAboutData({ ...aboutData, image: base64Data });
      
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
        <CardTitle>About Section Editor</CardTitle>
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
        
        <div>
          <h3 className="text-lg font-medium mb-2">Main Content</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Image URL</label>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleFileUpload}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" /> Upload Image
                </Button>
              </div>
              <Input 
                value={aboutData.image.startsWith('data:') ? 'Uploaded image (base64)' : aboutData.image} 
                onChange={(e) => setAboutData({...aboutData, image: e.target.value})}
                className="mt-1"
                placeholder="Image URL or click 'Upload Image' to upload (max 10MB)"
                disabled={aboutData.image.startsWith('data:')}
              />
              {aboutData.image && (
                <div className="mt-2">
                  <img 
                    src={aboutData.image} 
                    alt="About section preview" 
                    className="h-32 w-full object-cover rounded-md" 
                  />
                </div>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Section Title</label>
              <Input 
                value={aboutData.title} 
                onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Paragraphs</h3>
          <div className="space-y-4">
            {aboutData.paragraphs.map((paragraph, index) => (
              <div key={index}>
                <label className="text-sm font-medium">Paragraph {index + 1}</label>
                <Textarea 
                  value={paragraph}
                  onChange={(e) => updateParagraph(index, e.target.value)}
                  className="mt-1"
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Features</h3>
          <div className="space-y-4">
            {aboutData.features.map((feature, index) => (
              <div key={index} className="p-4 border border-border rounded-md">
                <h4 className="font-medium mb-2">Feature {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      value={feature.title}
                      onChange={(e) => updateFeature(index, 'title', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Input 
                      value={feature.description}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="mt-4 bg-bright-orange hover:bg-orange-600"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutEditor;
