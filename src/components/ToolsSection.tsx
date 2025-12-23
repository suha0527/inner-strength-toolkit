import { motion } from "framer-motion";
import BreathingExercise from "./BreathingExercise";
import GroundingExercise from "./GroundingExercise";
import WordsOfHope from "./WordsOfHope";

const ToolsSection = () => {
  return (
    <section id="tools" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
            Find Your Calm
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Simple exercises to help you through this moment. Take your time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <BreathingExercise />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GroundingExercise />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 lg:col-span-1"
          >
            <WordsOfHope />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
