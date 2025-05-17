
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
              src="/lovable-uploads/8d683bdc-68c1-4543-b273-abab4713875d.png"
              alt="Chef at Chucho's Tacos" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-vivid-purple">Our Story</h3>
            <p className="text-gray-700 mb-6">
              We are passionate about fresh, authentic Mexican street food. Our signature tacos - with homemade corn flour tortillas - 
              come with a range of delicious toppings, including our homemade chili salsas.
            </p>
            <p className="text-gray-700 mb-6">
              We also serve popular snacks like nachos, molletes and quesadillas, as well as desserts. Mexican beers and Mexican inspired cocktails 
              complement our food perfectly. Our restaurant is at the top of Shields Road in Newcastle-upon-Tyne, with takeaway available and 
              catering for outside events (markets, festivals, parties, weddings) across the North East.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <CalendarClock className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Highly Rated</h4>
                  <p className="text-sm text-gray-600">94% recommend</p>
                </CardContent>
              </Card>
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <UtensilsCrossed className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Authentic Taste</h4>
                  <p className="text-sm text-gray-600">Traditional recipes</p>
                </CardContent>
              </Card>
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Users className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Great Value</h4>
                  <p className="text-sm text-gray-600">Price range · ££</p>
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
