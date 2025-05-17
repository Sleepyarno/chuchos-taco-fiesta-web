
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMenuData } from "@/utils/dataManager";

const MenuSection = () => {
  const menuData = getMenuData();
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0].id);

  return (
    <section id="menu" className="py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Menu</h2>
      
      {/* Category tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {menuData.categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={activeCategory === category.id ? "bg-bright-orange border-none" : ""}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      {/* Menu items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuData.menuItems[activeCategory as keyof typeof menuData.menuItems].map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="text-lg font-bold text-bright-orange">£{item.price.toFixed(2)}</span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {activeCategory === "tacos" && (
        <div className="mt-8 text-center">
          <p className="text-xl font-bold text-bright-orange mb-2">Special Offer</p>
          <p className="text-lg">3 tacos for £9 or £3.50 each</p>
        </div>
      )}
    </section>
  );
};

export default MenuSection;
