import { Instagram, Mail, Globe, Facebook } from "lucide-react";
import { getHoursData, getContactData } from "@/utils/dataManager";

const Footer = () => {
  const hoursData = getHoursData();
  const contactData = getContactData();

  return (
    <footer className="bg-dark-gray text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Chucho's Tacos</h3>
            <p className="text-gray-300">
              Serving authentic Mexican street food in Newcastle upon Tyne. Our signature tacos come with homemade corn flour tortillas and 
              a range of delicious toppings, including our homemade chili salsas.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <ul className="space-y-2 text-gray-300">
              <li>{hoursData.status}</li>
              <li>Price Range: {hoursData.priceRange}</li>
              <li>{hoursData.dineOptions.join(' · ')}</li>
              {hoursData.hours.map((dayHour, index) => (
                <li key={index} className={dayHour.hours === "Closed" ? "opacity-70" : ""}>
                  {dayHour.day}: {dayHour.hours}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>{contactData.address.street}</p>
              <p>{contactData.address.city}, {contactData.address.postcode}</p>
              <p>{contactData.address.country}</p>
              <p>{contactData.phone}</p>
              <p>{contactData.email}</p>
            </address>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Chucho's Tacos. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href={contactData.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href={contactData.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={`mailto:${contactData.email}`} className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
            <a href={contactData.website} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        {/* Admin Login Link */}
        <div className="mt-6 text-center">
          <a href="/admin" className="text-xs text-gray-400 hover:text-bright-orange transition-colors">
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
