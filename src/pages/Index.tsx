
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import OrderSection from "@/components/OrderSection";
import BookingSection from "@/components/BookingSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";
import { LockIcon } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-soft-gray">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4">
        <MenuSection />
        <OrderSection />
        <BookingSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </div>
      <Footer />
      
      {/* Always show Admin link, but style it differently based on authentication */}
      <Link to="/admin">
        <Button 
          className={`fixed bottom-4 right-4 z-50 ${
            isAuthenticated() 
              ? "bg-bright-orange hover:bg-orange-600" 
              : "bg-gray-600 hover:bg-gray-700"
          }`}
        >
          <LockIcon className="h-4 w-4 mr-2" />
          {isAuthenticated() ? "Admin Panel" : "Admin Login"}
        </Button>
      </Link>
    </div>
  );
};

export default Index;
