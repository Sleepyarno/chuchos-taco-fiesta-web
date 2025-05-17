
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactData, updateContact } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";

const ContactEditor = () => {
  const [contactData, setContactData] = useState(getContactData());
  const { toast } = useToast();

  const handleSave = () => {
    updateContact(contactData);
    toast({
      title: "Contact information updated",
      description: "The contact details have been successfully updated",
    });
  };

  const handleAddressChange = (field: keyof typeof contactData.address, value: string) => {
    setContactData({
      ...contactData,
      address: {
        ...contactData.address,
        [field]: value
      }
    });
  };

  const handleSocialChange = (field: keyof typeof contactData.social, value: string) => {
    setContactData({
      ...contactData,
      social: {
        ...contactData.social,
        [field]: value
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contact Information Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Address</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Street</label>
              <Input 
                value={contactData.address.street} 
                onChange={(e) => handleAddressChange('street', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">City</label>
              <Input 
                value={contactData.address.city} 
                onChange={(e) => handleAddressChange('city', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Postcode</label>
              <Input 
                value={contactData.address.postcode} 
                onChange={(e) => handleAddressChange('postcode', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Country</label>
              <Input 
                value={contactData.address.country} 
                onChange={(e) => handleAddressChange('country', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input 
                value={contactData.phone} 
                onChange={(e) => setContactData({...contactData, phone: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input 
                value={contactData.email} 
                onChange={(e) => setContactData({...contactData, email: e.target.value})}
                className="mt-1"
                type="email"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Website URL</label>
              <Input 
                value={contactData.website} 
                onChange={(e) => setContactData({...contactData, website: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Booking URL</label>
              <Input 
                value={contactData.bookingUrl} 
                onChange={(e) => setContactData({...contactData, bookingUrl: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Social Media</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Facebook URL</label>
              <Input 
                value={contactData.social.facebook} 
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Instagram URL</label>
              <Input 
                value={contactData.social.instagram} 
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            className="mt-4 bg-bright-orange hover:bg-orange-600"
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactEditor;
