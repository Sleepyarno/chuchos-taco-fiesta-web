
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { Home, Eye } from "lucide-react";

type AdminPanelProps = {
  onLogout: () => void;
};

const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [activeTab, setActiveTab] = useState("menu");
  const [editorKey, setEditorKey] = useState(0);
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    onLogout();
  };

  const handleResetData = () => {
    resetAllData();
    toast({
      title: "Data reset",
      description: "All content has been reset to default values",
    });
    setEditorKey(prevKey => prevKey + 1);
  };

  const handleViewWebsite = () => {
    window.open('/', '_blank');
    toast({
      title: "Website opened",
      description: "The main website has opened in a new tab",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bright-orange/10 to-vivid-purple/10 p-4 md:p-8">
      <Card className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold">Chucho's Tacos Admin Panel</h1>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={handleViewWebsite}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">View Website</span>
            </Button>
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="hidden sm:inline-flex"
                >
                  Reset to Default
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will reset all content data to its default values.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetData}>Confirm Reset</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
            <MenuEditor key={`menu-${editorKey}`} />
          </TabsContent>
          
          <TabsContent value="hours">
            <HoursEditor key={`hours-${editorKey}`} />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactEditor key={`contact-${editorKey}`} />
          </TabsContent>
          
          <TabsContent value="hero">
            <HeroEditor key={`hero-${editorKey}`} />
          </TabsContent>
          
          <TabsContent value="about">
            <AboutEditor key={`about-${editorKey}`} />
          </TabsContent>
          
          <TabsContent value="gallery">
            <GalleryEditor key={`gallery-${editorKey}`} />
          </TabsContent>
        </Tabs>

        <div className="sm:hidden mt-6 space-y-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
              >
                Reset to Default
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will reset all content data to its default values.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleResetData}>Confirm Reset</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
