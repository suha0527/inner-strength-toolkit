import { Phone, MessageCircle } from "lucide-react";

const CrisisBanner = () => {
  return (
    <div className="w-full bg-secondary py-3 px-4">
      <div className="container mx-auto flex flex-wrap items-center justify-center gap-4 text-sm">
        <span className="text-foreground/80">If you're in crisis, please reach out:</span>
        <div className="flex items-center gap-4">
          <a 
            href="tel:988" 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <Phone className="h-4 w-4" />
            988 (US)
          </a>
          <a 
            href="sms:741741?body=HOME" 
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            <MessageCircle className="h-4 w-4" />
            Text HOME to 741741
          </a>
        </div>
      </div>
    </div>
  );
};

export default CrisisBanner;
