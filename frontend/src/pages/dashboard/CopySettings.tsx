import React from "react";
import {
    Globe,
    CheckCircle,
    Lock,
    Target,
    ShieldCheck,
    Sparkles,
    Smartphone,
    Mail,
    Sparkle,
    Quote,
    ChevronRight,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "@/components/dashboard/PageHeader";

interface CopySettingsProps {
    plan?: "Starter" | "Growth";
}

const CopySettings: React.FC<CopySettingsProps> = ({
    plan = "Starter",
}) => {
    const { language } = useLanguage();

    const getText = (ja: string, en: string) =>
        language === "ja" ? ja : en;

    return (
        <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">
            <PageHeader
                title={getText("文言・言語設定", "Copy & Language Settings")}
                description={getText("再注文体験を顧客の行動へと変換する「言葉」のレイヤーを制御します。文言の差が、クリックと迷いの境界線を決めます。", "Control the 'language layer' that transforms the reorder experience into customer action. Words decide the boundary between a click and hesitation.")}
                plan={plan}
            />

            {/* Layer 1: Language Status Summary */}
            <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Globe size={18} className="text-purple-400" />
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                        {getText("有効な言語と設定", "Language Status Summary")}
                    </h3>
                </div>

                {/* 追加された説明文 */}
                <div className="mb-8 p-4 bg-[#161922] border-l-4 border-purple-500 rounded-r-xl">
                    <p className="text-xs text-gray-300 leading-relaxed">
                        {getText(
                            "顧客に表示される言語は、Shopifyの顧客言語設定をもとに自動で切り替わります。\n\nメイン言語は、すべての文言設計の基準となる言語です。翻訳が存在しない場合は、メイン言語が表示されます。",
                            "The language displayed to customers is automatically switched based on Shopify's customer language settings.\n\nThe primary language is the baseline for all copy designs. If a translation is missing, the primary language will be displayed."
                        ).split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{getText("メイン言語", "Primary Language")}</p>
                        <p className="text-lg font-bold text-white flex items-center gap-2">
                            <CheckCircle className="text-emerald-500" size={16} /> {getText("日本語 (JA)", "Japanese (JA)")}
                        </p>
                    </div>
                    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{getText("セカンダリ言語", "Secondary Language")}</p>
                        <p className="text-lg font-bold text-white flex items-center gap-2">
                            <CheckCircle className="text-emerald-500" size={16} /> {getText("英語 (EN)", "English (EN)")}
                        </p>
                    </div>
                    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{getText("自動検知機能", "Auto-detection")}</p>
                        <p className="text-lg font-bold text-emerald-400 uppercase tracking-tighter">{getText("有効 (Shopify準拠)", "Enabled")}</p>
                    </div>
                    <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
                        <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{getText("フォールバック", "Fallback")}</p>
                        <p className="text-lg font-bold text-gray-300 italic">{getText("英語 (EN)", "English (EN)")}</p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Layer 2: Copy Editor Sections */}
                <div className="lg:col-span-2 space-y-6">
                    {[
                        {
                            title: getText('Primary Actions (ボタン文言)', 'Primary Actions'),
                            icon: <Target size={16} className="text-purple-400" />,
                            items: [
                                { location: 'Reorder Button', copyJa: '再注文する', copyEn: 'Reorder Now', purpose: getText('行動トリガー', 'Action trigger') },
                                { location: 'One-click Reorder', copyJa: '前回と同じ内容で再注文', copyEn: 'Repeat Last Order', purpose: getText('迷い防止・最短導線', 'Zero-friction path') },
                                { location: 'Bulk Reorder', copyJa: 'まとめて再注文', copyEn: 'Bulk Reorder', purpose: getText('B2B・高頻度購入', 'B2B efficiency') },
                            ]
                        },
                        {
                            title: getText('Assistive Copy (不安の解消)', 'Assistive Copy'),
                            icon: <ShieldCheck size={16} className="text-emerald-400" />,
                            items: [
                                { location: 'Cart Context', copyJa: '前回の注文内容をそのまま使用します', copyEn: 'Uses your last order details automatically', purpose: getText('不確実性の排除', 'Removes uncertainty') },
                                { location: 'Quantity Help', copyJa: '数量は後から変更できます', copyEn: 'Quantities can be adjusted later', purpose: getText('UXブレーキの解除', 'UX brake release') },
                                { location: 'Safety Note', copyJa: 'いつでもキャンセル可能です', copyEn: 'Cancellable anytime', purpose: getText('心理的安全性の確保', 'Psychological safety') },
                            ]
                        },
                        {
                            title: getText('Recommendation Copy (提案の文脈)', 'Recommendation Copy'),
                            icon: <Sparkles size={16} className="text-blue-400" />,
                            items: [
                                { location: 'Replenishment', copyJa: 'そろそろ補充のタイミングです', copyEn: 'Time to replenish', purpose: getText('利便性の強調', 'Emphasizes utility') },
                                { location: 'Recall', copyJa: '前回と同じ商品です', copyEn: 'Same as your last purchase', purpose: getText('記憶の補助', 'Aids recall') },
                                { location: 'Urgency', copyJa: '在庫が残りわずかです', copyEn: 'Low stock remaining', purpose: getText('ポジティブな行動喚起', 'Gentle nudge') },
                            ]
                        }
                    ].map((section, idx) => (
                        <section key={idx} className="bg-[#11131a] border border-[#1e212b] rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-5 bg-[#161922] border-b border-[#1e212b] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {section.icon}
                                    <h4 className="text-sm font-bold text-white">{section.title}</h4>
                                </div>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{getText("ロジック連動済", "Logic Integrated")}</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead>
                                        <tr className="border-b border-[#1e212b] text-gray-500 uppercase tracking-tighter">
                                            <th className="px-6 py-4 font-bold">{getText("使用箇所", "Location")}</th>
                                            <th className="px-6 py-4 font-bold">{getText("現在の文言", "Active Copy")}</th>
                                            <th className="px-6 py-4 font-bold">{getText("役割 (設計意図)", "Role / Intent")}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1e212b]">
                                        {section.items.map((item, i) => (
                                            <tr key={i} className="hover:bg-[#1c1f2a]/50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-gray-400 uppercase tracking-tighter whitespace-nowrap">{item.location}</td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-1">
                                                        <p className="text-white font-bold">「{item.copyJa}」</p>
                                                        <p className="text-gray-500 italic">"{item.copyEn}"</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-emerald-400/80 italic font-medium whitespace-nowrap">{item.purpose}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {plan === 'Starter' && (
                                <div className="p-3 bg-purple-900/10 flex items-center gap-3">
                                    <Lock size={12} className="text-purple-400" />
                                    <p className="text-[10px] text-purple-200">
                                        {getText(
                                            "Growthプランで、すべての文言を自社ブランドに合わせたトーンへ編集可能になります。",
                                            "Unlock full copy customization to match your brand's unique tone with Growth Plan."
                                        )}
                                    </p>
                                </div>
                            )}
                        </section>
                    ))}
                </div>

                {/* Sidebar Action / Preview Area */}
                <aside className="space-y-6">
                    <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Smartphone size={14} />
                            {getText("デバイスプレビュー", "Device Preview")}
                        </h3>

                        <div className="space-y-4">
                            <div className="bg-[#1c1f2a] border border-[#2d313e] rounded-xl p-4 shadow-inner">
                                <p className="text-[9px] text-gray-500 font-bold uppercase mb-3 flex items-center gap-1.5"><Smartphone size={10} /> {getText("マイページ (Mobile)", "My Page (Mobile)")}</p>
                                <div className="aspect-[9/5] bg-[#0d0e14] rounded-lg border border-[#2d313e] p-3 relative overflow-hidden flex flex-col justify-end">
                                    <div className="w-full h-8 bg-purple-600 rounded flex items-center justify-center shadow-lg shadow-purple-900/20">
                                        <span className="text-[10px] font-bold text-white">{getText("前回と同じ内容で再注文", "Repeat Last Order")}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#1c1f2a] border border-[#2d313e] rounded-xl p-4 shadow-inner">
                                <p className="text-[9px] text-gray-500 font-bold uppercase mb-3 flex items-center gap-1.5"><Mail size={10} /> {getText("リマインドメール", "Reminder Email")}</p>
                                <div className="aspect-[16/6] bg-[#0d0e14] rounded-lg border border-[#2d313e] p-3 flex flex-col gap-2">
                                    <div className="w-full h-2 bg-gray-800 rounded-full"></div>
                                    <div className="w-3/4 h-2 bg-gray-800 rounded-full"></div>
                                    <div className="mt-1 w-1/3 h-4 bg-purple-600 rounded flex items-center justify-center">
                                        <span className="text-[8px] font-bold text-white">{getText("再注文する", "Reorder Now")}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gradient-to-b from-[#1c1f2a] to-[#11131a] border border-purple-500/30 p-6 rounded-2xl shadow-xl relative overflow-visible">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Sparkle size={16} className="text-purple-400" />
                            {getText("トーン設定をアンロック", "Unlock Tone Presets")}
                        </h3>
                        <div className="space-y-4 mb-8">
                            {[
                                getText("Neutral / Friendly / Professional / Minimal の切り替え", "Switch between Neutral tones"),
                                getText("すべての文言をブランドアイデンティティに合わせて一括調整", "Bulk adjust all copy"),
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex gap-3 text-xs text-gray-400">
                                    {plan === 'Starter' ? <Lock size={12} className="text-gray-600 shrink-0 mt-0.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0 mt-1.5"></div>}
                                    <p className={plan === 'Starter' ? 'opacity-70' : ''}>{benefit}</p>
                                </div>
                            ))}
                        </div>
                        {plan === 'Starter' ? (
                            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 group">
                                <span className="text-xs">Customize Language with Growth</span>
                                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{getText("トーン選択", "Tone Selection")}</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Neutral', 'Friendly', 'Professional', 'Minimal'].map(tone => (
                                        <button key={tone} className="p-2 bg-[#1c1f2a] border border-[#2d313e] hover:border-purple-500 rounded-lg text-[10px] font-bold text-gray-400 hover:text-white transition-all">
                                            {tone}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    <div className="p-6 bg-[#11131a] border border-[#1e212b] rounded-2xl">
                        <div className="flex items-center gap-2 mb-3">
                            <Quote size={14} className="text-gray-500" />
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{getText("UXの設計思想", "UX Philosophy")}</p>
                        </div>
                        <p className="text-xs text-gray-400 leading-relaxed italic">
                            {getText(
                                "再注文は「ロジック × 言葉」で完結します。言葉が不適切であれば、たとえロジックが完璧でも顧客は行動を起こしません。",
                                "Reordering is finalized through 'Logic × Language'. If the words are inappropriate, the customer will not take action, even if the logic is perfect."
                            )}
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CopySettings;
