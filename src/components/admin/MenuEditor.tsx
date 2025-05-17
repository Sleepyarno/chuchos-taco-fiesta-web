
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMenuData, updateMenu } from '@/utils/dataManager';
import { useToast } from "@/components/ui/use-toast";
import { Trash, Plus } from "lucide-react";

// Define the MenuItem type
interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
}

// Define the MenuData type with an index signature
interface MenuData {
  categories: { id: string; name: string }[];
  menuItems: {
    [key: string]: MenuItem[]; // This adds the string index signature
  };
}

const MenuEditor = () => {
  const [menuData, setMenuData] = useState<MenuData>(getMenuData() as MenuData);
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);
  const { toast } = useToast();

  const handleSave = () => {
    updateMenu(menuData);
    toast({
      title: "Menu updated",
      description: "The menu has been successfully updated",
    });
  };

  const handleItemChange = (categoryId: string, itemId: number, field: keyof MenuItem, value: any) => {
    const newMenuData = {...menuData};
    const itemIndex = newMenuData.menuItems[categoryId].findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      newMenuData.menuItems[categoryId][itemIndex][field] = value;
      setMenuData(newMenuData);
    }
  };

  const addNewItem = (categoryId: string) => {
    const newMenuData = {...menuData};
    const items = newMenuData.menuItems[categoryId];
    const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
    
    newMenuData.menuItems[categoryId].push({
      id: newId,
      name: "New Item",
      price: 0.00,
      description: "Description here"
    });
    
    setMenuData(newMenuData);
  };

  const removeItem = (categoryId: string, itemId: number) => {
    const newMenuData = {...menuData};
    const items = newMenuData.menuItems[categoryId];
    const itemIndex = items.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
      newMenuData.menuItems[categoryId].splice(itemIndex, 1);
      setMenuData(newMenuData);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Menu Editor</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4 flex flex-wrap">
            {menuData.categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {menuData.categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="space-y-4">
              {menuData.menuItems[category.id].map(item => (
                <Card key={item.id} className="border border-border">
                  <CardContent className="pt-4">
                    <div className="grid grid-cols-12 gap-4">
                      <div className="col-span-12 sm:col-span-6">
                        <label className="text-sm font-medium">Name</label>
                        <Input 
                          value={item.name} 
                          onChange={(e) => handleItemChange(category.id, item.id, 'name', e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label className="text-sm font-medium">Price (£)</label>
                        <Input 
                          type="number"
                          step="0.01"
                          value={item.price} 
                          onChange={(e) => handleItemChange(category.id, item.id, 'price', parseFloat(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div className="col-span-12">
                        <label className="text-sm font-medium">Description</label>
                        <Textarea 
                          value={item.description} 
                          onChange={(e) => handleItemChange(category.id, item.id, 'description', e.target.value)}
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                      <div className="col-span-12 flex justify-end">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => removeItem(category.id, item.id)}
                          className="mt-2"
                        >
                          <Trash className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => addNewItem(category.id)}
                  className="mt-2"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add new item
                </Button>
                
                <Button 
                  onClick={handleSave}
                  className="mt-2 bg-bright-orange hover:bg-orange-600"
                >
                  Save Changes
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MenuEditor;
