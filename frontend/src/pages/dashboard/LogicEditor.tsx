import { useState } from 'react';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, 
  Plus, 
  GripVertical, 
  Trash2, 
  Copy, 
  Edit3,
  Zap,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { mockRules } from '@/api/mockData';

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

export const LogicEditor: React.FC = () => {
  const { isPlanGrowth, upgradePlan } = useShop();
  const { t } = useLanguage();
  const [rules, setRules] = useState(mockRules);

  const toggleRule = (id: string) => {
    setRules(prev => 
      prev.map(rule => 
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  if (!isPlanGrowth) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Lock className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold mb-2">{t.logicEditor.locked.title}</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          {t.logicEditor.locked.description}
        </p>
        <div className="flex items-center gap-4">
          <Button variant="gradient" onClick={upgradePlan} className="gap-2">
            <Zap className="w-4 h-4" />
            {t.logicEditor.locked.upgradeToGrowth}
          </Button>
          <Button variant="outline">{t.logicEditor.locked.viewDemo}</Button>
        </div>

        <div className="mt-12 glass-card rounded-xl p-6 max-w-lg opacity-60">
          <p className="text-sm text-muted-foreground mb-4">{t.logicEditor.locked.previewTitle}</p>
          <div className="space-y-3">
            {mockRules.slice(0, 2).map((rule) => (
              <div key={rule.id} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{rule.name}</p>
                  <p className="text-xs text-muted-foreground">{rule.condition}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{t.logicEditor.title}</h1>
            <span className="plan-badge growth">{t.logicEditor.pro}</span>
          </div>
          <p className="text-muted-foreground mt-1">
            {t.logicEditor.subtitle}
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="w-4 h-4" />
          {t.logicEditor.addRule}
        </Button>
      </motion.div>

      {/* Rules List */}
      <motion.div variants={fadeInUp} className="space-y-3">
        {rules.map((rule, index) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card rounded-xl p-4 ${
              rule.enabled ? 'border-primary/20' : 'opacity-60'
            }`}
          >
            <div className="flex items-start gap-4">
              <button className="mt-1 cursor-grab active:cursor-grabbing">
                <GripVertical className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Brain className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{rule.name}</h3>
                      <p className="text-xs text-muted-foreground">{t.logicEditor.priority} {rule.priority}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={rule.enabled}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded bg-secondary text-muted-foreground">{t.logicEditor.if}</span>
                  <span>{rule.condition}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2 py-1 rounded bg-primary/10 text-primary">{t.logicEditor.then}</span>
                  <span>{rule.action}</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{t.logicEditor.copyVariant}:</span>
                    <span className="px-2 py-0.5 rounded bg-secondary text-xs capitalize">
                      {rule.copyVariant}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Add Rule CTA */}
      <motion.button
        variants={fadeInUp}
        className="w-full p-4 rounded-xl border-2 border-dashed border-border hover:border-primary/50 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <Plus className="w-5 h-5" />
        {t.logicEditor.addNewRule}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

export default LogicEditor;
