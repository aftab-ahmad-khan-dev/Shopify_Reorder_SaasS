import React from "react";
import {
    Sparkle,
    CheckCircle,
    ArrowRight,
    Zap,
    Settings2,
    ChevronRight,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageStatus } from "@/components/dashboard/PageStatus";
import { PlanGuard } from "@/components/dashboard/PlanGuard";

interface IndustryTemplateProps {
    plan?: "Starter" | "Growth";
    setActiveTab?: (tab: string) => void;
}

const IndustryTemplate: React.FC<IndustryTemplateProps> = ({
    plan = "Starter",
    setActiveTab = () => { },
}) => {
    const { language } = useLanguage();

    // ✅ SAME helper as Overview
    const getText = (ja: string, en: string) =>
        language === "ja" ? ja : en;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            {/* ================= Header ================= */}
            <PageHeader
                title={getText("業界テンプレート", "Industry Templates")}
                description={getText(
                    "ビジネスモデルに最適化された「再注文の考え方」を選択し、一瞬でストアのインフラを整えます。",
                    "Select industry-optimized reorder logic to instantly align your store's infrastructure."
                )}
                plan={plan}
            />

            <PageStatus
                status="active"
                location={getText("ストア全体ロジック", "Store-wide Logic")}
                lastUpdated="2024-03-20 12:00"
            />

            {/* ================= Active Template ================= */}
            <section className="bg-gradient-to-br from-[#1c1f2a] to-[#11131a] border border-emerald-500/30 p-8 rounded-2xl shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-5">
                    <Sparkle size={120} className="text-emerald-400" />
                </div>

                <div className="relative z-10">
                    <div className="mb-6">
                        <span className="px-2 py-0.5 bg-emerald-500 text-[#0d0e14] text-[10px] font-bold rounded uppercase tracking-widest">
                            {getText("現在のアクティブ設定", "Active Template")}
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-[#0d0e14] rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-emerald-500/20">
                                🐕
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-1">
                                    Pet Supplies / Consumables
                                </h3>
                                <p className="text-sm text-emerald-400/80 italic">
                                    {getText(
                                        "消耗品の周期的な再購入に最適化されたロジック",
                                        "Logic optimized for recurring consumable replenishment"
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 min-w-[300px]">
                            {[
                                getText(
                                    "再注文ボタン表示期間：30日〜90日",
                                    "Reorder visibility: 30–90 days"
                                ),
                                getText(
                                    "在庫切れ商品の自動非表示ロジック",
                                    "Auto-hide out-of-stock items"
                                ),
                                getText(
                                    "数量変更・一括カート追加を有効化",
                                    "Quantity adjustment & bulk add active"
                                ),
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                                    <CheckCircle size={14} className="text-emerald-500" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= Templates Grid ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                        id: "beauty",
                        icon: "💄",
                        name: "Beauty / Cosmetics",
                        optimized: getText(
                            "中長期の再購入サイクル / 季節変動",
                            "Medium cycles / Seasonal variance"
                        ),
                        logic: getText('セット・バンドル提案を優先的に上位配置し、ついで買いを促進します。', 'Prioritizes bundles to encourage cross-selling alongside reorders.')

                    },
                    {
                        id: "apparel",
                        icon: "👕",
                        name: "Apparel / Fashion",
                        optimized: getText(
                            "低頻度の再購入 / サイズ・カラー感度",
                            "Low frequency / Size sensitivity"
                        ),
                        logic: getText('特定コレクションへの絞り込みと、返品抑制のための表示制限を強化します。', 'Narrows focus to specific collections and restricts visibility to minimize returns.')
                    },
                    {
                        id: "b2b",
                        icon: "🏢",
                        name: "B2B / Wholesale",
                        optimized: getText('大量注文 / 数量優先 / 迅速な発注', 'Bulk orders / Quantity-first / Rapid order'),
                        logic: getText('レコメンドを最小限に抑え、クイックオーダーフォーム形式のUIを構築します。', 'Minimizes upsells, focusing on a high-efficiency bulk order form UI.')
                    },
                    {
                        id: "other",
                        icon: "📦",
                        name: "Standard Retail",
                        optimized: getText('汎用的な物販 / 標準的な再購入体験', 'General retail / Standard replenishment'),
                        logic: getText('もっとも安定して機能するベストプラクティスな表示周期を採用します。', 'Adopts best-practice cycles that function reliably for most retail goods.')
                    },
                ].map((tmpl) => (
                    <div
                        key={tmpl.id}
                        className="group bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl hover:border-purple-500/50 transition-all cursor-pointer"
                    >
                        <div className="flex gap-5">
                            <div className="text-4xl p-2 bg-[#0d0e14] rounded-xl border border-[#1e212b] group-hover:scale-110 transition-transform">
                                {tmpl.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-2">
                                    <h4 className="font-bold text-white text-lg">
                                        {tmpl.name}
                                    </h4>
                                    <ArrowRight size={16} className="text-gray-600 group-hover:text-purple-400" />
                                </div>
                                <div className="inline-block px-2 py-0.5 bg-purple-900/20 text-purple-300 text-[10px] font-bold rounded mb-3">
                                    {tmpl.optimized}
                                </div>
                                <p className="text-xs text-gray-500 italic line-clamp-2">
                                    {tmpl.logic}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ================= Growth CTA ================= */}
            <section className="bg-[#11131a] border border-[#1e212b] p-8 rounded-2xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4 text-purple-400">
                            <Zap size={20} fill="currentColor" />
                            <h3 className="text-lg font-bold text-white">
                                {getText(
                                    "ロジックを自社専用にカスタマイズ",
                                    "Customize This Industry Logic"
                                )}
                            </h3>
                        </div>

                        <p className="text-sm text-gray-400 mb-6">
                            {getText(
                                "業界テンプレートは最適なスタート地点ですが、真の最適化には自社データの反映が不可欠です。Growthプランでは、各テンプレートの閾値（例: 90日）や判定順序を自在に編集し、Thinking Logic Editor と連動させることが可能です。",
                                "Templates are a great start, but true optimization requires your data. In Growth, you can freely edit thresholds (e.g. 90 days) and logic order, fully integrated with the Thinking Logic Editor."
                            )}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase"><CheckCircle size={12} className="text-purple-500" /> {getText("閾値の調整", "Edit thresholds")}</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase"><CheckCircle size={12} className="text-purple-500" /> {getText("表示ルールの変更", "Modify visibility")}</span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase"><CheckCircle size={12} className="text-purple-500" /> {getText("独自ロジックの追加", "Custom logic blocks")}</span>
                        </div>
                    </div>

                    <PlanGuard
                        plan={plan}
                        featureName={getText(
                            "ロジックの詳細カスタマイズ",
                            "Advanced Logic Customization"
                        )}
                    >
                        <button
                            onClick={() => setActiveTab("thinking-logic")}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3"
                        >
                            <Settings2 size={20} />
                            Optimize with Growth
                            <ChevronRight size={18} />
                        </button>
                    </PlanGuard>
                </div>
            </section>
        </div>
    );
};

export default IndustryTemplate;
