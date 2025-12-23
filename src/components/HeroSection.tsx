import { Heart, ChevronDown, BookHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-peach opacity-40 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-sage-light opacity-30 blur-3xl" />
      
      {/* Journal link */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="absolute top-6 right-6"
      >
        <Link to="/auth">
          <Button variant="outline" size="sm" className="rounded-full border-primary/30 hover:bg-accent">
            <BookHeart className="w-4 h-4 mr-2" />
            My Journal
          </Button>
        </Link>
      </motion.div>

      <motion.div 
        className="relative z-10 text-center max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Heart icon */}
        <motion.div 
          className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Heart className="w-10 h-10 text-primary" />
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          You are not alone
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl text-muted-foreground mb-4 font-serif"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Whatever you're feeling right now, it's okay to feel it.
        </motion.p>

        <motion.p 
          className="text-base md:text-lg text-muted-foreground mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Let's take this moment together. There are simple tools here that can help you through this.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <Button 
            onClick={scrollToTools}
            size="lg" 
            className="px-8 py-6 text-base rounded-full"
          >
            Find calm now
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-6 text-base rounded-full border-primary/30 hover:bg-accent"
            asChild
          >
            <a href="tel:988">Talk to someone</a>
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button 
        onClick={scrollToTools}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <span className="text-sm">Explore tools</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.button>
    </section>
  );
};

export default HeroSection;
