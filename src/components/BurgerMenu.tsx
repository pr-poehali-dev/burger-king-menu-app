
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";

interface Ingredient {
  name: string;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  customizable?: boolean;
  ingredients?: Ingredient[];
}

const menuItems: MenuItem[] = [
  {
    id: "angus-burger",
    name: "Ангус Бургер",
    image: "/placeholder.svg",
    price: 326,
    description: "Сочный бургер с котлетой из мраморной говядины",
    customizable: true,
    ingredients: [
      { name: "Котлета", price: 100 },
      { name: "Огурец", price: 15 },
      { name: "Помидор", price: 20 },
      { name: "Сыр", price: 30 },
      { name: "Ветчина", price: 40 },
      { name: "Листья салата", price: 10 },
      { name: "Бекон", price: 50 },
      { name: "Соленый огурец", price: 15 },
    ],
  },
  {
    id: "chicken-burger",
    name: "Чикен Бургер",
    image: "/placeholder.svg",
    price: 97,
    description: "Вкусный бургер с сочными наггетсами вместо котлеты",
  },
  {
    id: "cheeseburger",
    name: "Чизбургер",
    image: "/placeholder.svg",
    price: 100,
    description: "Классический бургер с сыром и соусом",
  },
  {
    id: "whopper",
    name: "Воппер",
    image: "/placeholder.svg",
    price: 287,
    description: "Большой фирменный бургер с говяжьей котлетой",
  },
  {
    id: "fries",
    name: "Картошка фри",
    image: "/placeholder.svg",
    price: 119,
    description: "Хрустящая золотистая картошка фри",
  },
  {
    id: "nuggets",
    name: "Наггетсы",
    image: "/placeholder.svg",
    price: 120,
    description: "Хрустящие куриные наггетсы",
  },
  {
    id: "cola",
    name: "Кола",
    image: "/placeholder.svg",
    price: 200,
    description: "Освежающий газированный напиток",
  },
  {
    id: "cheese-sauce",
    name: "Сырный соус",
    image: "/placeholder.svg",
    price: 60,
    description: "Нежный сырный соус для макания",
  },
];

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  removedIngredients?: string[];
}

const BurgerMenu = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);

  const addToCart = (item: MenuItem) => {
    const existingCartItemIndex = cart.findIndex(
      (cartItem) => cartItem.menuItem.id === item.id
    );

    if (existingCartItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingCartItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      if (item.id === "angus-burger" && item.customizable) {
        setCart([
          ...cart,
          { menuItem: item, quantity: 1, removedIngredients: [...removedIngredients] },
        ]);
      } else {
        setCart([...cart, { menuItem: item, quantity: 1 }]);
      }
    }
    setRemovedIngredients([]);
  };

  const toggleIngredient = (ingredientName: string) => {
    if (removedIngredients.includes(ingredientName)) {
      setRemovedIngredients(removedIngredients.filter((name) => name !== ingredientName));
    } else {
      setRemovedIngredients([...removedIngredients, ingredientName]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const scrollRight = () => {
    if (activeIndex < menuItems.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    
    // "Телепортация" в кафе
    alert(`Заказ на сумму ${getTotalPrice()}₽ успешно оформлен! Вы телепортировались в кафе Burger King и забрали свой заказ в пакете 🍔👜`);
    setCart([]);
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden my-6">
        <div className="flex justify-between items-center mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            disabled={activeIndex === 0}
            className="z-10"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            disabled={activeIndex === menuItems.length - 1}
            className="z-10"
          >
            <ChevronRight />
          </Button>
        </div>
        
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="min-w-full px-4 flex-shrink-0"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-40 object-contain"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-lg font-bold mb-3">{item.price}₽</p>
                  
                  {item.customizable && item.ingredients && (
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Состав (нажмите, чтобы убрать):</h4>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.ingredients.map((ingredient) => (
                          <Button
                            key={ingredient.name}
                            variant={removedIngredients.includes(ingredient.name) ? "outline" : "secondary"}
                            size="sm"
                            onClick={() => toggleIngredient(ingredient.name)}
                            className="text-xs"
                          >
                            {ingredient.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => addToCart(item)}
                    className="w-full"
                  >
                    Добавить в корзину
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-4">Ваш заказ:</h2>
        {cart.length === 0 ? (
          <p>Корзина пуста</p>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2 pb-2 border-b">
                <div>
                  <p className="font-medium">
                    {item.menuItem.name} x{item.quantity}
                  </p>
                  {item.removedIngredients && item.removedIngredients.length > 0 && (
                    <p className="text-sm text-gray-500">
                      Без: {item.removedIngredients.join(", ")}
                    </p>
                  )}
                </div>
                <p className="font-bold">{item.menuItem.price * item.quantity}₽</p>
              </div>
            ))}
            <div className="flex justify-between items-center mt-4 pt-2 border-t">
              <p className="font-bold">Итого:</p>
              <p className="font-bold text-xl">{getTotalPrice()}₽</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button 
            onClick={placeOrder}
            disabled={cart.length === 0}
            className="px-6 py-3 text-lg"
          >
            <ShoppingBag className="mr-2" />
            Заказать {getTotalPrice() > 0 ? `(${getTotalPrice()}₽)` : ""}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
