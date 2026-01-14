import React, { createContext, useContext, useState, ReactNode } from 'react';

type PlanType = 'starter' | 'growth';

interface Shop {
  id: string;
  name: string;
  domain: string;
  plan: PlanType;
  trialEndsAt?: string;
  currency: string;
  timezone: string;
}

interface ShopContextType {
  shop: Shop | null;
  plan: PlanType;
  isPlanGrowth: boolean;
  isTrialing: boolean;
  upgradePlan: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const mockShop: Shop = {
  id: 'shop_abc123',
  name: 'Premium Pet Supplies',
  domain: 'premium-pet-supplies.myshopify.com',
  plan: 'starter',
  trialEndsAt: '2025-01-15',
  currency: 'USD',
  timezone: 'America/New_York',
};

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shop, setShop] = useState<Shop>(mockShop);

  const upgradePlan = () => {
    setShop((prev) => ({ ...prev, plan: 'growth' }));
  };

  const isTrialing = shop.trialEndsAt 
    ? new Date(shop.trialEndsAt) > new Date() 
    : false;

  return (
    <ShopContext.Provider
      value={{
        shop,
        plan: shop.plan,
        isPlanGrowth: shop.plan === 'growth',
        isTrialing,
        upgradePlan,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
