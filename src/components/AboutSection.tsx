
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, Users, UtensilsCrossed } from "lucide-react";
import { getAboutData } from "@/utils/dataManager";

const AboutSection = () => {
  const aboutData = getAboutData();

  // Map icon string names to components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'CalendarClock': return <CalendarClock className="h-8 w-8 text-bright-orange mb-2" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="h-8 w-8 text-bright-orange mb-2" />;
      case 'Users': return <Users className="h-8 w-8 text-bright-orange mb-2" />;
      default: return <CalendarClock className="h-8 w-8 text-bright-orange mb-2" />;
    }
  };

  return (
    <section id="about" className="py-16 bg-white rounded-lg shadow-sm my-16 p-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">About Chucho's Tacos</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={aboutData.image}
              alt="Chef at Chucho's Tacos" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-vivid-purple">{aboutData.title}</h3>
            
            {aboutData.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-6">
                {paragraph}
              </p>
            ))}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {aboutData.features.map((feature, index) => (
                <Card key={index} className="bg-soft-gray">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    {getIconComponent(feature.icon)}
                    <h4 className="font-bold">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
