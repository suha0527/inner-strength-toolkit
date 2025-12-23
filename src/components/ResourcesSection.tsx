import { motion } from "framer-motion";
import { Phone, MessageCircle, Globe } from "lucide-react";

const resources = [
  {
    title: "988 Suicide & Crisis Lifeline",
    description: "24/7 support for anyone in distress",
    action: "Call or text 988",
    href: "tel:988",
    icon: Phone,
  },
  {
    title: "Crisis Text Line",
    description: "Text-based crisis support",
    action: "Text HOME to 741741",
    href: "sms:741741?body=HOME",
    icon: MessageCircle,
  },
  {
    title: "International Association for Suicide Prevention",
    description: "Find crisis centers worldwide",
    action: "Visit website",
    href: "https://www.iasp.info/resources/Crisis_Centres/",
    icon: Globe,
  },
];

const ResourcesSection = () => {
  return (
    <section className="py-20 px-4 bg-accent/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
            You Can Reach Out
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Trained counselors are available 24/7 to listen and help. You don't have to face this alone.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.a
                key={resource.title}
                href={resource.href}
                target={resource.href.startsWith("http") ? "_blank" : undefined}
                rel={resource.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="block bg-card rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif font-medium text-foreground mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                <span className="text-sm font-medium text-primary">{resource.action}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
