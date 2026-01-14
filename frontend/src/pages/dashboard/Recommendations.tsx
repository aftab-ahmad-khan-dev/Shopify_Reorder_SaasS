import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Lightbulb, 
  TrendingUp,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

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

export const Recommendations: React.FC = () => {
  const { t } = useLanguage();

  const recommendations = [
    {
      id: 'rec_1',
      title: t.recommendations.items.optimizeReminder.title,
      description: t.recommendations.items.optimizeReminder.description,
      impact: t.recommendations.items.optimizeReminder.impact,
      priority: 'high',
      action: t.recommendations.applyRecommendation,
    },
    {
      id: 'rec_2',
      title: t.recommendations.items.enablePushNotifications.title,
      description: t.recommendations.items.enablePushNotifications.description,
      impact: t.recommendations.items.enablePushNotifications.impact,
      priority: 'medium',
      action: t.recommendations.enablePush,
    },
    {
      id: 'rec_3',
      title: t.recommendations.items.addSubscriptionRule.title,
      description: t.recommendations.items.addSubscriptionRule.description,
      impact: t.recommendations.items.addSubscriptionRule.impact,
      priority: 'high',
      action: t.recommendations.createRule,
    },
    {
      id: 'rec_4',
      title: t.recommendations.items.localizeCopy.title,
      description: t.recommendations.items.localizeCopy.description,
      impact: t.recommendations.items.localizeCopy.impact,
      priority: 'low',
      action: t.recommendations.addCopyVariant,
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return t.recommendations.priority.high;
      case 'medium':
        return t.recommendations.priority.medium;
      default:
        return t.recommendations.priority.low;
    }
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-2xl font-bold">{t.recommendations.title}</h1>
        <p className="text-muted-foreground mt-1">
          {t.recommendations.subtitle}
        </p>
      </motion.div>

      {/* Summary Card */}
      <motion.div variants={fadeInUp} className="gradient-border rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.recommendations.potentialRevenue}</p>
              <p className="text-3xl font-bold gradient-text">+$4,200/mo</p>
            </div>
          </div>
          <p className="text-muted-foreground text-center md:text-right max-w-sm">
            {t.recommendations.implementingMessage}
          </p>
        </div>
      </motion.div>

      {/* Recommendations List */}
      <motion.div variants={fadeInUp} className="space-y-4">
        {recommendations.map((rec, index) => (
          <motion.div
            key={rec.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl p-5"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{rec.title}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                      {getPriorityText(rec.priority)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-success text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                    {rec.impact}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>

                <div className="flex items-center gap-2">
                  <Button variant="gradient" size="sm" className="gap-1">
                    {rec.action}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    {t.recommendations.dismiss}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State Preview */}
      <motion.div variants={fadeInUp} className="text-center py-12 opacity-50">
        <Lightbulb className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          {t.recommendations.emptyState}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Recommendations;
