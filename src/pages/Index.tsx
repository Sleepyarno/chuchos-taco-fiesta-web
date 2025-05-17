
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import GallerySection from "@/components/GallerySection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { isAuthenticated } from "@/utils/auth";

const Index = () => {
  return (
    <div className="min-h-screen bg-soft-gray">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4">
        <MenuSection />
        <AboutSection />
        <GallerySection />
        <ContactSection />
      </div>
      <Footer />
      {isAuthenticated() && (
        <Link to="/admin">
          <Button className="fixed bottom-4 right-4 bg-bright-orange hover:bg-orange-600">
            Admin Panel
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Index;
