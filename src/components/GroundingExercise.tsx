import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, Hand, Ear, Wind, Coffee } from "lucide-react";

const steps = [
  { count: 5, sense: "SEE", icon: Eye, prompt: "Name 5 things you can see around you", examples: "A window, your hands, a light, the floor, a door..." },
  { count: 4, sense: "TOUCH", icon: Hand, prompt: "Name 4 things you can feel", examples: "Your clothes, the chair, your feet on the floor, your breath..." },
  { count: 3, sense: "HEAR", icon: Ear, prompt: "Name 3 things you can hear", examples: "Traffic, birds, your heartbeat, the AC humming..." },
  { count: 2, sense: "SMELL", icon: Wind, prompt: "Name 2 things you can smell", examples: "Fresh air, coffee, soap, your shampoo..." },
  { count: 1, sense: "TASTE", icon: Coffee, prompt: "Name 1 thing you can taste", examples: "Your last meal, tea, toothpaste, water..." },
];

const GroundingExercise = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompleted(false);
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="bg-card rounded-2xl p-8 shadow-soft">
      <h3 className="text-xl font-serif font-medium text-foreground mb-2">5-4-3-2-1 Grounding</h3>
      <p className="text-muted-foreground mb-8">Connect with your senses to feel more present</p>

      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-primary" />
              </div>
              <p className="text-lg font-serif text-foreground mb-2">Well done!</p>
              <p className="text-muted-foreground mb-6">You've completed the grounding exercise.</p>
              <Button onClick={handleReset} variant="outline" className="rounded-full px-6 border-primary/30">
                Start Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center w-full"
            >
              {/* Step indicator */}
              <div className="w-20 h-20 rounded-full bg-accent flex flex-col items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-serif text-primary font-medium">{step.count}</span>
              </div>

              <div className="flex items-center justify-center gap-2 mb-4">
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium tracking-widest text-primary">{step.sense}</span>
              </div>

              <p className="text-lg text-foreground mb-2">{step.prompt}</p>
              <p className="text-sm text-muted-foreground mb-8 italic">{step.examples}</p>

              <Button onClick={handleNext} className="rounded-full px-8">
                Done
              </Button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 mt-8">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep ? "bg-primary" : index < currentStep ? "bg-primary/50" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GroundingExercise;
