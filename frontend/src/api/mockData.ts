// Mock data for REORDER OS

export const mockMetrics = {
  totalReorderRevenue: 45892.50,
  reorderRate: 32.5,
  averageTimeBetweenOrders: 28,
  activeCustomers: 1247,
  pendingReminders: 89,
  conversionRate: 18.7,
  revenueGrowth: 12.4,
  ordersToday: 23,
};

export const mockRevenueChart = [
  { month: 'Jul', revenue: 12500, orders: 145 },
  { month: 'Aug', revenue: 18200, orders: 198 },
  { month: 'Sep', revenue: 22100, orders: 245 },
  { month: 'Oct', revenue: 28900, orders: 312 },
  { month: 'Nov', revenue: 35200, orders: 389 },
  { month: 'Dec', revenue: 45892, orders: 456 },
];

export const mockRecentActivity = [
  {
    id: '1',
    type: 'reorder',
    customer: 'Sarah Johnson',
    product: 'Premium Dog Food (30lb)',
    amount: 89.99,
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    type: 'reminder_sent',
    customer: 'Mike Peterson',
    product: 'Cat Litter Bundle',
    timestamp: '15 minutes ago',
  },
  {
    id: '3',
    type: 'reorder',
    customer: 'Emily Chen',
    product: 'Vitamin Supplements (90ct)',
    amount: 45.00,
    timestamp: '32 minutes ago',
  },
  {
    id: '4',
    type: 'subscription_started',
    customer: 'David Kim',
    product: 'Monthly Treat Box',
    amount: 29.99,
    timestamp: '1 hour ago',
  },
  {
    id: '5',
    type: 'reorder',
    customer: 'Lisa Thompson',
    product: 'Organic Bird Seed (5lb)',
    amount: 24.99,
    timestamp: '2 hours ago',
  },
];

export const mockRules = [
  {
    id: 'rule_1',
    name: 'High-Value Customer Reminder',
    condition: 'Customer lifetime value > $500',
    action: 'Send personalized email 3 days before expected reorder',
    priority: 1,
    enabled: true,
    copyVariant: 'premium',
  },
  {
    id: 'rule_2',
    name: 'First Reorder Nudge',
    condition: 'Days since first order = 14',
    action: 'Show reorder widget with 10% discount',
    priority: 2,
    enabled: true,
    copyVariant: 'friendly',
  },
  {
    id: 'rule_3',
    name: 'Subscription Conversion',
    condition: 'Reordered same product 3+ times',
    action: 'Offer subscription with 15% savings',
    priority: 3,
    enabled: false,
    copyVariant: 'value',
  },
];

export const mockTemplates = [
  {
    id: 'tpl_pet',
    name: 'Pet Supplies',
    description: 'Optimized for consumable pet products with typical 30-60 day reorder cycles',
    industry: 'Pet',
    icon: '🐾',
    rules: 5,
    avgLift: '+24%',
  },
  {
    id: 'tpl_beauty',
    name: 'Beauty & Skincare',
    description: 'Perfect for skincare routines and beauty products with 45-90 day cycles',
    industry: 'Beauty',
    icon: '✨',
    rules: 4,
    avgLift: '+31%',
  },
  {
    id: 'tpl_supplements',
    name: 'Health Supplements',
    description: 'Tailored for vitamins and supplements with predictable consumption patterns',
    industry: 'Health',
    icon: '💊',
    rules: 6,
    avgLift: '+28%',
  },
  {
    id: 'tpl_food',
    name: 'Food & Beverage',
    description: 'Designed for specialty foods, coffee, and consumable beverages',
    industry: 'Food',
    icon: '☕',
    rules: 4,
    avgLift: '+19%',
  },
];

export const mockCopyVariants = [
  {
    id: 'copy_1',
    name: 'Friendly Reminder',
    subject: 'Time to stock up, {{first_name}}! 🛒',
    preview: "Hey {{first_name}}, running low on {{product_name}}? We've got you covered!",
    language: 'en',
    location: 'US',
  },
  {
    id: 'copy_2',
    name: 'Premium Touch',
    subject: 'Your {{product_name}} awaits',
    preview: 'Dear {{first_name}}, ensure you never run out of your favorite {{product_name}}.',
    language: 'en',
    location: 'US',
  },
  {
    id: 'copy_3',
    name: 'Value Focused',
    subject: 'Save 10% on your next {{product_name}} order',
    preview: "{{first_name}}, reorder now and save! Your exclusive discount is waiting.",
    language: 'en',
    location: 'US',
  },
];

export const mockAnalytics = {
  incrementalRevenue: 12450.00,
  reorderConversions: 234,
  emailOpenRate: 42.3,
  widgetClickRate: 8.7,
  roiMultiplier: 15.2,
  topProducts: [
    { name: 'Premium Dog Food (30lb)', reorders: 145, revenue: 13045.55 },
    { name: 'Cat Litter Bundle', reorders: 98, revenue: 5879.02 },
    { name: 'Vitamin Supplements (90ct)', reorders: 87, revenue: 3915.00 },
    { name: 'Monthly Treat Box', reorders: 76, revenue: 2279.24 },
    { name: 'Organic Bird Seed (5lb)', reorders: 54, revenue: 1349.46 },
  ],
  channelPerformance: [
    { channel: 'Email', conversions: 156, rate: 18.2 },
    { channel: 'Widget', conversions: 78, rate: 12.4 },
    { channel: 'SMS', conversions: 45, rate: 22.1 },
    { channel: 'Push', conversions: 23, rate: 9.8 },
  ],
};

export const mockNotifications = [
  {
    id: 'notif_1',
    type: 'email',
    name: 'Reorder Reminder',
    trigger: '3 days before predicted reorder date',
    enabled: true,
    sent: 1247,
    opened: 527,
  },
  {
    id: 'notif_2',
    type: 'push',
    name: 'Low Stock Alert',
    trigger: 'When reorder date passes without order',
    enabled: true,
    sent: 456,
    opened: 189,
  },
  {
    id: 'notif_3',
    type: 'sms',
    name: 'Subscription Offer',
    trigger: 'After 3rd reorder of same product',
    enabled: false,
    sent: 0,
    opened: 0,
  },
];

export const mockReorderHistory = [
  {
    id: 'order_1',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    product: 'Premium Dog Food (30lb)',
    amount: 89.99,
    reorderNumber: 4,
    date: '2024-12-26',
    source: 'Email Reminder',
  },
  {
    id: 'order_2',
    customer: 'Mike Peterson',
    email: 'mike.p@email.com',
    product: 'Cat Litter Bundle',
    amount: 59.99,
    reorderNumber: 2,
    date: '2024-12-25',
    source: 'Widget',
  },
  {
    id: 'order_3',
    customer: 'Emily Chen',
    email: 'emily.c@email.com',
    product: 'Vitamin Supplements (90ct)',
    amount: 45.00,
    reorderNumber: 6,
    date: '2024-12-25',
    source: 'Direct',
  },
];
