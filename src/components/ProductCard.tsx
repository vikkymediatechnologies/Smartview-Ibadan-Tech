import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

const ProductCard = ({ image, name, description, price, category }: ProductCardProps) => {
  const whatsappNumber = "2348012345678";
  
  const orderMessage = `Hello, I want to order the ${name} priced at ${price} from your website.`;
  const negotiateMessage = `Hello, I want to negotiate the price of the ${name} listed at ${price} on your website.`;
  
  const orderLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderMessage)}`;
  const negotiateLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(negotiateMessage)}`;

  return (
    <div className="bg-card rounded-xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
          {category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-foreground mb-1">{name}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{description}</p>
        <p className="font-display font-bold text-xl text-primary mb-4">{price}</p>
        <div className="flex gap-2">
          <a href={orderLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="whatsapp" size="sm" className="w-full">
              <MessageCircle className="w-4 h-4" />
              Order Now
            </Button>
          </a>
          <a href={negotiateLink} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" size="sm" className="w-full">
              Negotiate
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
