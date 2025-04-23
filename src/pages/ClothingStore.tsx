
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Search, User, Menu } from "lucide-react";

interface ClothingItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const clothingItems: ClothingItem[] = [
  {
    id: 1,
    name: "Футболка базовая",
    price: 999,
    image: "/placeholder.svg",
    category: "футболки"
  },
  {
    id: 2,
    name: "Джинсы классические",
    price: 2499,
    image: "/placeholder.svg",
    category: "брюки"
  },
  {
    id: 3,
    name: "Куртка демисезонная",
    price: 4999,
    image: "/placeholder.svg",
    category: "верхняя одежда"
  },
  {
    id: 4,
    name: "Платье летнее",
    price: 1899,
    image: "/placeholder.svg",
    category: "платья"
  },
  {
    id: 5,
    name: "Рубашка в клетку",
    price: 1599,
    image: "/placeholder.svg",
    category: "рубашки"
  },
  {
    id: 6,
    name: "Свитер вязаный",
    price: 2299,
    image: "/placeholder.svg",
    category: "свитера"
  },
];

const categories = ["все", "футболки", "брюки", "верхняя одежда", "платья", "рубашки", "свитера"];

const ClothingStore = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Верхняя панель навигации */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Menu className="mr-4 md:hidden" size={24} />
              <h1 className="text-2xl md:text-3xl font-bold text-burger-brown">Поглать одежду</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-burger-brown">Главная</Link>
              <Link to="/" className="text-gray-600 hover:text-burger-brown">Новинки</Link>
              <Link to="/" className="text-gray-600 hover:text-burger-brown">Мужское</Link>
              <Link to="/" className="text-gray-600 hover:text-burger-brown">Женское</Link>
              <Link to="/" className="text-gray-600 hover:text-burger-brown">Акции</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Search size={20} className="text-gray-600 cursor-pointer hover:text-burger-brown" />
              <User size={20} className="text-gray-600 cursor-pointer hover:text-burger-brown" />
              <Heart size={20} className="text-gray-600 cursor-pointer hover:text-burger-brown" />
              <div className="relative">
                <ShoppingCart size={20} className="text-gray-600 cursor-pointer hover:text-burger-brown" />
                <span className="absolute -top-2 -right-2 bg-burger-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Баннер */}
      <div className="bg-gradient-to-r from-burger-yellow to-yellow-300 py-10 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-burger-brown mb-4">Весенняя коллекция</h2>
          <p className="text-lg md:text-xl text-gray-700 mb-6">Скидки до 50% на новые поступления</p>
          <Button variant="default" className="bg-burger-red hover:bg-red-700 text-white px-8 py-2">
            Смотреть
          </Button>
        </div>
      </div>

      {/* Категории */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className="whitespace-nowrap mx-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-burger-yellow hover:text-burger-brown transition-colors"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Товары */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clothingItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-60 bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full">
                  <Heart size={16} className="text-gray-400 hover:text-burger-red" />
                </button>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold text-burger-brown">{item.price} ₽</span>
                  <Button variant="outline" size="sm" className="text-xs">
                    В корзину
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Подвал */}
      <footer className="bg-gray-100 mt-16 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">О компании</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">О нас</a></li>
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">Новости</a></li>
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">Контакты</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Покупателям</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">Доставка</a></li>
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">Оплата</a></li>
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">Возврат</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Каталог</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">Новинки</a></li>
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">Акции</a></li>
                <li><a href="#" className="text-gray-600 hover:text-burger-brown">Распродажа</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Мы в соцсетях</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-burger-brown">ВК</a>
                <a href="#" className="text-gray-600 hover:text-burger-brown">Телеграм</a>
                <a href="#" className="text-gray-600 hover:text-burger-brown">Одноклассники</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>© 2023 Поглать одежду. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClothingStore;
