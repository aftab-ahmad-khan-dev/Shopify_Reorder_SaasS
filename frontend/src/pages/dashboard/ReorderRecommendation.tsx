// src/pages/ReorderRecommendation.tsx
import React from "react";
import {
    BarChart,
    Target,
    MousePointer2,
    Sparkles,
    ShoppingBag,
    Lock,
    Plus,
    CheckCircle,
    ChevronRight
} from "lucide-react";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageStatus } from "@/components/dashboard/PageStatus";
import { useLanguage } from "@/context/LanguageContext";
import { PlanGuard } from "@/components/dashboard/PlanGuard";

interface ReorderRecommendationProps {
    plan?: "Starter" | "Growth";
    lang?: "ja" | "en";
}

const ReorderRecommendation: React.FC<ReorderRecommendationProps> = ({ plan = "Starter", lang = "ja" }) => {
    const { t, language } = useLanguage();

    const getText = (jaText: string, enText: string) => {
        return language === 'ja' ? jaText : enText;
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">
            {/* Header */}
            <PageHeader
                title={getText("再注文レコメンデーション", "Reorder Recommendation")}
                description={getText(
                    "再注文に加えて、関連商品のついで買いを促進し客単価を向上させます。",
                    "Promote additional purchases of related products along with reorders to boost AOV."
                )}
                plan={plan}
            />

            <PageStatus
                status="active"
                location={getText(
                    "再注文リストの下部 (再注文決定後に、自然に追加提案)",
                    "Below Reorder List (Natural upsell after reorder decision)"
                )}
                lastUpdated="2024-03-18 16:45"
            />

            {/* Layer A: Performance Block */}
            <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <BarChart size={18} className="text-purple-400" />
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {getText("おすすめ経由の成果 (過去30日)", "Reorder Recommendation Performance (Last 30 days)")}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Additional Revenue */}
                    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e] flex flex-col gap-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{getText("追加購入売上", "Additional Revenue")}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">¥68,000</span>
                            {plan === 'Starter' && <span className="text-[10px] text-gray-600">(¥55k - ¥80k)</span>}
                        </div>
                    </div>

                    {/* Recommendation Orders */}
                    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e] flex flex-col gap-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{getText("おすすめ経由注文数", "Recommendation Orders")}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">21{getText("件", " cases")}</span>
                        </div>
                    </div>

                    {/* Avg Order Value Lift */}
                    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e] flex flex-col gap-1">
                        <span className="text-[10px] text-gray-500 font-bold uppercase">{getText("平均注文単価の向上", "Avg Order Value Lift")}</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-emerald-400 italic">+¥1,240</span>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Layer B: Strategy Block */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Active Strategies */}
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Target size={18} className="text-purple-400" />
                                <h3 className="text-sm font-bold text-white">{getText("現在有効なおすすめ戦略", "Active Recommendation Strategies")}</h3>
                            </div>
                            <PlanGuard plan={plan} featureName={getText("カスタム戦略の追加", "Add Custom Strategies")}>
                                <button className="flex items-center gap-2 text-[10px] font-bold bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg transition-all">
                                    {plan === 'Starter' && <Lock size={12} />}
                                    <Plus size={14} /> {getText("戦略を追加", "Add Strategy")}
                                </button>
                            </PlanGuard>
                        </div>

                        <div className="space-y-4">
                            {[
                                {
                                    name: getText('同一商品の再注文', 'Same Product Reorder'),
                                    desc: getText('同一商品の買い忘れを防ぎ、再注文率を底上げします', 'Prevents forgotten items, boosts overall reorder rate'),
                                    type: getText('リピート', 'Repeat'),
                                    stats: '+12 orders / +¥24,000'
                                },
                                {
                                    name: getText('消耗品の補充提案', 'Consumables Recommendation'),
                                    desc: getText('消耗品を一緒に提案し、注文単価を向上させます', 'Suggest supplies together to increase order value'),
                                    type: getText('アップセル', 'Upsell'),
                                    stats: '+9 orders / +¥44,000'
                                },
                            ].map((strategy) => (
                                <div key={strategy.name} className="p-5 bg-[#1c1f2a] border border-[#2d313e] rounded-xl group hover:border-purple-500/50 transition-all">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="text-sm font-bold text-white">{strategy.name}</h4>
                                                <span className="text-[8px] font-bold text-purple-400 border border-purple-500/30 px-1.5 py-0.5 rounded">{strategy.type}</span>
                                            </div>
                                            <p className="text-xs text-gray-400 leading-relaxed italic">{strategy.desc}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">
                                                {strategy.stats}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Placement Intent */}
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <MousePointer2 size={18} className="text-gray-400" />
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{getText("配置意図", "Placement Intent")}</h3>
                        </div>
                        <div className="p-4 bg-[#0d0e14] rounded-xl border border-[#1e212b] flex items-center gap-4">
                            <div className="p-2 bg-purple-900/20 rounded-lg">
                                <ShoppingBag size={20} className="text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">{getText("再注文決定後の自然な追加提案", "Natural Upsell Post-Decision")}</p>
                                <p className="text-xs text-gray-500">{getText("顧客が『買うもの』を決めた直後の最もコンバージョンしやすいタイミングで表示します。", "Displayed when conversion is most likely: immediately after the customer decides to buy.")}</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Layer C: Sidebar */}
                <aside className="space-y-6">
                    {/* Industry Templates */}
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{getText("業界テンプレート (Starter準拠)", "Industry Templates (Starter)")}</h3>
                        <div className="p-5 bg-gradient-to-br from-[#1c1f2a] to-[#161922] border border-emerald-500/30 rounded-xl">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="text-3xl bg-[#0d0e14] p-2 rounded-lg shadow-sm">🐕</div>
                                <div>
                                    <p className="text-xs font-bold text-white">{getText("ペット用品ストア設定", "Pet Supplies Store Settings")}</p>
                                    <p className="text-[10px] text-emerald-400 font-bold">14-day cycles active</p>
                                </div>
                            </div>
                            <div className="space-y-2 pt-3 border-t border-[#2d313e]">
                                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <CheckCircle size={12} className="text-emerald-500" />
                                    <span>{getText("ペット用品ストアの統計平均を採用", "Uses pet industry statistical averages")}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                    <CheckCircle size={12} className="text-emerald-500" />
                                    <span>{getText("リピート率が最も安定する推奨設定", "Recommended for stable repeat rates")}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="bg-gradient-to-b from-[#1c1f2a] to-[#11131a] border border-purple-500/30 p-6 rounded-2xl shadow-xl relative overflow-visible">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Sparkles size={16} className="text-purple-400" />
                            {getText("おすすめ戦略を最大化する", "Unlock Advanced Strategies")}
                        </h3>
                        <div className="space-y-4 mb-8">
                            {[
                                getText("購入条件（過去の購入額など）に基づくおすすめの切り替え", "Switch recommendations based on customer segments"),
                                getText("利益率ベースでの商品表示優先順位の自動調整", "Auto-adjust priorities based on profit margins"),
                                getText("購入間隔（14日・30日）に応じた出し分けロジック", "Dynamic logic based on purchase intervals")
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex gap-3 text-xs text-gray-400">
                                    {plan === 'Starter' ? (
                                        <Lock size={12} className="text-gray-600 shrink-0 mt-0.5" />
                                    ) : (
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5"></div>
                                    )}
                                    <p className={plan === 'Starter' ? 'opacity-70' : ''}>{benefit}</p>
                                </div>
                            ))}
                        </div>

                        {plan === 'Starter' ? (
                            <div className="p-4 bg-purple-900/20 border border-purple-500/40 rounded-xl text-center">
                                <p className="text-[10px] text-purple-200 mb-3 font-medium">
                                    {getText("Growthプランで、客単価を最大化する全戦略を利用可能です。", "Unlock all AOV maximization strategies with Growth.")}
                                </p>
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 group">
                                    <span className="text-xs">Optimize with Growth</span>
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ) : (
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                                <span className="text-sm">Manage Strategy Rules</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        )}
                    </section>
                    <div className="p-6 bg-[#11131a] border border-[#1e212b] rounded-2xl">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{getText("ヒント", "Tip")}</p>
                        <p className="text-xs text-gray-400 leading-relaxed italic">
                            {getText(
                                "「おすすめ」は単なるオプションではなく、客単価を設計・向上させるための強力な司令塔です。",
                                "The recommendation engine is not just an option, but a powerful tool to design and grow your Average Order Value."
                            )}
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ReorderRecommendation;
