// src/pages/AnalyticsRoi.tsx
import React from "react";
import {
    BarChart3,
    DollarSign,
    TrendingUp,
    RefreshCw,
    Zap,
    Info,
    BrainCircuit,
    ShieldCheck,
    Lock,
    ChevronRight,
    Settings2,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "@/components/dashboard/PageHeader";

interface AnalyticsRoiProps {
    plan?: "Starter" | "Growth";
    setActiveTab?: (tab: string) => void;
}


const AnalyticsRoi: React.FC<AnalyticsRoiProps> = ({
    plan = "Starter",
    setActiveTab = () => { },
}) => {
    const { language } = useLanguage();

    const getText = (ja: string, en: string) =>
        language === "ja" ? ja : en;


    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">
            <PageHeader
                title={getText("分析・ROI", "Analytics & ROI")}
                description={getText("再注文インフラが生み出している具体的な売上貢献と、投資対効果（ROI）を可視化します。", "Visualize reorder revenue attribution and Return on Investment (ROI).")}
                plan={plan}
            />

            {/* ① ROI Overview */}
            <section className="space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 size={16} className="text-purple-400" />
                    {getText("ROI 概要", "ROI Overview")}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: getText('再注文売上', 'Attributed Revenue'), value: '¥1,248,000', icon: <DollarSign size={14} />, tooltip: getText('再注文UIを経由した注文の総額です。', 'Total value of orders via reorder UI.') },
                        { label: getText('追加売上', 'Incremental Revenue'), value: '¥342,000', icon: <TrendingUp size={14} />, tooltip: getText('再注文UIがなければ発生しなかったと推定される売上です。', 'Estimated revenue that wouldn\'t have occurred without the UI.') },
                        { label: getText('再注文率', 'Reorder Rate'), value: '22.5%', icon: <RefreshCw size={14} />, tooltip: getText('注文全体に対する再注文の割合です。', 'Percentage of repeat orders vs total.') },
                        { label: 'ROI', value: '12.4x', icon: <Zap size={14} className="text-emerald-400" />, tooltip: getText('アプリ利用料に対する追加売上の倍率です。', 'Ratio of incremental revenue to app fees.') },
                    ].map((stat, i) => (
                        <div key={i} className="bg-[#11131a] border border-[#1e212b] p-5 rounded-2xl relative group">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter flex items-center gap-1.5">
                                    {stat.icon} {stat.label}
                                </p>
                                <div className="group/tooltip relative">
                                    <Info size={12} className="text-gray-700 cursor-help" />
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#1c1f2a] border border-[#2d313e] rounded-lg text-[10px] text-gray-400 opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl">
                                        {stat.tooltip}
                                    </div>
                                </div>
                            </div>
                            <p className={`text-2xl font-bold ${stat.label === 'ROI' ? 'text-emerald-400 italic' : 'text-white'}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* ② Revenue Attribution Breakdown */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{getText("機能別の売上貢献度", "Revenue Attribution Breakdown")}</h3>
                            <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold">
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>{getText("売上", "Revenue")}</div>
                                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div>{getText("件数", "Orders")}</div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {[
                                { name: getText('ワンクリック再注文', 'One-click Reorder'), revenue: '¥773,760', orders: 252, percent: 62, color: 'bg-emerald-500' },
                                { name: getText('カスタム再注文リスト', 'Custom Reorder List'), revenue: '¥349,440', orders: 114, percent: 28, color: 'bg-purple-500' },
                                { name: getText('再注文レコメンデーション', 'Recommendation'), revenue: '¥124,800', orders: 42, percent: 10, color: 'bg-blue-500' },
                            ].map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{item.name}</p>
                                            <p className="text-[10px] text-gray-500">{item.revenue} ({item.orders} cases)</p>
                                        </div>
                                        <p className="text-xs font-bold text-white">{item.percent}%</p>
                                    </div>
                                    <div className="h-2 w-full bg-[#0d0e14] rounded-full overflow-hidden">
                                        <div className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${item.percent}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ③ Performance Over Time (Visual Mockup) */}
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{getText("時系列パフォーマンス", "Performance Over Time")}</h3>
                            <div className="flex bg-[#0d0e14] rounded-lg p-1 border border-[#1e212b]">
                                {['Daily', 'Weekly', 'Monthly'].map(range => (
                                    <button key={range} className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${range === 'Weekly' ? 'bg-[#1c1f2a] text-white' : 'text-gray-600'}`}>{range}</button>
                                ))}
                            </div>
                        </div>
                        <div className="aspect-[21/9] flex items-end justify-between gap-1 pt-8 px-2 relative">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-4 opacity-5">
                                {[1, 2, 3, 4].map(line => <div key={line} className="w-full border-t border-white"></div>)}
                            </div>
                            {[35, 45, 30, 55, 65, 80, 70, 85, 95, 80, 90, 100].map((height, i) => (
                                <div key={i} className="flex-1 group relative">
                                    <div className="bg-purple-600/20 group-hover:bg-purple-500/40 w-full rounded-t-sm transition-all absolute bottom-0 left-0 benefit-bar" style={{ height: `${height}%` }}></div>
                                    <div className="bg-emerald-400 group-hover:bg-emerald-300 w-full h-1 rounded-full relative z-10 transition-all benefit-dot" style={{ bottom: `${height}%` }}></div>
                                    {/* Tooltip on hover */}
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-[#1c1f2a] border border-[#2d313e] p-2 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                                        <p className="text-white font-bold">Week {i + 1}</p>
                                        <p className="text-emerald-400 italic">22.5% Reorder Rate</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#1e212b] flex justify-between">
                            <p className="text-[10px] text-gray-500 italic">※ {getText("再注文UI有効化後のデータのみを表示しています", "Displaying data post-UI activation only.")}</p>
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-400 uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> {getText("再注文率", "Reorder Rate")}</span>
                                <span className="flex items-center gap-1.5 text-[9px] font-bold text-purple-400 uppercase tracking-widest"><div className="w-1.5 h-1.5 rounded bg-purple-600"></div> {getText("売上", "Revenue")}</span>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Sidebar: Insights & Logic Explanation */}
                <aside className="space-y-6">
                    {/* ④ What This Means for Your Store (Rule-based Insights) */}
                    <section className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <BrainCircuit size={18} className="text-emerald-400" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">{getText("成果の分析・解釈", "Insights")}</h3>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs text-gray-300 leading-relaxed font-medium">
                                現在、REORDER OSは<br />
                                <span className="text-emerald-400 font-bold">既存顧客からの売上を安定的に生み出しています。</span>
                            </p>
                            <p className="text-xs text-gray-400 leading-relaxed italic">
                                {getText(
                                    "再注文率 20% 超えは、非常に高い水準です。新規広告を増やさずにLTVを伸ばせている健全な状態と言えます。",
                                    "A reorder rate over 20% is excellent. LTV is growing organically without additional ad spend."
                                )}
                            </p>
                        </div>
                    </section>

                    {/* ⑤ ROI Logic Transparency */}
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck size={18} className="text-gray-500" />
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{getText("ROI 算出ロジック", "ROI Logic")}</h3>
                        </div>
                        <div className="space-y-3 mb-6">
                            <p className="text-[10px] text-gray-400 italic leading-relaxed">
                                {getText(
                                    "このROIは、「REORDER OSがなかった場合に起きなかった注文」を保守的に推定した結果です。",
                                    "This ROI is based on a conservative estimate of orders that wouldn't have occurred without REORDER OS."
                                )}
                            </p>
                            <div className="p-3 bg-[#0d0e14] rounded-xl border border-[#1e212b]">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="text-[9px] text-gray-500 font-bold uppercase">{getText("アトリビューション期間", "Attribution Window")}</p>
                                    <span className="text-[9px] font-bold text-white">30 {getText("日間", "Days")}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-[9px] text-gray-500 font-bold uppercase">{getText("推定モード", "Estimate Mode")}</p>
                                    <span className="text-[9px] font-bold text-emerald-400">{getText("保守的 (推奨)", "Conservative")}</span>
                                </div>
                            </div>
                        </div>

                        {plan === 'Starter' ? (
                            <div className="pt-4 border-t border-[#1e212b]">
                                <p className="text-[9px] text-purple-300 font-bold uppercase mb-2">{getText("Growth で解放される分析", "Advanced in Growth")}</p>
                                <div className="space-y-2 opacity-60">
                                    {['SKU別再注文率レポート', '顧客セグメント別ROI', '算出ロジックのカスタマイズ'].map(item => (
                                        <div key={item} className="flex items-center gap-2 text-[9px] text-gray-500">
                                            <Lock size={10} /> <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="w-full mt-4 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-400 font-bold py-2 rounded-lg text-[10px] transition-all flex items-center justify-center gap-2">
                                    {getText("高度な分析機能を詳しく見る", "Explore Advanced Analytics")} <ChevronRight size={12} />
                                </button>
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-[#1e212b] space-y-3">
                                <button className="w-full bg-[#1c1f2a] hover:bg-[#232735] border border-[#2d313e] text-white font-bold py-2 rounded-lg text-[10px] transition-all flex items-center justify-center gap-2">
                                    <Settings2 size={12} /> {getText("算出設定を編集", "Edit Calculation Settings")}
                                </button>
                            </div>
                        )}
                    </section>

                    <div className="p-6 bg-[#11131a] border border-[#1e212b] rounded-2xl">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{getText("ヒント", "Tip")}</p>
                        <p className="text-xs text-gray-400 leading-relaxed italic">
                            {getText(
                                "「ROIが見える」ことは、「自信を持って投資を続けられる」ことと同義です。数字が落ちてきたら、ロジックを微調整するタイミングです。",
                                "Visibility into ROI means confidence in your investment. If numbers dip, it's time to tweak your reorder logic."
                            )}
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default AnalyticsRoi;
