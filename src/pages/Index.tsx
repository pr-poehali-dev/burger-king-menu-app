
import BurgerMenu from "@/components/BurgerMenu";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-300 to-yellow-100">
      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col items-center justify-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-2 text-center">
            Burger King
          </h1>
          <p className="text-lg text-gray-700 text-center mb-2">
            Насладитесь нашими фирменными бургерами
          </p>
          <div className="h-1 w-24 bg-red-600 rounded"></div>
        </header>
        
        <main>
          <BurgerMenu />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-600">
          <p>© 2023 Burger King. Все ваши любимые бургеры и не только.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
