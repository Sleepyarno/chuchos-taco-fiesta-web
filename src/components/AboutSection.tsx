
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
              src="https://scontent.cdninstagram.com/v/t51.2885-15/164318257_1594932387381524_1579917277862234088_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyIn0&_nc_ht=scontent.cdninstagram.com&_nc_cat=101&_nc_ohc=GoHGLG-e1W8AX-s2ubL&edm=APs17CUBAAAA&ccb=7-5&ig_cache_key=MjU0MTM4MDQ0MDE3MDc3Mzk3Mw%3D%3D.2-ccb7-5&oh=00_AfCR5m1OrxTZ3g8CzKT6NwUhtY0eMI2pFLadQapkIj7X_w&oe=66AD37E7&_nc_sid=10d13b"
              alt="Chucho's Tacos" 
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4 text-vivid-purple">Our Story</h3>
            <p className="text-gray-700 mb-6">
              Chucho's Tacos brings authentic Mexican street food flavors to Arlington, TX. 
              Established with a passion for traditional recipes and fresh ingredients, 
              we've become a local favorite for genuine Mexican cuisine.
            </p>
            <p className="text-gray-700 mb-6">
              From our handmade tortillas to our slow-cooked meats and house-made salsas, 
              we pride ourselves on authenticity and quality in every dish. Our family-owned 
              restaurant welcomes you to experience the true taste of Mexico in a friendly, 
              casual atmosphere.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <CalendarClock className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Est. 2015</h4>
                  <p className="text-sm text-gray-600">Serving since</p>
                </CardContent>
              </Card>
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <UtensilsCrossed className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Authentic Taste</h4>
                  <p className="text-sm text-gray-600">Traditional methods</p>
                </CardContent>
              </Card>
              <Card className="bg-soft-gray">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <Users className="h-8 w-8 text-bright-orange mb-2" />
                  <h4 className="font-bold">Family Owned</h4>
                  <p className="text-sm text-gray-600">Local favorite</p>
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
