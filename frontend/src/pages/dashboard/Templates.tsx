import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { mockTemplates } from '@/api/mockData';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const Templates: React.FC = () => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl font-bold">{t.templates.title}</h1>
        <p className="text-muted-foreground mt-1">
          {t.templates.subtitle}
        </p>
      </motion.div>

      {/* Templates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {mockTemplates.map((template, index) => (
          <motion.div
            key={template.id}
            variants={fadeInUp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="metric-card group cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                {template.icon}
              </div>
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
                {template.avgLift} {t.templates.lift}
              </span>
            </div>

            <h3 className="font-semibold mb-1">{template.name}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {template.description}
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="text-xs text-muted-foreground">
                {template.rules} {t.templates.rulesIncluded}
              </span>
              <Button variant="ghost" size="sm" className="gap-1 group-hover:text-primary">
                {t.templates.preview}
                <ArrowRight className="w-3 h-3" />
              </Button>
            </div>
          </motion.div>
        ))}

        {/* Custom Template Card */}
        <motion.div
          variants={fadeInUp}
          className="metric-card border-dashed cursor-pointer flex flex-col items-center justify-center text-center min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-1">{t.templates.createCustom.title}</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t.templates.createCustom.description}
          </p>
          <Button variant="subtle" size="sm">
            {t.templates.createCustom.startBuilding}
          </Button>
        </motion.div>
      </div>

      {/* Template Preview Section */}
      <motion.div variants={fadeInUp} className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4">{t.templates.whatsIncluded.title}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.templates.whatsIncluded.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Templates;
