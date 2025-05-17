
import { Instagram, Mail, Globe, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-dark-purple text-white pt-12 pb-6">
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
              <li>Open Now</li>
              <li>Price Range: ££</li>
              <li>Dine in · Outdoor seating · In-store collection</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic text-gray-300 space-y-2">
              <p>279 Shields Road</p>
              <p>Newcastle upon Tyne, NE6 1DQ</p>
              <p>United Kingdom</p>
              <p>0191 265 7458</p>
              <p>chuchosbyker@gmail.com</p>
            </address>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Chucho's Tacos. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/chuchostacos" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://www.instagram.com/chuchostacos/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="mailto:chuchosbyker@gmail.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
            <a href="https://qrco.de/bdLOoI" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
