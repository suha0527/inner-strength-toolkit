import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const affirmations = [
  "This feeling is temporary. It will pass.",
  "You are stronger than you know.",
  "It's okay to take things one moment at a time.",
  "You matter more than you realize.",
  "Healing isn't linear, and that's okay.",
  "You deserve compassion, especially from yourself.",
  "Small steps still move you forward.",
  "Your feelings are valid.",
  "Tomorrow holds new possibilities.",
  "You've survived difficult days before. You can do it again.",
  "It's brave to ask for help.",
  "You are worthy of love and care.",
];

const WordsOfHope = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getRandomIndex = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * affirmations.length);
    } while (newIndex === currentIndex);
    return newIndex;
  };

  const handleRefresh = () => {
    setCurrentIndex(getRandomIndex());
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(getRandomIndex());
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="bg-card rounded-2xl p-8 shadow-soft">
      <h3 className="text-xl font-serif font-medium text-foreground mb-2">Words of Hope</h3>
      <p className="text-muted-foreground mb-8">A gentle reminder for you</p>

      <div className="relative min-h-[120px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="text-4xl text-primary/30 font-serif leading-none">"</span>
            <p className="text-xl md:text-2xl font-serif text-foreground italic px-4">
              {affirmations[currentIndex]}
            </p>
            <span className="text-4xl text-primary/30 font-serif leading-none">"</span>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-6">
        <Button
          onClick={handleRefresh}
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-primary"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          New message
        </Button>
      </div>
    </div>
  );
};

export default WordsOfHope;
