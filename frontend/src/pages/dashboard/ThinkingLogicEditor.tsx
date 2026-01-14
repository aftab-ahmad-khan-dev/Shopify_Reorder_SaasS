import React from "react";
import {
    BarChart,
    PlayCircle,
    Users,
    Layers,
    ShieldCheck,
    CheckCircle,
    Settings2,
    ArrowDown,
    Zap,
    ChevronRight,
    Lock,
    HelpCircle
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "@/components/dashboard/PageHeader";


interface OverviewProps {
    plan?: "Starter" | "Growth";
    lang?: "ja" | "en";
    setActiveTab?: (tab: string) => void;
}

const ThinkingLogicEditor: React.FC<OverviewProps> = ({
    plan = "Starter",
    lang = "ja",
    setActiveTab = () => { },
}) => {
    const { t, language } = useLanguage();

    const getText = (jaText: string, enText: string) => {
        return language === 'ja' ? jaText : enText;
    };
    const logicUnits = (t: any) => [
        {
            id: "1",
            title: "LOGIC UNIT 1",
            purpose: getText("無関係なユーザーへの露出防止", "Prevent exposure to inactive users"),
            condition: getText(
                "IF: 過去90日以内に配達完了注文があるか？",
                "IF: Delivered order within last 90 days?"
            ),
            effect: getText(
                "購入履歴のない顧客を除外します。",
                "Excludes customers without recent purchases."
            ),
            status: "Active"
        },
        {
            id: "2",
            title: "LOGIC UNIT 2",
            purpose: getText("在庫チェック", "Stock availability check"),
            condition: getText(
                "IF: 推奨商品に在庫があるか？",
                "IF: Recommended products in stock?"
            ),
            effect: getText(
                "在庫切れ体験を防止します。",
                "Prevents out-of-stock experience."
            ),
            status: "Active"
        }
    ];


    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">

            {/* ================= HEADER ================= */}
            <PageHeader
                title={getText("思考ロジックエディタ", "Thinking Logic Editor")}
                description={getText(
                    "この再注文体験が「なぜ正しいのか」を説明するためのビジネスロジックを可視化・管理します。",
                    "Visualize and manage business logic to explain why this reorder experience is optimal."
                )}
                plan={plan}
            />

            {/* ================= IMPACT SUMMARY ================= */}
            <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                    <BarChart size={18} className="text-purple-400" />
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {getText("Logic Impact Summary (Last 30 days)", "Logic Impact Summary (Last 30 days)")}
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Stat label={getText("適用された訪問数", "Sessions Applied")} value="1,420" />
                    <Stat label={getText("再注文表示率", "Reorder Visibility Rate")} value="62%" accent="purple" />
                    <Stat label={getText("再注文完了率 (CVR)", "Reorder Completion Rate")} value="18.4%" accent="emerald" />
                </div>
            </section>

            {/* ================= MAIN GRID ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ================= FLOW ================= */}
                <div className="lg:col-span-2 space-y-12">

                    {/* Trigger */}
                    <div className="relative">
                        <div className="bg-gradient-to-br from-[#1c1f2a] to-[#11131a] border border-purple-500/40 p-6 rounded-2xl shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-purple-900/40 rounded-lg text-purple-400">
                                    <PlayCircle size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">
                                        Trigger
                                    </p>
                                    <h4 className="text-lg font-bold text-white">
                                        {getText("顧客がマイページにアクセスした瞬間", "Customer opens My Page")}
                                    </h4>
                                </div>
                            </div>

                            <div className="flex gap-4 border-t border-[#2d313e] pt-4 text-[10px] text-gray-500 uppercase font-bold">
                                <span className="flex items-center gap-1.5">
                                    <Users size={12} /> {getText("ログイン済み顧客のみ", "Logged-in customers only")}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Layers size={12} /> {getText("全デバイス共通", "All devices")}
                                </span>
                            </div>
                        </div>

                        <div className="absolute top-full left-1/2 w-0.5 h-12 bg-gradient-to-b from-purple-500/50 to-transparent -translate-x-1/2" />
                    </div>

                    {/* Logic Units */}
                    <div className="space-y-12 pl-4 border-l-2 border-dashed border-[#2d313e]">
                        {logicUnits(t).map((unit, idx) => (
                            <div key={unit.id} className="relative">
                                <LogicUnit {...unit} />
                                {idx < logicUnits(t).length - 1 && (
                                    <div className="absolute top-full left-1/2 w-0.5 h-12 bg-gradient-to-b from-transparent via-[#2d313e] to-transparent -translate-x-1/2 mt-1" />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Final Result */}
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl flex items-center gap-4">
                        <div className="p-3 bg-emerald-500 text-[#0d0e14] rounded-full">
                            <CheckCircle size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-white">
                                {getText("最終結果：再注文UIを表示", "FINAL RESULT: Display Reorder UI")}
                            </h4>
                            <p className="text-xs text-emerald-400/80 italic">
                                {getText(
                                    "すべての論理チェックを通過。最適な顧客にのみ表示されます。",
                                    "Passed all logical checks. Displayed only to optimal customers."
                                )}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= SIDEBAR ================= */}
                <aside className="space-y-6">

                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Settings2 size={14} />
                            {getText("ロジックの実行順序", "Logic Execution Order")}
                        </h3>

                        <OrderStep num="1" text={getText("訪問者フィルタ", "Visitor Filter")} />
                        <ArrowDown size={12} className="mx-auto text-gray-700 my-1" />
                        <OrderStep num="2" text={getText("在庫・商品ステータス", "Stock & Status Check")} />

                        <div className="mt-4 p-4 bg-purple-900/10 border border-purple-500/20 rounded-xl">
                            <p className="text-[10px] text-purple-300 italic">
                                {getText(
                                    "このロジックは在庫チェックの前にフィルタリングを行います。",
                                    "This logic filters before stock checks."
                                )}
                            </p>
                        </div>
                    </section>

                    <section className="bg-gradient-to-b from-[#1c1f2a] to-[#11131a] border border-purple-500/30 p-6 rounded-2xl">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Zap size={16} className="text-purple-400" />
                            {getText("ロジックを最適化する", "Optimize Logic Flow")}
                        </h3>

                        {[
                            getText("実行順序のカスタマイズ", "Customize execution order"),
                            getText("判定条件の調整", "Adjust thresholds"),
                            getText("フォールバックロジック追加", "Add fallback logic"),
                            getText("顧客ビューシミュレーター", "Customer view simulator")
                        ].map((text, i) => (
                            <div key={i} className="flex gap-3 text-xs text-gray-400 mb-2">
                                <Lock size={12} className="text-gray-600 mt-0.5" />
                                <span>{text}</span>
                            </div>
                        ))}

                        <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg flex justify-center gap-2">
                            {getText("Growthで最適化", "Optimize with Growth")}
                            <ChevronRight size={14} />
                        </button>
                    </section>
                    <div className="p-6 bg-[#11131a] border border-[#1e212b] rounded-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle size={14} className="text-gray-500" />
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{getText("システム間の関係", "System Relationships")}</p>
                        </div>
                        <div className="space-y-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-bold text-white uppercase">{getText("Conditional Visibility", "Conditional Visibility")}</p>
                                <p className="text-[9px] text-gray-500 tracking-tighter">{getText("「どこに（場所）」表示するかを制御", "Controls WHERE reorder appears")}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-bold text-white uppercase">{getText("Recommendation", "Recommendation")}</p>
                                <p className="text-[9px] text-gray-500 tracking-tighter">{getText("「何を（商品）」提案するかを制御", "Controls WHAT is suggested")}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-[10px] font-bold text-purple-400 uppercase">{getText("Thinking Logic", "Thinking Logic")}</p>
                                <p className="text-[9px] text-gray-500 tracking-tighter">{getText("「なぜ（理由）」表示するか、根幹を制御", "Controls WHY it appears at all")}</p>
                            </div>
                        </div>
                    </div>
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">
                            {getText("ヒント", "Tip")}
                        </p>
                        <p className="text-xs text-gray-400 italic">
                            {getText(
                                "このエディターは、この再注文エクスペリエンスが最適である理由を説明するための説明責任 UI です。",
                                "This editor is an accountability UI to explain why this reorder experience is optimal."
                            )}
                        </p>
                    </section>
                </aside>
            </div>
        </div>
    );
};

export default ThinkingLogicEditor;

/* ================= SUB COMPONENTS ================= */

const Stat = ({ label, value, accent }: any) => (
    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
        <span className="text-[10px] text-gray-500 font-bold uppercase">{label}</span>
        <p
            className={`text-2xl font-bold ${accent === "emerald"
                ? "text-emerald-400"
                : accent === "purple"
                    ? "text-purple-400"
                    : "text-white"
                }`}
        >
            {value}
        </p>
    </div>
);

const LogicUnit = ({ title, purpose, condition, effect, status }: any) => (
    <div className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
        <div className="flex justify-between mb-4">
            <div>
                <span className="text-[10px] text-gray-500 font-bold uppercase">{title}</span>
                <h5 className="text-sm font-bold text-white mt-1 flex gap-2 items-center">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    {purpose}
                </h5>
            </div>
            <span className="text-[8px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold">
                {status}
            </span>
        </div>

        <div className="p-4 bg-[#0d0e14] rounded-xl border border-[#1e212b] mb-4">
            <p className="text-xs font-mono text-purple-300">{condition}</p>
        </div>

        <p className="text-[10px] text-gray-500 italic">
            <b>Effect:</b> {effect}
        </p>
        <div className="flex gap-2 mt-4 pt-4 border-t border-[#1e212b]">
            <div className="flex-1 p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-center">
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-tighter">IF YES → CONTINUE</span>
            </div>
            <div className="flex-1 p-2 bg-red-500/5 border border-red-500/10 rounded-lg text-center">
                <span className="text-[9px] font-bold text-red-400 uppercase tracking-tighter">IF NO → HIDE UI</span>
            </div>
        </div>
    </div>
);

const OrderStep = ({ num, text }: any) => (
    <div className="p-2 bg-[#1c1f2a] border border-[#2d313e] rounded flex items-center gap-3">
        <span className="text-[10px] font-bold text-gray-500 w-4">{num}</span>
        <p className="text-xs text-gray-300 font-medium">{text}</p>
    </div>
);
