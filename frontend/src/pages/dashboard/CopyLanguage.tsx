import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Languages, 
  Plus, 
  Edit3, 
  Copy, 
  Trash2,
  Globe,
  Mail,
} from 'lucide-react';
import { mockCopyVariants } from '@/api/mockData';

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

export const CopyLanguage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState('en');
  const [editingId, setEditingId] = useState<string | null>(null);

  const languages = [
    { code: 'en', name: t.copyLanguage.languages.english, flag: '🇺🇸' },
    { code: 'es', name: t.copyLanguage.languages.spanish, flag: '🇪🇸' },
    { code: 'fr', name: t.copyLanguage.languages.french, flag: '🇫🇷' },
    { code: 'de', name: t.copyLanguage.languages.german, flag: '🇩🇪' },
  ];

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
          <h1 className="text-2xl font-bold">{t.copyLanguage.title}</h1>
          <p className="text-muted-foreground mt-1">
            {t.copyLanguage.subtitle}
          </p>
        </div>
        <Button variant="gradient" className="gap-2">
          <Plus className="w-4 h-4" />
          {t.copyLanguage.addVariant}
        </Button>
      </motion.div>

      {/* Language Selector */}
      <motion.div variants={fadeInUp} className="flex items-center gap-2 flex-wrap">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              selectedLang === lang.code
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            <span>{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
          <Globe className="w-4 h-4" />
          <span className="text-sm">{t.copyLanguage.addLanguage}</span>
        </button>
      </motion.div>

      {/* Copy Variants */}
      <motion.div variants={fadeInUp} className="space-y-4">
        {mockCopyVariants.map((variant, index) => (
          <motion.div
            key={variant.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`glass-card rounded-xl p-5 ${
              editingId === variant.id ? 'border-primary/30' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{variant.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {variant.language.toUpperCase()} • {variant.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setEditingId(editingId === variant.id ? null : variant.id)}
                >
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

            {editingId === variant.id ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.copyLanguage.subjectLine}</label>
                  <Input defaultValue={variant.subject} />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">{t.copyLanguage.previewText}</label>
                  <Textarea defaultValue={variant.preview} rows={3} />
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Button variant="outline" size="sm" onClick={() => setEditingId(null)}>
                    {t.copyLanguage.cancel}
                  </Button>
                  <Button variant="gradient" size="sm" onClick={() => setEditingId(null)}>
                    {t.copyLanguage.saveChanges}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.copyLanguage.subject}</p>
                  <p className="text-sm bg-secondary/50 rounded-lg p-2">{variant.subject}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t.copyLanguage.preview}</p>
                  <p className="text-sm bg-secondary/50 rounded-lg p-2">{variant.preview}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Variables Reference */}
      <motion.div variants={fadeInUp} className="glass-card rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <Languages className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">{t.copyLanguage.availableVariables}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            '{{first_name}}',
            '{{product_name}}',
            '{{last_order_date}}',
            '{{discount_code}}',
            '{{store_name}}',
          ].map((variable) => (
            <button
              key={variable}
              className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {variable}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CopyLanguage;
