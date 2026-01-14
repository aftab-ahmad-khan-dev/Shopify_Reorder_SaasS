import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Filter, 
  Plus, 
  Trash2, 
  Edit3,
  Eye,
  EyeOff,
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

export const VisibilityRules: React.FC = () => {
  const { t } = useLanguage();
  
  const mockVisibilityRules = [
    {
      id: 'vis_1',
      name: t.visibilityRules.mockRules.hideNewCustomers.name,
      condition: t.visibilityRules.mockRules.hideNewCustomers.condition,
      action: t.visibilityRules.mockRules.hideNewCustomers.action,
      enabled: true,
    },
    {
      id: 'vis_2',
      name: t.visibilityRules.mockRules.showReturningCustomers.name,
      condition: t.visibilityRules.mockRules.showReturningCustomers.condition,
      action: t.visibilityRules.mockRules.showReturningCustomers.action,
      enabled: true,
    },
    {
      id: 'vis_3',
      name: t.visibilityRules.mockRules.disableSubscriptionProducts.name,
      condition: t.visibilityRules.mockRules.disableSubscriptionProducts.condition,
      action: t.visibilityRules.mockRules.disableSubscriptionProducts.action,
      enabled: false,
    },
  ];

  const [rules, setRules] = useState(mockVisibilityRules);

  const toggleRule = (id: string) => {
    setRules(prev =>
      prev.map(rule =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={stagger}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{t.visibilityRules.title}</h1>
          <p className="text-muted-foreground mt-1">
            {t.visibilityRules.subtitle}
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="w-4 h-4" />
          {t.visibilityRules.addRule}
        </Button>
      </motion.div>

      {/* Rules List */}
      <motion.div variants={fadeInUp} className="space-y-3">
        {rules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card rounded-xl p-5 ${
              !rule.enabled ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                rule.enabled ? 'bg-primary/10' : 'bg-secondary'
              }`}>
                {rule.enabled ? (
                  <Eye className="w-5 h-5 text-primary" />
                ) : (
                  <EyeOff className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium">{rule.name}</h3>
                  <Switch
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 rounded bg-secondary text-muted-foreground text-xs">{t.visibilityRules.when}</span>
                    <span className="text-muted-foreground">{rule.condition}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs">{t.visibilityRules.then}</span>
                    <span>{rule.action}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Edit3 className="w-4 h-4" />
                    {t.visibilityRules.edit}
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1 text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                    {t.visibilityRules.delete}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Info Card */}
      <motion.div variants={fadeInUp} className="glass-card rounded-xl p-5">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center shrink-0">
            <Filter className="w-5 h-5 text-info" />
          </div>
          <div>
            <h4 className="font-medium mb-1">{t.visibilityRules.howItWorks.title}</h4>
            <p className="text-sm text-muted-foreground">
              {t.visibilityRules.howItWorks.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VisibilityRules;
