
import { MapPin, Phone, Mail, Instagram, Globe, Facebook } from "lucide-react";
import { getContactData } from "@/utils/dataManager";

const ContactSection = () => {
  const contactData = getContactData();

  return (
    <section id="contact" className="py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Visit Us</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2289.5802559947466!2d-1.5892890234476738!3d54.981248157845535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487e70c7fee7c0d1%3A0x6cb8af89c6afbf9a!2s279%20Shields%20Rd%2C%20Byker%2C%20Newcastle%20upon%20Tyne%20NE6%201DQ%2C%20UK!5e0!3m2!1sen!2sus!4v1684825461170!5m2!1sen!2sus" 
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
                  {contactData.address.street}<br />
                  {contactData.address.city}<br />
                  {contactData.address.postcode}<br />
                  {contactData.address.country}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-bright-orange mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-lg">Phone</h4>
                <p className="text-gray-700">{contactData.phone}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-bright-orange mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-lg">Email</h4>
                <p className="text-gray-700">{contactData.email}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Globe className="h-6 w-6 text-bright-orange mr-4 mt-1" />
              <div>
                <h4 className="font-bold text-lg">Website</h4>
                <p className="text-gray-700">
                  <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="text-vivid-purple hover:underline">
                    Menu & Info
                  </a>
                </p>
                <p className="text-gray-700">
                  <a href="#booking" className="text-vivid-purple hover:underline">
                    Book a Table
                  </a>
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <h4 className="font-bold text-lg mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href={contactData.social.facebook} target="_blank" rel="noopener noreferrer" className="text-vivid-purple hover:text-bright-orange transition-colors">
                  <Facebook className="h-8 w-8" />
                </a>
                <a href={contactData.social.instagram} target="_blank" rel="noopener noreferrer" className="text-vivid-purple hover:text-bright-orange transition-colors">
                  <Instagram className="h-8 w-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
