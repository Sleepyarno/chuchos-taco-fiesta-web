
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState("tacos");
  
  const categories = [
    { id: "snacks", name: "Snacks" },
    { id: "tacos", name: "Tacos" },
    { id: "special-tacos", name: "Special Tacos" },
    { id: "burritos", name: "Burritos" },
    { id: "sides", name: "Sides & Salsas" },
    { id: "drinks", name: "Drinks" },
  ];
  
  const menuItems = {
    snacks: [
      { id: 1, name: "Nachos", price: 5.00, description: "Homemade corn tortilla chips with black beans, tomato salsa, pico de gallo, feta, guac & coriander" },
      { id: 2, name: "Quesadillas", price: 5.50, description: "Folded flour tortilla filled with mozzarella, topped with tomato salsa, feta & coriander" },
      { id: 3, name: "Chorizo Quesadilla", price: 5.50, description: "Folded flour tortilla filled with chorizo & mozzarella. Topped with tomato salsa, feta & coriander" },
      { id: 4, name: "Chicken Quesadilla", price: 5.50, description: "Folded flour tortilla filled with chicken, peppers, onion & mozzarella. Topped with salsa, feta & coriander" },
      { id: 5, name: "Tostada", price: 6.50, description: "Crispy tortillas with black beans filled with chicken or any topping, served with salsa, lettuce and feta" }
    ],
    tacos: [
      { id: 1, name: "Carnitas", price: 3.50, description: "Slow cooked pork, served with onion, coriander, salsa, guacamole & coriander" },
      { id: 2, name: "Cochinita", price: 3.50, description: "Marinated pulled pork served with pickle red onion" },
      { id: 3, name: "Barbacoa de Res", price: 3.50, description: "Juicy pulled beef topped with onion, guacamole & coriander" },
      { id: 4, name: "Chorizo", price: 3.50, description: "Grilled chorizo with black beans, onions, salsa, coriander & guacamole" },
      { id: 5, name: "Rellena", price: 3.50, description: "Fried black pudding with beans, onion & chilli. Topped with coriander and pickled red onion" },
      { id: 6, name: "Chicken Fajita", price: 3.50, description: "Chicken, peppers & onion with black beans. Topped with salsa, guac & coriander" },
      { id: 7, name: "Haggis", price: 3.50, description: "Haggis with beans, onion & chilli. Topped with coriander and pickled red onion" },
      { id: 8, name: "Pescado", price: 3.50, description: "Battered cod with guacamole & coriander. Topped with red cabbage & mango chilli salsa" },
      { id: 9, name: "Dorados", price: 3.50, description: "Crispy rolled tortillas filled with chicken, topped with salsa, lettuce and feta" },
      { id: 10, name: "Dorados Papa", price: 3.50, description: "Crispy rolled tortillas filled with potato, topped with salsa, lettuce and feta" },
      { id: 11, name: "Nopal", price: 3.50, description: "Cactus, black beans & onion, topped with tomato salsa and crumbled feta" },
      { id: 12, name: "Frijol", price: 3.50, description: "Black beans with fried plantain served with tomato salsa, feta & coriander" },
      { id: 13, name: "Verde", price: 3.50, description: "Courgette & sweetcorn fried with garlic, served with tomato salsa and crumbled feta" },
      { id: 14, name: "Fajita", price: 3.50, description: "Mushrooms, peppers & onion with black beans. Topped with salsa, feta & coriander" }
    ],
    "special-tacos": [
      { id: 1, name: "Carne Asada", price: 4.50, description: "Diced rump steak with peppers and red onion. Served on black beans, topped with chimichurri sauce & coriander" },
      { id: 2, name: "Camaron", price: 4.50, description: "Prawns with chorizo, peppers and red onion. Served on black beans, topped with tomato salsa, coriander & guacamole" },
      { id: 3, name: "Pulpos", price: 4.50, description: "Chargrilled octopus, cooked with peppers and red onion. Served on grilled potato with garlic & coriander" }
    ],
    burritos: [
      { id: 1, name: "Regular Burrito", price: 8.00, description: "Choose any filling from the taco menu! With black beans, lettuce, pico de gallo, & guacamole. Topped with salsa, feta and coriander." },
      { id: 2, name: "Special Burrito", price: 10.00, description: "Choose any filling from the special tacos menu! With black beans, lettuce, pico de gallo, & guacamole. Topped with salsa, feta and coriander." },
      { id: 3, name: "Add mozzarella", price: 1.00, description: "Add extra cheese to any burrito" }
    ],
    sides: [
      { id: 1, name: "Skinny Fries", price: 3.50, description: "Thin cut fries" },
      { id: 2, name: "Pico de gallo", price: 0, description: "Diced tomato, onion and chilli" },
      { id: 3, name: "Green Chili", price: 0, description: "Homemade green chili salsa - HOT!" },
      { id: 4, name: "Pineapple Habanero", price: 0, description: "Pineapple sauce with habanero chili - HOT!" },
      { id: 5, name: "Scotch Bonnet", price: 0, description: "Homemade spicy salsa made with scotch bonnet chilies - VERY HOT!" }
    ],
    drinks: [
      { id: 1, name: "Pink Paloma", price: 3.75, description: "An alcohol-free version of our refreshing cocktail. Tangy lime juice and grapefruit soda, with a splash of grenadine" },
      { id: 2, name: "Coco-Nought", price: 3.75, description: "Coconut, pineapple juice and milk, blended into a creamy, sweet, alcohol-free treat!" },
      { id: 3, name: "Corona", price: 3.80, description: "Mexican beer" },
      { id: 4, name: "Modelo", price: 4.00, description: "Rich, full-flavoured Pilsner style Lager. Crisp and refreshing. 355ml" },
      { id: 5, name: "Pacifico", price: 4.00, description: "Pilsner style Lager from the Pacific Ocean city of Mazatlán. 355ml" },
      { id: 6, name: "Dos Equis", price: 4.00, description: "\"Two X's\". German brewing heritage with the spirit of Mexican traditions. 355ml" },
      { id: 7, name: "San Miguel Zero", price: 3.00, description: "Alcohol-free beer. 330ml" },
      { id: 8, name: "House Wine", price: 3.75, description: "Red / White / Rosé - 175ml glass" },
      { id: 9, name: "House Wine Large", price: 5.50, description: "Red / White / Rosé - 250ml glass" },
      { id: 10, name: "House Wine Bottle", price: 14.50, description: "Red / White / Rosé - 750ml bottle" },
      { id: 11, name: "Prosecco", price: 5.00, description: "Glass (200ml)" },
      { id: 12, name: "Prosecco Bottle", price: 20.00, description: "Bottle" },
      { id: 13, name: "Sauvignon Blanc", price: 17.00, description: "Bottle (Chile)" },
      { id: 14, name: "Malbec", price: 17.00, description: "Bottle (Argentina)" },
      { id: 15, name: "Rioja", price: 22.00, description: "Bottle (Spain)" }
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
