import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import smartTvImage from "@/assets/product-smart-tv.jpg";
import homeTheatreImage from "@/assets/product-home-theatre.jpg";
import fanImage from "@/assets/product-fan.jpg";

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const whatsappNumber = "2348012345678";

  const categories = ["All", "LED TVs", "Smart TVs", "Home Theatre", "Fans", "Other"];

  const products: Product[] = [
    {
      id: 1,
      image: smartTvImage,
      name: '32" LED TV',
      description: "Full HD display with vibrant colors and slim design. Perfect for bedrooms and small spaces.",
      price: "₦85,000",
      category: "LED TVs",
    },
    {
      id: 2,
      image: smartTvImage,
      name: '43" LED TV',
      description: "Crisp Full HD display with wide viewing angles. Great for living rooms.",
      price: "₦125,000",
      category: "LED TVs",
    },
    {
      id: 3,
      image: smartTvImage,
      name: '43" Smart TV',
      description: "Android TV with built-in apps, WiFi connectivity, and streaming capabilities.",
      price: "₦155,000",
      category: "Smart TVs",
    },
    {
      id: 4,
      image: smartTvImage,
      name: '55" 4K Smart TV',
      description: "Ultra HD 4K display with HDR, smart features, and voice control support.",
      price: "₦185,000",
      category: "Smart TVs",
    },
    {
      id: 5,
      image: smartTvImage,
      name: '65" 4K Smart TV',
      description: "Premium large-screen experience with stunning 4K resolution and Dolby Audio.",
      price: "₦285,000",
      category: "Smart TVs",
    },
    {
      id: 6,
      image: homeTheatreImage,
      name: "2.1 Soundbar System",
      description: "Compact soundbar with wireless subwoofer. Great for enhancing TV audio.",
      price: "₦55,000",
      category: "Home Theatre",
    },
    {
      id: 7,
      image: homeTheatreImage,
      name: "5.1 Home Theatre System",
      description: "Complete surround sound experience with 5 speakers and powerful subwoofer.",
      price: "₦95,000",
      category: "Home Theatre",
    },
    {
      id: 8,
      image: fanImage,
      name: '16" Table Fan',
      description: "Compact and powerful table fan with 3 speed settings and oscillation.",
      price: "₦15,000",
      category: "Fans",
    },
    {
      id: 9,
      image: fanImage,
      name: '18" Standing Fan',
      description: "Tall standing fan with adjustable height, timer, and remote control.",
      price: "₦25,000",
      category: "Fans",
    },
    {
      id: 10,
      image: fanImage,
      name: "Rechargeable Fan",
      description: "Battery-powered fan that works during power outages. Up to 8 hours battery life.",
      price: "₦35,000",
      category: "Fans",
    },
  ];

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main className="py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Products
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Quality electronics at competitive prices. Order via WhatsApp or visit our store in Ibadan.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const orderMessage = `Hello, I want to order the ${product.name} priced at ${product.price} from your website.`;
            const negotiateMessage = `Hello, I want to negotiate the price of the ${product.name} listed at ${product.price} on your website.`;
            
            return (
              <div
                key={product.id}
                className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="font-display font-bold text-xl text-primary mb-4">
                    {product.price}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="whatsapp" size="sm" className="w-full">
                        <MessageCircle className="w-4 h-4" />
                        Order
                      </Button>
                    </a>
                    <a
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(negotiateMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="outline" size="sm" className="w-full">
                        Negotiate
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Don't see what you're looking for? Contact us on WhatsApp
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I'm looking for a specific product. Can you help?")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg">
              <MessageCircle className="w-5 h-5" />
              Ask About Products
            </Button>
          </a>
        </div>
      </div>
    </main>
  );
};

export default Products;
