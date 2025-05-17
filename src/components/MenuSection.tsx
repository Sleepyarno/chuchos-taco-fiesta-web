
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("tacos");
  
  const categories = [
    { id: "tacos", name: "Tacos" },
    { id: "quesadillas", name: "Quesadillas" },
    { id: "tortas", name: "Tortas" },
    { id: "platillos", name: "Platillos" },
    { id: "sides", name: "Sides" },
    { id: "drinks", name: "Drinks" },
  ];
  
  const menuItems = {
    tacos: [
      { id: 1, name: "Carne Asada Taco", price: 3.50, description: "Grilled marinated steak with cilantro and onions" },
      { id: 2, name: "Al Pastor Taco", price: 3.50, description: "Marinated pork with pineapple, onions, and cilantro" },
      { id: 3, name: "Carnitas Taco", price: 3.50, description: "Slow-cooked pork with onions and cilantro" },
      { id: 4, name: "Barbacoa Taco", price: 3.50, description: "Slow-cooked beef with onions and cilantro" },
      { id: 5, name: "Chicken Taco", price: 3.50, description: "Grilled marinated chicken with cilantro and onions" },
      { id: 6, name: "Campechano Taco", price: 3.50, description: "Mix of steak and Mexican sausage" }
    ],
    quesadillas: [
      { id: 1, name: "Quesadilla Asada", price: 9.99, description: "Flour tortilla with cheese and steak" },
      { id: 2, name: "Quesadilla Al Pastor", price: 9.99, description: "Flour tortilla with cheese and marinated pork" },
      { id: 3, name: "Quesadilla Pollo", price: 9.99, description: "Flour tortilla with cheese and chicken" },
      { id: 4, name: "Quesadilla Carnitas", price: 9.99, description: "Flour tortilla with cheese and slow-cooked pork" }
    ],
    tortas: [
      { id: 1, name: "Torta Asada", price: 10.99, description: "Mexican sandwich with steak, beans, cheese, and avocado" },
      { id: 2, name: "Torta Al Pastor", price: 10.99, description: "Mexican sandwich with marinated pork, beans, cheese, and avocado" },
      { id: 3, name: "Torta Pollo", price: 10.99, description: "Mexican sandwich with chicken, beans, cheese, and avocado" },
      { id: 4, name: "Torta Milanesa", price: 10.99, description: "Mexican sandwich with breaded steak, beans, cheese, and avocado" }
    ],
    platillos: [
      { id: 1, name: "Carne Asada Plate", price: 13.99, description: "Grilled steak with rice, beans, and tortillas" },
      { id: 2, name: "Chicken Plate", price: 12.99, description: "Grilled chicken with rice, beans, and tortillas" },
      { id: 3, name: "Combo Plate", price: 14.99, description: "Mix of meats with rice, beans, and tortillas" }
    ],
    sides: [
      { id: 1, name: "Chips & Salsa", price: 3.50, description: "House-made tortilla chips with fresh salsa" },
      { id: 2, name: "Guacamole", price: 4.50, description: "Fresh avocado dip with chips" },
      { id: 3, name: "Elote", price: 4.50, description: "Mexican street corn with mayo, cheese, and chile" },
      { id: 4, name: "Rice & Beans", price: 3.50, description: "Mexican rice and refried beans" }
    ],
    drinks: [
      { id: 1, name: "Horchata", price: 2.99, description: "Sweet rice milk with cinnamon" },
      { id: 2, name: "Jamaica", price: 2.99, description: "Hibiscus flower tea" },
      { id: 3, name: "Mexican Coke", price: 2.99, description: "Made with real cane sugar" },
      { id: 4, name: "Jarritos", price: 2.99, description: "Assorted flavors" },
      { id: 5, name: "Topo Chico", price: 2.50, description: "Sparkling mineral water" }
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
