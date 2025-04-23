
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

type ClothingItem = {
  id: number;
  name: string;
  type: "tshirt" | "shirt" | "tank";
  color: string;
  isIroned: boolean;
};

const colors = ["red", "blue", "green", "purple", "yellow", "gray", "black", "white"];
const clothingTypes = ["tshirt", "shirt", "tank"];

const IroningGame = () => {
  const [currentItem, setCurrentItem] = useState<ClothingItem | null>(null);
  const [isIroning, setIsIroning] = useState(false);
  const [ironPosition, setIronPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);

  // Генерация случайной одежды
  const generateRandomClothing = (): ClothingItem => {
    const randomType = clothingTypes[Math.floor(Math.random() * clothingTypes.length)] as "tshirt" | "shirt" | "tank";
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      id: Math.random(),
      name: `${randomColor} ${randomType}`,
      type: randomType,
      color: randomColor,
      isIroned: false
    };
  };

  // Начать игру
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(60);
    setCurrentItem(generateRandomClothing());
  };

  // Обновление таймера
  useEffect(() => {
    if (!gameActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive]);

  // Обработка глажки
  const handleIronClick = () => {
    if (!currentItem || isIroning) return;
    
    setIsIroning(true);
    
    // Анимация глажки
    setTimeout(() => {
      setIsIroning(false);
      setScore((prev) => prev + 10);
      setCurrentItem(generateRandomClothing());
    }, 1500);
  };

  // Отслеживание движения мыши для утюга
  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameActive) {
      setIronPosition({ 
        x: e.clientX - 50, 
        y: e.clientY - 50 
      });
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1566312922051-2c6103a73f0b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')" }}
      onMouseMove={handleMouseMove}
    >
      {/* Заголовок */}
      <header className="text-center py-6 bg-black bg-opacity-50">
        <h1 className="text-4xl md:text-6xl font-bold text-white">Поглать одежду</h1>
        <p className="text-white mt-2">Гладь мятую одежду, чтобы набрать очки!</p>
      </header>

      {/* Основная часть игры */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {gameActive ? (
          <>
            {/* Информация об игре */}
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
              <p className="font-bold">Очки: {score}</p>
              <p>Время: {timeLeft} сек</p>
            </div>
            
            {/* Одежда */}
            {currentItem && (
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div 
                  className={`w-64 h-64 rounded-lg flex items-center justify-center ${isIroning ? 'transform scale-105' : ''}`}
                >
                  <ClothingDisplay 
                    type={currentItem.type} 
                    color={currentItem.color} 
                    isIroned={isIroning} 
                  />
                </div>
                <Button 
                  className="mt-4 mx-auto block bg-blue-600 hover:bg-blue-700" 
                  onClick={handleIronClick}
                  disabled={isIroning}
                >
                  Погладить
                </Button>
              </motion.div>
            )}

            {/* Утюг-курсор */}
            {gameActive && (
              <motion.div 
                className="fixed w-24 h-16 pointer-events-none z-50"
                style={{ 
                  left: ironPosition.x, 
                  top: ironPosition.y,
                  rotate: isIroning ? -15 : -30,
                  transformOrigin: "center bottom",
                }}
                animate={{ 
                  rotate: isIroning ? [-15, -30, -15] : -30,
                  y: isIroning ? [0, -10, 0] : 0
                }}
                transition={{ duration: isIroning ? 1.5 : 0, repeat: isIroning ? 0 : 0 }}
              >
                <img 
                  src="/placeholder.svg" 
                  alt="Утюг" 
                  className="w-full h-full object-contain"
                />
                {isIroning && (
                  <motion.div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-8 bg-white opacity-60 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: 0 }}
                  />
                )}
              </motion.div>
            )}
          </>
        ) : (
          // Стартовый экран
          <div className="text-center bg-white bg-opacity-80 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Игра "Поглать одежду"</h2>
            <p className="mb-6">Гладь как можно больше одежды за 60 секунд!</p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-xl"
              onClick={startGame}
            >
              {score > 0 ? "Играть снова" : "Начать игру"}
            </Button>
            {score > 0 && (
              <p className="mt-4 text-xl">Ваш последний результат: {score} очков</p>
            )}
          </div>
        )}
      </div>

      {/* Подвал */}
      <footer className="bg-black bg-opacity-50 text-white p-4 text-center">
        <p>© 2023 Поглать одежду • Все глажки защищены</p>
      </footer>
    </div>
  );
};

// Компонент для отображения одежды
const ClothingDisplay = ({ 
  type, 
  color, 
  isIroned 
}: { 
  type: string; 
  color: string; 
  isIroned: boolean;
}) => {
  // Преобразуем названия цветов в классы Tailwind
  const colorMap: Record<string, string> = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    purple: "bg-purple-500",
    yellow: "bg-yellow-500",
    gray: "bg-gray-500",
    black: "bg-black",
    white: "bg-white border border-gray-300",
  };

  // Базовые стили одежды
  const baseStyle = `${colorMap[color]} transition-all duration-300 shadow-lg`;
  
  // Стили для мятой и поглаженной одежды
  const wrinkledStyle = "opacity-80 animate-pulse";
  const ironedStyle = "opacity-100";
  
  // Форма одежды в зависимости от типа
  let clothingShape = "";
  switch (type) {
    case "tshirt":
      clothingShape = "w-48 h-40 rounded-md relative after:content-[''] after:absolute after:top-0 after:left-1/4 after:w-1/2 after:h-8 after:bg-gray-700 after:rounded-t-3xl before:content-[''] before:absolute before:top-8 before:left-0 before:w-full before:h-32 before:bg-current";
      break;
    case "shirt":
      clothingShape = "w-48 h-48 rounded-md relative after:content-[''] after:absolute after:top-0 after:left-1/4 after:w-1/2 after:h-6 after:bg-gray-700 after:rounded-t-lg before:content-[''] before:absolute before:top-6 before:left-0 before:w-full before:h-42 before:bg-current";
      break;
    case "tank":
      clothingShape = "w-40 h-40 rounded-md relative after:content-[''] after:absolute after:top-0 after:left-1/6 after:w-2/3 after:h-10 after:bg-gray-700 after:rounded-t-full before:content-[''] before:absolute before:top-10 before:left-0 before:w-full before:h-30 before:bg-current";
      break;
    default:
      clothingShape = "w-48 h-40 rounded-md";
  }

  return (
    <motion.div 
      className={`${baseStyle} ${clothingShape} ${isIroned ? ironedStyle : wrinkledStyle}`}
      animate={isIroned ? 
        { 
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 1]
        } : 
        { 
          scale: 1,
          opacity: 0.8,
          rotate: [0, 0.5, -0.5, 0]
        }
      }
      transition={{ 
        duration: isIroned ? 1.5 : 2,
        repeat: isIroned ? 0 : Infinity,
        repeatType: "reverse"
      }}
    >
      {/* Визуальный эффект складок/морщин на одежде */}
      {!isIroned && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/6 w-2/3 h-0.5 bg-gray-800 transform rotate-3"></div>
          <div className="absolute top-2/4 left-1/3 w-1/2 h-0.5 bg-gray-800 transform -rotate-2"></div>
          <div className="absolute top-3/4 right-1/4 w-1/3 h-0.5 bg-gray-800 transform rotate-6"></div>
        </div>
      )}
    </motion.div>
  );
};

export default IroningGame;
