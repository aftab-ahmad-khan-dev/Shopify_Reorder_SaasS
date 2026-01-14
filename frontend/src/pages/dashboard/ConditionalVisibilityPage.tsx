import React from "react";
import {
    Shield,
    EyeOff,
    Users,
    TrendingUp,
    Filter,
    CheckCircle,
    MousePointer2,
    Sparkles,
    ChevronRight,
    Lock
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageStatus } from "@/components/dashboard/PageStatus";
import { PlanGuard } from "@/components/dashboard/PlanGuard";


interface OverviewProps {
    plan?: "Starter" | "Growth";
    lang?: "ja" | "en";
    setActiveTab?: (tab: string) => void;
}

const ConditionalVisibilityPage: React.FC<OverviewProps> = ({
    plan = "Starter",
    lang = "ja",
    setActiveTab = () => { },
}) => {
    const { t, language } = useLanguage();

    const getText = (jaText: string, enText: string) => {
        return language === 'ja' ? jaText : enText;
    };

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">

            {/* ================= HEADER ================= */}
            <PageHeader
                title={getText("条件付き表示設定", "Conditional Visibility")}
                description={getText(
                    "ボタンを表示する「タイミング」と「対象者」を定義し、無駄な露出を抑えて顧客体験を最適化します。",
                    "Optimize UX by defining timing and target audience to suppress unnecessary reorder exposure."
                )}
                plan={plan}
            />

            <PageStatus
                status="active"
                location={getText("ストア全域（適用範囲）", "Store-wide (Applied Scope)")}
                lastUpdated="2024-03-15 09:00"
            />

            {/* ================= IMPACT SUMMARY ================= */}
            <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                    <Shield size={18} className="text-purple-400" />
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {getText("条件制御の効果 (過去30日)", "Visibility Control Impact (Last 30 days)")}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Stat
                        icon={<EyeOff size={14} />}
                        label={getText("ボタン非表示回数", "Button Hidden Count")}
                        value="1,248"
                        note={getText("不要な露出を抑制", "Suppressed Exposure")}
                        highlight
                    />

                    <Stat
                        icon={<Users size={14} />}
                        label={getText("対象外ユーザー割合", "Non-eligible Users")}
                        value="32%"
                        note={getText("ストア全訪問者比", "vs Total Visitors")}
                    />

                    <Stat
                        label={getText("不要クリック削減率", "Invalid Click Reduction")}
                        value="-18%"
                        note={getText("推計値", "Estimated")}
                        accent
                    />
                </div>
            </section>

            {/* ================= MAIN GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ================= RULES ================= */}
                <div className="lg:col-span-2 space-y-6">
                    <section className="bg-[#11131a] border border-[#1e212b] rounded-2xl">

                        <div className="p-5 border-b border-[#1e212b] bg-[#161922] rounded-t-2xl flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Filter size={18} className="text-purple-400" />
                                <h3 className="text-sm font-bold text-white">
                                    {getText("現在の表示ルール（誰に・いつ）", "Active Visibility Rules")}
                                </h3>
                            </div>

                            <PlanGuard plan={plan} featureName={getText("表示条件の編集", "Edit Visibility Conditions")}>
                                <button className="flex items-center gap-2 text-[10px] font-bold bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg">
                                    {plan === "Starter" && <Lock size={12} />}
                                    {getText("条件を追加", "Add Condition")}
                                </button>
                            </PlanGuard>
                        </div>

                        {[
                            {
                                name: getText("直近購入者条件", "Active Buyer Condition"),
                                desc: getText("購入後 7日 ~ 90日経過した顧客のみに表示", "7–90 days after purchase"),
                                purpose: getText("無関係ユーザーへの露出防止", "Prevent exposure to irrelevant users")
                            },
                            {
                                name: getText("定期便未契約者のみ", "Non-subscribers Only"),
                                desc: getText("Subscription Tags がない顧客に限定", "Customers without subscription tags"),
                                purpose: getText("定期便とのUX衝突回避", "Avoid UX conflict with subscriptions")
                            }
                        ].map(rule => (
                            <RuleItem key={rule.name} {...rule} />
                        ))}

                        <div className="p-4 bg-purple-900/10 border-t border-purple-500/20 rounded-b-2xl">
                            <p className="text-[10px] text-purple-200">
                                {getText(
                                    "すべての条件を満たす場合のみ再注文ボタンが表示されます。",
                                    "The reorder button appears only when ALL conditions are met."
                                )}
                            </p>
                        </div>
                    </section>
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <MousePointer2 size={18} className="text-gray-400" />
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{getText("制御ロジックの意図", "Control Logic Intent")}</h3>
                        </div>
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                            <p className="text-xs text-emerald-400/80 leading-relaxed">
                                {getText(
                                    "この設定は「再注文する理由がない人」をスマートに除外し、本当に必要な人だけに導線を提供します。これは、ストア全体のCVR維持とブランド体験の向上を両立するための「安全装置」です。",
                                    "This logic smartly excludes those with no reason to reorder, showing the path only to those who need it. It acts as a safety valve to balance CVR and brand experience."
                                )}
                            </p>
                        </div>
                    </section>
                </div>

                {/* ================= SIDEBAR ================= */}
                <aside className="space-y-6">

                    <aside className="space-y-6">
                        <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">{getText("利用可能な条件軸", "Condition Groups")}</h3>
                            <div className="space-y-4">
                                {[
                                    {
                                        title: getText('商品条件 (Product)', 'Product'),
                                        desc: getText('商品タイプ / タグ / 在庫状態', 'Product Type / Tags / Inventory')
                                    },
                                    {
                                        title: getText('顧客条件 (Customer)', 'Customer'),
                                        desc: getText('購入回数 / タグ / 会員状態', 'Purchase Count / Tags / Member Status')
                                    },
                                    {
                                        title: getText('履歴条件 (Order History)', 'Order History'),
                                        desc: getText('最終購入日 / 購入頻度 / 注文回数', 'Last Purchase / Frequency / Count')
                                    }
                                ].map(group => (
                                    <div key={group.title} className="p-3 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
                                        <p className="text-xs font-bold text-white mb-1">{group.title}</p>
                                        <p className="text-[10px] text-gray-500">{group.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-gradient-to-b from-[#1c1f2a] to-[#11131a] border border-purple-500/30 p-6 rounded-2xl shadow-xl relative overflow-visible">
                            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles size={16} className="text-purple-400" />
                                {getText("高度な制御をアンロック", "Advanced Visibility Control")}
                            </h3>
                            <div className="space-y-4 mb-8">
                                {[
                                    getText("商品カテゴリごとの再注文ボタン可否の個別制御", "Per-category reorder button control"),
                                    getText("購入回数（LTV）に応じた特典付きボタンの出し分け", "Segment buttons with offers based on LTV"),
                                    getText("高頻度リピーター専用の制限解除ロジック", "Bypass logic for high-frequency repeaters"),
                                    getText("ABテスト機能による表示条件の最適化", "Optimize conditions with AB testing")
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
                                        {getText("Growthプランで、再注文CVRを最大化する高度な制御を利用可能です。", "Maximize reorder CVR with advanced controls in Growth.")}
                                    </p>
                                    <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 group">
                                        <span className="text-xs">Unlock Advanced Control</span>
                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            ) : (
                                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                                    <span className="text-sm">Manage Advanced Rules</span>
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </section>

                        <div className="p-6 bg-[#11131a] border border-[#1e212b] rounded-2xl">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{getText("ヒント", "Tip")}</p>
                            <p className="text-xs text-gray-400 leading-relaxed italic">
                                {getText(
                                    "この画面は「条件を設定する画面」ではなく「再注文を“出さない勇気”を設計する画面」です。",
                                    "This screen is not for settings; it's for designing the 'courage to suppress' reorders."
                                )}
                            </p>
                        </div>
                    </aside>
                </aside>
            </div>
        </div>
    );
};

export default ConditionalVisibilityPage;

/* ================= SUB COMPONENTS ================= */

const Stat = ({ icon, label, value, note, highlight, accent }: any) => (
    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase">
            {icon}
            {label}
        </div>
        <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-bold ${accent ? "text-emerald-400" : "text-white"}`}>
                {value}
            </span>
            <span className="text-[10px] text-gray-500">{note}</span>
        </div>
    </div>
);

const RuleItem = ({ name, desc, purpose }: any) => (
    <div className="p-5 flex justify-between hover:bg-[#1c1f2a]/50">
        <div>
            <p className="text-sm font-bold text-white">{name}</p>
            <p className="text-xs text-gray-400">{desc}</p>
            <p className="text-[10px] text-emerald-400 italic mt-2">
                <CheckCircle size={10} className="inline mr-1" />
                {purpose}
            </p>
        </div>
        <CheckCircle size={16} className="text-emerald-500" />
    </div>
);
