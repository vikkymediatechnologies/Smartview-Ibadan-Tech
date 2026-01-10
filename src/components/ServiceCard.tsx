import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  formLink: string;
}

const ServiceCard = ({ icon: Icon, title, description, benefits, formLink }: ServiceCardProps) => {
  return (
    <div className="bg-card rounded-xl p-6 card-shadow hover:card-shadow-hover transition-all duration-300 group">
      <div className="w-14 h-14 hero-gradient rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="font-display font-semibold text-xl text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <ul className="space-y-2 mb-5">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
            <svg className="w-4 h-4 text-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>
      <a href={formLink} target="_blank" rel="noopener noreferrer">
        <Button variant="default" className="w-full">
          Request Service
        </Button>
      </a>
    </div>
  );
};

export default ServiceCard;
