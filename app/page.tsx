"use client";

import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  {
    id: 1,
    name: "Baguette",
    price: 40000,
    image: "/croissants.png",
    category: "Classic Breads",
  },
  {
    id: 2,
    name: "Sourdough",
    price: 55000,
    image: "/croissants2.png",
    category: "Classic Breads",
  },
  {
    id: 3,
    name: "Croissant",
    price: 25000,
    image: "/bread.png",
    category: "Pastries",
  },
  {
    id: 4,
    name: "Pain au Chocolat",
    price: 30000,
    image: "/cake.png",
    category: "Pastries",
  },
  {
    id: 5,
    name: "Focaccia",
    price: 45000,
    image: "/croissants2.png",
    category: "Specialty Breads",
  },
];

const categories = ["All", "Classic Breads", "Pastries", "Specialty Breads"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [addingItemId, setAddingItemId] = useState<number | null>(null);
  const { addItem } = useCart();

  let filteredProducts = products.filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory,
  );

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "name-asc") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const handleAddToCart = (product: any) => {
    setAddingItemId(product.id);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    toast.success(`${product.name} added to cart`, {
      description: "You can view your items in the cart.",
    });

    setTimeout(() => {
      setAddingItemId(null);
    }, 1000);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="p-5 md:px-10 lg:px-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col justify-center items-center mt-6">
            <h1 className="text-3xl md:text-5xl font-semibold font-serif text-center max-w-xl">
              Freshly Baked Bread Every Day!
            </h1>
            <p className="text-base md:text-lg font-normal text-muted-foreground text-center mt-4 max-w-xl">
              From crispy croissants to soft sourdough, choose your favorite and
              order with ease!
            </p>
            <div className="flex flex-wrap justify-center items-center gap-3 mt-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  size="lg"
                  variant={activeCategory === category ? "default" : "outline"}
                  className="rounded-full px-5 transition-all"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Button>
              ))}

              <div className="">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 place-items-center mt-8">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-card border border-border w-40 md:w-64 max-w-sm rounded-4xl shadow flex flex-col justify-center items-center p-2 relative transition-transform hover:-translate-y-2 hover:shadow-xl duration-300 animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={product.image}
                  className="h-44 object-contain"
                  alt={product.name}
                />
                <p className="text-lg font-semibold text-center mt-5">
                  {product.name}
                </p>
                <p className="text-sm font-normal text-muted-foreground text-center mt-2 mb-6">
                  Rp {product.price.toLocaleString("id-ID")}
                </p>
                <Button
                  className={`absolute -bottom-6 h-12 w-12 rounded-full shadow-md transition-all duration-300 ${addingItemId === product.id ? "bg-green-500 hover:bg-green-600 scale-110" : "hover:scale-110"}`}
                  onClick={() => handleAddToCart(product)}
                >
                  {addingItemId === product.id ? (
                    <Check className="animate-in zoom-in" />
                  ) : (
                    <Plus />
                  )}
                </Button>
              </div>
            ))}

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-20 text-center text-muted-foreground">
                <p>No products found for this category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
