
import { MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Visit Us</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.6245112282373!2d-97.06972488477802!3d32.7364202804119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e7d72a1f7a349%3A0xc0db8b89e8e35962!2sChucho&#39;s%20Tacos!5e0!3m2!1sen!2sus!4v1650473761659!5m2!1sen!2sus" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            title="Chucho's Tacos Location"
          ></iframe>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold mb-6 text-vivid-purple">Contact Information</h3>
          
          <div className="space-y-6">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 text-bright-orange mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-lg">Address</h4>
                <p className="text-gray-700">
                  1215 E Pioneer Pkwy<br />
                  Arlington, TX 76010<br />
                  United States
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-bright-orange mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-lg">Phone</h4>
                <p className="text-gray-700">(817) 801-4962</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Clock className="h-6 w-6 text-bright-orange mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-lg">Hours</h4>
                <p className="text-gray-700">
                  Monday - Thursday: 7am - 10pm<br />
                  Friday: 7am - 12am<br />
                  Saturday: 8am - 12am<br />
                  Sunday: 8am - 10pm
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/chuchostacos" target="_blank" rel="noopener noreferrer" className="text-vivid-purple hover:text-bright-orange transition-colors">
                  <Facebook className="h-8 w-8" />
                </a>
                <a href="https://www.instagram.com/chuchostacos/" target="_blank" rel="noopener noreferrer" className="text-vivid-purple hover:text-bright-orange transition-colors">
                  <Instagram className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
          
          <Button className="w-full mt-8 bg-bright-orange hover:bg-orange-600">
            Order Online Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
