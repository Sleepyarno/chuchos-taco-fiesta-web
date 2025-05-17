
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getHoursData, updateHours } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";

const HoursEditor = () => {
  const [hoursData, setHoursData] = useState(getHoursData());
  const { toast } = useToast();

  const handleSave = () => {
    updateHours(hoursData);
    toast({
      title: "Hours updated",
      description: "The opening hours have been successfully updated",
    });
  };

  const handleHourChange = (index: number, value: string) => {
    const newHours = [...hoursData.hours];
    newHours[index] = { ...newHours[index], hours: value };
    setHoursData({ ...hoursData, hours: newHours });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Opening Hours Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Status & Price Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Current Status</label>
              <Input 
                value={hoursData.status} 
                onChange={(e) => setHoursData({...hoursData, status: e.target.value})}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Price Range</label>
              <Input 
                value={hoursData.priceRange} 
                onChange={(e) => setHoursData({...hoursData, priceRange: e.target.value})}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Opening Hours</h3>
          <div className="space-y-2">
            {hoursData.hours.map((dayHour, index) => (
              <div key={dayHour.day} className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                  <p className="py-2 font-medium">{dayHour.day}</p>
                </div>
                <div className="col-span-8">
                  <Input 
                    value={dayHour.hours} 
                    onChange={(e) => handleHourChange(index, e.target.value)}
                    placeholder="e.g. 12:00 - 20:00 or Closed"
                  />
                </div>
              </div>
            ))}
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

export default HoursEditor;
