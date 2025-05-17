
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { logout } from '@/utils/auth';
import MenuEditor from './MenuEditor';
import ContactEditor from './ContactEditor';
import HoursEditor from './HoursEditor';
import HeroEditor from './HeroEditor';
import AboutEditor from './AboutEditor';
import GalleryEditor from './GalleryEditor';
import { resetAllData } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";

type AdminPanelProps = {
  onLogout: () => void;
};

const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("menu");
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all data to default? This action cannot be undone.")) {
      resetAllData();
      toast({
        title: "Data reset",
        description: "All content has been reset to default values",
      });
      // Reload the page to show the defaults
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bright-orange/10 to-vivid-purple/10 p-4 md:p-8">
      <Card className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Chucho's Tacos Admin Panel</h1>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              onClick={handleResetData}
              className="hidden sm:inline-flex"
            >
              Reset to Default
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline"
            >
              Logout
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full flex flex-wrap">
            <TabsTrigger value="menu" className="flex-grow">Menu</TabsTrigger>
            <TabsTrigger value="hours" className="flex-grow">Hours</TabsTrigger>
            <TabsTrigger value="contact" className="flex-grow">Contact</TabsTrigger>
            <TabsTrigger value="hero" className="flex-grow">Hero</TabsTrigger>
            <TabsTrigger value="about" className="flex-grow">About</TabsTrigger>
            <TabsTrigger value="gallery" className="flex-grow">Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <MenuEditor />
          </TabsContent>
          
          <TabsContent value="hours">
            <HoursEditor />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactEditor />
          </TabsContent>
          
          <TabsContent value="hero">
            <HeroEditor />
          </TabsContent>
          
          <TabsContent value="about">
            <AboutEditor />
          </TabsContent>
          
          <TabsContent value="gallery">
            <GalleryEditor />
          </TabsContent>
        </Tabs>

        <div className="sm:hidden mt-6">
          <Button 
            variant="outline" 
            onClick={handleResetData}
            className="w-full"
          >
            Reset to Default
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
