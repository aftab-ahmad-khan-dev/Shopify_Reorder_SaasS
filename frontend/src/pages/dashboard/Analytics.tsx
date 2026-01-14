import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  TrendingUp, 
  DollarSign, 
  Mail,
  MousePointer,
  Target,
  HelpCircle,
} from 'lucide-react';
import { mockAnalytics } from '@/api/mockData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

const COLORS = ['hsl(252, 100%, 69%)', 'hsl(280, 100%, 65%)', 'hsl(199, 89%, 48%)', 'hsl(142, 76%, 48%)'];

interface MetricWithTooltipProps {
  title: string;
  value: string;
  tooltip: string;
  icon: React.ElementType;
}

const MetricWithTooltip: React.FC<MetricWithTooltipProps> = ({ title, value, tooltip, icon: Icon }) => (
  <motion.div variants={fadeInUp} className="metric-card">
    <div className="flex items-start justify-between mb-3">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <UITooltip>
        <TooltipTrigger>
          <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
        </TooltipTrigger>
        <TooltipContent side="left" className="max-w-xs">
          <p className="text-sm">{tooltip}</p>
        </TooltipContent>
      </UITooltip>
    </div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground mt-1">{title}</p>
  </motion.div>
);

export const Analytics: React.FC = () => {
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
        <h1 className="text-2xl font-bold">{t.analytics.title}</h1>
        <p className="text-muted-foreground mt-1">
          {t.analytics.subtitle}
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricWithTooltip
          title={t.analytics.metrics.incrementalRevenue.title}
          value={`$${mockAnalytics.incrementalRevenue.toLocaleString()}`}
          tooltip={t.analytics.metrics.incrementalRevenue.tooltip}
          icon={DollarSign}
        />
        <MetricWithTooltip
          title={t.analytics.metrics.reorderConversions.title}
          value={mockAnalytics.reorderConversions.toString()}
          tooltip={t.analytics.metrics.reorderConversions.tooltip}
          icon={TrendingUp}
        />
        <MetricWithTooltip
          title={t.analytics.metrics.emailOpenRate.title}
          value={`${mockAnalytics.emailOpenRate}%`}
          tooltip={t.analytics.metrics.emailOpenRate.tooltip}
          icon={Mail}
        />
        <MetricWithTooltip
          title={t.analytics.metrics.widgetClickRate.title}
          value={`${mockAnalytics.widgetClickRate}%`}
          tooltip={t.analytics.metrics.widgetClickRate.tooltip}
          icon={MousePointer}
        />
      </div>

      {/* ROI Highlight */}
      <motion.div 
        variants={fadeInUp}
        className="gradient-border rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
              <Target className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{t.analytics.roi.title}</p>
              <p className="text-4xl font-bold gradient-text">{mockAnalytics.roiMultiplier}x</p>
            </div>
          </div>
          <p className="text-muted-foreground text-center md:text-right max-w-sm">
            {t.analytics.roi.description.replace('{multiplier}', mockAnalytics.roiMultiplier.toString())}
          </p>
        </div>
      </motion.div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div variants={fadeInUp} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">{t.analytics.charts.topProducts}</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={mockAnalytics.topProducts.slice(0, 5)} 
                layout="vertical"
                margin={{ left: 10, right: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 18%)" horizontal={false} />
                <XAxis 
                  type="number"
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  stroke="hsl(215, 20%, 55%)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  width={140}
                  tickFormatter={(value) => value.length > 18 ? value.slice(0, 18) + '...' : value}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 8%)',
                    border: '1px solid hsl(217, 33%, 18%)',
                    borderRadius: '8px',
                    fontSize: '13px',
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, t.analytics.charts.revenue]}
                />
                <Bar 
                  dataKey="revenue" 
                  fill="hsl(252, 100%, 69%)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Channel Performance */}
        <motion.div variants={fadeInUp} className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-4">{t.analytics.charts.channelPerformance}</h3>
          <div className="h-[280px] flex items-center">
            <div className="w-1/2 h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockAnalytics.channelPerformance}
                    dataKey="conversions"
                    nameKey="channel"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    paddingAngle={4}
                  >
                    {mockAnalytics.channelPerformance.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(222, 47%, 8%)',
                      border: '1px solid hsl(217, 33%, 18%)',
                      borderRadius: '8px',
                      fontSize: '13px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-1/2 space-y-3">
              {mockAnalytics.channelPerformance.map((channel, index) => (
                <div key={channel.channel} className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{channel.channel}</p>
                    <p className="text-xs text-muted-foreground">
                      {channel.conversions} {t.analytics.charts.conversions} ({channel.rate}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Analytics;
