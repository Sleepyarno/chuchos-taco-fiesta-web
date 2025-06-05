
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mexican-gradient shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Logo size="md" />
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex space-x-4">
            <a href="#menu" className="text-white hover:text-yellow-200 px-3 py-2 transition duration-300 font-medium shadow-text">Menu</a>
            <a href="#about" className="text-white hover:text-yellow-200 px-3 py-2 transition duration-300 font-medium shadow-text">About Us</a>
            <a href="#contact" className="text-white hover:text-yellow-200 px-3 py-2 transition duration-300 font-medium shadow-text">Contact</a>
            <Button variant="outline" className="bg-white text-mexican-red border-none hover:bg-yellow-100 font-medium shadow-md">Order Now</Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a 
                href="#menu" 
                className="block text-white hover:text-yellow-200 px-3 py-2 transition duration-300 font-medium shadow-text"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </a>
              <a 
                href="#about" 
                className="block text-white hover:text-yellow-200 px-3 py-2 transition duration-300 font-medium shadow-text"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a 
                href="#contact" 
                className="block text-white hover:text-yellow-200 px-3 py-2 transition duration-300 font-medium shadow-text"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button 
                variant="outline" 
                className="bg-white text-mexican-red border-none hover:bg-yellow-100 w-full font-medium shadow-md"
              >
                Order Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
