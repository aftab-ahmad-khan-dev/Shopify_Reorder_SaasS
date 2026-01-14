// src/components/PlanGuard.tsx
import React, { useState } from "react";
import { Lock, Zap, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PlanGuardProps {
  plan: "Starter" | "Growth";
  featureName: string;
  children: React.ReactNode;
}

export const PlanGuard: React.FC<PlanGuardProps> = ({ plan, featureName, children }) => {
  const { language } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const getText = (jaText: string, enText: string) => (language === "ja" ? jaText : enText);

  // Growth plan has full access
  if (plan === "Growth") return <>{children}</>;

  return (
    <div className="relative">
      {/* Overlay clickable area */}
      <div className="relative group cursor-pointer" onClick={() => setShowModal(true)}>
        <div className="opacity-60 pointer-events-none grayscale-[0.2] blur-[0.5px]">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-[#0d0e14]/60 p-1.5 rounded-full border border-purple-500/30 text-purple-400 backdrop-blur-sm">
            <Lock size={14} />
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#000]/70 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-[#1c1f2a] border border-[#2d313e] p-8 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] text-center max-w-sm w-full animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-14 h-14 bg-[#2d1b54] text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Lock size={28} />
            </div>

            <h4 className="text-xl font-bold text-white mb-3 leading-tight">
              {featureName} {getText("はGrowthプラン専用です", "is only available in Growth plan")}
            </h4>

            <p className="text-sm text-gray-400 mb-8 leading-relaxed">
              {getText(
                "高度な条件分岐やロジックのカスタマイズを有効化して、リピート率を最大化しましょう。",
                "Unlock advanced rules and logic customization to maximize repeat rate."
              )}
            </p>

            <button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-4 rounded-xl transition-all font-bold shadow-lg shadow-purple-500/20">
              <Zap size={18} fill="currentColor" />
              {getText("Growthプランへアップグレード", "Upgrade to Growth")}
            </button>

            <p className="mt-4 text-[10px] text-gray-500">
              <a
                href="https://ai.google.dev/gemini-api/docs/billing"
                target="_blank"
                className="underline hover:text-gray-400"
              >
                {getText("お支払い設定の詳細はこちら", "See billing details")}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

interface StarterInfoProps {
  title: string;
  description: string;
}

export const StarterInfo: React.FC<StarterInfoProps> = ({ title, description }) => {
  const { language } = useLanguage();

  const getText = (jaText: string, enText: string) => (language === "ja" ? jaText : enText);

  return (
    <div className="bg-[#161922] border border-[#2d313e] p-4 rounded-lg">
      <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
        {title}
      </h5>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
};
