import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "ready">("ready");
  const [countdown, setCountdown] = useState(4);

  const phaseConfig = {
    inhale: { duration: 4, next: "hold" as const, text: "Breathe in..." },
    hold: { duration: 4, next: "exhale" as const, text: "Hold..." },
    exhale: { duration: 4, next: "inhale" as const, text: "Breathe out..." },
    ready: { duration: 0, next: "inhale" as const, text: "Ready?" },
  };

  const startExercise = () => {
    setIsActive(true);
    setPhase("inhale");
    setCountdown(4);
  };

  const stopExercise = () => {
    setIsActive(false);
    setPhase("ready");
    setCountdown(4);
  };

  const tick = useCallback(() => {
    if (!isActive || phase === "ready") return;

    if (countdown > 1) {
      setCountdown((prev) => prev - 1);
    } else {
      const nextPhase = phaseConfig[phase].next;
      setPhase(nextPhase);
      setCountdown(phaseConfig[nextPhase].duration);
    }
  }, [isActive, phase, countdown]);

  useEffect(() => {
    if (!isActive) return;
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [isActive, tick]);

  const getCircleScale = () => {
    if (phase === "inhale") return 1.3;
    if (phase === "hold") return 1.3;
    if (phase === "exhale") return 1;
    return 1;
  };

  return (
    <div className="bg-card rounded-2xl p-8 shadow-soft">
      <h3 className="text-xl font-serif font-medium text-foreground mb-2">Breathing Exercise</h3>
      <p className="text-muted-foreground mb-8">Follow the circle to calm your mind</p>

      <div className="flex flex-col items-center">
        {/* Breathing circle */}
        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
          {/* Outer glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-sage-light opacity-50"
            animate={{ scale: getCircleScale() }}
            transition={{ duration: phaseConfig[phase === "ready" ? "inhale" : phase].duration, ease: "easeInOut" }}
          />
          
          {/* Main circle */}
          <motion.div
            className="absolute inset-4 rounded-full bg-accent border-4 border-primary/20"
            animate={{ scale: getCircleScale() }}
            transition={{ duration: phaseConfig[phase === "ready" ? "inhale" : phase].duration, ease: "easeInOut" }}
          />

          {/* Text */}
          <div className="relative z-10 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-primary font-medium"
              >
                {phaseConfig[phase].text}
              </motion.div>
            </AnimatePresence>
            {isActive && phase !== "ready" && (
              <motion.div
                key={countdown}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-3xl font-serif text-primary mt-2"
              >
                {countdown}
              </motion.div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <Button 
            onClick={startExercise} 
            disabled={isActive}
            className="rounded-full px-6"
          >
            Start
          </Button>
          <Button 
            onClick={stopExercise}
            variant="outline"
            className="rounded-full px-6 border-primary/30"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
