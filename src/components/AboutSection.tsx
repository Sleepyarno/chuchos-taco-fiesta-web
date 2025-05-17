
import { Card, CardContent } from "@/components/ui/card";
import { CalendarClock, Users, UtensilsCrossed } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white rounded-lg shadow-sm my-16 p-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">About Chucho's Tacos</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551504734-5ee1c4a3479b?q=80&w=800" 
              alt="Chucho's Tacos Story" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-vivid-purple">Our Story</h3>
            <p className="text-gray-700 mb-6">
              Founded in 2010, Chucho's Tacos brings the authentic flavors of Mexico to your table. 
              Our founder, Chucho, grew up in Jalisco, Mexico, where he learned traditional 
              recipes from his grandmother. Every dish we serve honors those time-tested 
              family recipes while adding our own modern twists.
            </p>
            <p className="text-gray-700 mb-6">
              What started as a small food truck has grown into one of the most beloved 
              Mexican restaurants in the area. We pride ourselves on using only the freshest 
              ingredients, making our tortillas by hand daily, and creating an atmosphere that 
              makes everyone feel like family.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <CalendarClock className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Est. 2010</h4>
                  <p className="text-sm text-gray-600">Serving since</p>
                </CardContent>
              </Card>
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <UtensilsCrossed className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Family Recipes</h4>
                  <p className="text-sm text-gray-600">Traditional methods</p>
                </CardContent>
              </Card>
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Users className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Community</h4>
                  <p className="text-sm text-gray-600">Locally loved</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
