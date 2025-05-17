
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection";
import MenuSection from "@/components/MenuSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-soft-gray">
      <Navbar />
      <HeroSection />
      <div className="container mx-auto px-4">
        <MenuSection />
        <AboutSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
