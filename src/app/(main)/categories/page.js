"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@mui/material";

export default function Home() {
  const router = useRouter();

  const categories = [
    { name: "Fruit cakes", image: "/fruit.png" },
    { name: "Biscuits", image: "/biscuit.JPG" },
    { name: "Chocolate cakes", image: "/chocolate.jpg" },
    { name: "Cup cakes", image: "/cupcake.jpg" },
    { name: "Donuts", image: "/donuts.jpeg" },
    { name: "Birthday cake", image: "/Birthday cake.jpg" },
    { name: "Bread cake", image: "/Bread Cake.jpg" },
    { name: "Sweets", image: "/Sweets.jpg" }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <Link key={index} href={`/products?category=${category.name.toLowerCase().replace(" ", "-")}`}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="h-48 relative">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-semibold text-pink-500">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/gallery")}>
                <div className="h-70 relative rounded-lg mb-4 overflow-hidden">
                  <img
                    src="/THAR.jpg"
                    alt="Special Cake"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-2">Special Cake 1</h3>
                <p className="text-gray-600 text-sm">Delicious and fresh</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6" onClick={() => router.push("/doll-gallery")}>
                <div className="h-70 rounded-lg mb-4 overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onPause={(e) => e.currentTarget.play()}
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ pointerEvents: "none" }}
                  >
                    <source src="/dolllcake.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <h3 className="font-semibold mb-2">Doll Cake</h3>
                <p className="text-gray-600 text-sm">Premium quality</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push("/customer-favorite")}>
                <div className="h-70 relative rounded-lg mb-4 overflow-hidden">
                  <Image
                    src="/wedding.jpg"
                    alt="Customer Favorite"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-semibold mb-2">Customer Favorite</h3>
                <p className="text-gray-600 text-sm">Customer favorite</p>
              </div>
            </div>
          </div>
      </Container>
  );
}