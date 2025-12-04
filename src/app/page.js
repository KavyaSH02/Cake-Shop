import Link from "next/link";

export default function Home() {
  const cakes = [
    { name: "Black Forest", price: "$25", image: "🍰" },
    { name: "Chocolate Cake", price: "$20", image: "🎂" },
    { name: "Strawberry Cake", price: "$22", image: "🍓" },
    { name: "Vanilla Cake", price: "$18", image: "🧁" }
  ];

  return (
    <div className="min-h-screen bg-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-pink-600">🍰 Sweet Dreams Bakery</h1>
            <div className="space-x-4">
              <Link href="/login" className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                Login
              </Link>
              <Link href="/signup" className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-pink-200 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Delicious Cakes & Pastries</h2>
          <p className="text-xl text-gray-600 mb-8">Freshly baked with love every day</p>
          <Link href="/signup" className="bg-pink-500 text-white px-8 py-3 rounded-lg text-lg hover:bg-pink-600">
            Order Now
          </Link>
        </div>
      </section>

      {/* Featured Cakes */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Popular Cakes</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {cakes.map((cake, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-6xl mb-4">{cake.image}</div>
                <h4 className="text-xl font-semibold mb-2">{cake.name}</h4>
                <p className="text-pink-600 font-bold text-lg">{cake.price}</p>
                <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 Sweet Dreams Bakery. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
