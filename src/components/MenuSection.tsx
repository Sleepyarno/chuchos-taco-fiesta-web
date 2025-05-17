
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("tacos");
  
  const categories = [
    { id: "tacos", name: "Tacos" },
    { id: "burritos", name: "Burritos" },
    { id: "sides", name: "Sides" },
    { id: "drinks", name: "Drinks" },
  ];
  
  const menuItems = {
    tacos: [
      { id: 1, name: "Carne Asada Taco", price: 3.99, description: "Grilled steak with onions and cilantro" },
      { id: 2, name: "Al Pastor Taco", price: 3.99, description: "Marinated pork with pineapple, onions, and cilantro" },
      { id: 3, name: "Pollo Taco", price: 3.50, description: "Grilled chicken with onions and cilantro" },
      { id: 4, name: "Carnitas Taco", price: 3.99, description: "Slow-cooked pork with onions and cilantro" },
      { id: 5, name: "Pescado Taco", price: 4.50, description: "Grilled fish with cabbage slaw and lime crema" },
      { id: 6, name: "Vegetariano Taco", price: 3.50, description: "Grilled peppers, onions, and corn with guacamole" }
    ],
    burritos: [
      { id: 1, name: "Carne Asada Burrito", price: 9.99, description: "Grilled steak with rice, beans, cheese, and salsa" },
      { id: 2, name: "Pollo Burrito", price: 8.99, description: "Grilled chicken with rice, beans, cheese, and salsa" },
      { id: 3, name: "Bean & Cheese Burrito", price: 7.99, description: "Refried beans and cheese" }
    ],
    sides: [
      { id: 1, name: "Chips & Salsa", price: 3.99, description: "Freshly made tortilla chips with house salsa" },
      { id: 2, name: "Guacamole", price: 4.99, description: "Fresh avocados with onions, cilantro, and lime" },
      { id: 3, name: "Rice & Beans", price: 3.50, description: "Mexican rice and refried beans" }
    ],
    drinks: [
      { id: 1, name: "Horchata", price: 2.99, description: "Sweet rice milk with cinnamon" },
      { id: 2, name: "Jamaica", price: 2.99, description: "Hibiscus flower tea" },
      { id: 3, name: "Mexican Coke", price: 2.50, description: "Made with real cane sugar" },
      { id: 4, name: "Jarritos", price: 2.50, description: "Assorted flavors" }
    ]
  };

  return (
    <section id="menu" className="py-16">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Menu</h2>
      
      {/* Category tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-2">
        {categories.map((category) => (
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
        {menuItems[activeCategory as keyof typeof menuItems].map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{item.name}</h3>
                <span className="text-lg font-bold text-bright-orange">${item.price}</span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <Button variant="outline" className="w-full border-bright-orange text-bright-orange hover:bg-bright-orange hover:text-white">
                Add to Order
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
