
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAboutData, updateAbout } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";

const AboutEditor = () => {
  const [aboutData, setAboutData] = useState(getAboutData());
  const { toast } = useToast();

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>About Section Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Main Content</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input 
                value={aboutData.image} 
                onChange={(e) => setAboutData({...aboutData, image: e.target.value})}
                className="mt-1"
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
