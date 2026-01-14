import React from "react";
import {
  Activity,
  Mail,
  CheckCircle,
  XCircle,
  BellRing,
  Settings2,
  ArrowRight,
  Monitor,
  Smartphone,
  Quote,
  Zap,
  ChevronRight,
  Lock,
  History,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "@/components/dashboard/PageHeader";

interface NotificationsProps {
  plan?: "Starter" | "Growth";
  setActiveTab?: (tab: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({
  plan = "Starter",
  setActiveTab = () => { },
}) => {
  const { language } = useLanguage();

  const getText = (ja: string, en: string) =>
    language === "ja" ? ja : en;

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">
      <div>
        <PageHeader
          title={getText("通知設定", "Notifications")}
          description={getText("顧客へ「売り込む」のではなく、最適な瞬間に「思い出してもらう」きっかけを設計します。", "Design memory triggers at the perfect moment — without pushing sales.")}
          plan={plan}
        />
        <p className="text-xs text-purple-400 font-medium italic mt-1 border-l-2 border-purple-500/50 pl-3">
          {getText("Notifications are not sales messages. They are memory triggers.", "Notifications are not sales messages. They are memory triggers.")}
        </p>
      </div>

      {/* Layer 1: Notification Status Summary */}
      <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-purple-400" />
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{getText("通知全体ステータス", "Global Status")}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{getText("状態", "Status")}</p>
              <p className="text-lg font-bold text-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                {getText("有効", "Active")}
              </p>
            </div>
            <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{getText("チャンネル", "Channels")}</p>
              <p className="text-lg font-bold text-white flex items-center gap-2"><Mail size={16} className="text-gray-400" /> Email</p>
            </div>
            <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">{getText("最終送信日", "Last Sent")}</p>
              <p className="text-lg font-bold text-gray-300">2024-03-28</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-64 bg-[#1c1f2a] rounded-xl border border-[#2d313e] p-5">
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-3">{getText("この通知の目的", "Primary Purpose")}</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle size={14} /> {getText("再注文リマインド", "Reorder Reminder")}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <XCircle size={14} /> {getText("プロモーション", "Promotions")}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <XCircle size={14} /> {getText("値引き訴求", "Discounts")}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Layer 2: Main Logic Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reorder Reminder Card */}
          <section className="bg-[#11131a] border border-[#1e212b] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 bg-[#161922] border-b border-[#1e212b] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-900/40 rounded-lg text-purple-400"><BellRing size={18} /></div>
                <div>
                  <h4 className="text-sm font-bold text-white">{getText("Reorder Reminder (再注文リマインド)", "Reorder Reminder")}</h4>
                  <p className="text-[10px] text-emerald-400/80 font-bold">{getText("トリガー：購入間隔ロジック連動中", "Trigger: Purchase Interval Logic Enabled")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded">
                <span className="text-[9px] font-bold text-emerald-400 uppercase">ENABLED</span>
              </div>
            </div>
            <div className="p-6 space-y-8">
              <div className="p-4 bg-[#0d0e14] rounded-xl border border-[#1e212b]">
                <p className="text-xs text-gray-400 leading-relaxed italic">
                  {getText(
                    "このリマインドは、再注文確率が高いと判定された顧客にのみ自動送信されます。スパムやキャンペーン目的での利用は制限されています。",
                    "Sent only when reorder probability is high. No spam. No campaigns."
                  )}
                </p>
              </div>

              {/* Trigger Logic Visualizer */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                    <Settings2 size={12} /> {getText("送信トリガー設定", "Trigger Logic")}
                  </h5>
                  {plan === 'Starter' && (
                    <span className="text-[9px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase">{getText("閲覧のみ", "Read-only")}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl border transition-all ${plan === 'Growth' ? 'bg-[#1c1f2a] border-purple-500/30' : 'bg-[#0d0e14] border-[#1e212b]'}`}>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">{getText("送信タイミング", "Timing")}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">30 - 90</span>
                      <span className="text-xs text-gray-500">{getText("日後 (発送完了ベース)", "days after fulfillment")}</span>
                    </div>
                    {plan === 'Growth' && <div className="mt-3 h-1 w-full bg-[#11131a] rounded-full overflow-hidden"><div className="h-full bg-purple-600 w-2/3"></div></div>}
                  </div>
                  <div className={`p-4 rounded-xl border transition-all ${plan === 'Growth' ? 'bg-[#1c1f2a] border-purple-500/30' : 'bg-[#0d0e14] border-[#1e212b]'}`}>
                    <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">{getText("クールダウン期間", "Cooldown")}</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-white">14</span>
                      <span className="text-xs text-gray-500">{getText("日間 (再送防止)", "days")}</span>
                    </div>
                    {plan === 'Growth' && <div className="mt-3 h-1 w-full bg-[#11131a] rounded-full overflow-hidden"><div className="h-full bg-purple-600 w-1/4"></div></div>}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">{getText("除外フィルタ (抑制ルール)", "Exclusion Rules")}</p>
                  {[
                    { label: getText('直近の再注文済み顧客', 'Recently reordered'), status: true },
                    { label: getText('定期便契約中の顧客', 'Subscription customers'), status: true },
                    { label: getText('在庫切れの商品を含む場合', 'Out-of-stock items'), status: true },
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <div className={`p-0.5 rounded transition-colors ${rule.status ? 'text-emerald-500' : 'text-gray-700'}`}>
                        {plan === 'Starter' ? <CheckCircle size={14} /> : <div className="w-4 h-4 border border-purple-500/50 rounded flex items-center justify-center bg-purple-900/20"><div className="w-2 h-2 bg-purple-500 rounded-sm"></div></div>}
                      </div>
                      <span className={rule.status ? 'text-gray-300' : 'text-gray-600'}>{rule.label}</span>
                    </div>
                  ))}
                </div>

                {plan === 'Starter' && (
                  <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                    <p className="text-[10px] text-emerald-400 italic leading-relaxed">
                      {getText(
                        "業界の統計データに基づいた「最も効果的で嫌われない」最適化済みデフォルト値が適用されています。これらはGrowthプランでカスタマイズ可能です。",
                        "Optimized defaults applied. Editable in Growth plan."
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Copy Summary Link */}
          <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-purple-500/30 transition-all" onClick={() => setActiveTab('copy-settings')}>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900/20 rounded-xl text-purple-400 group-hover:scale-110 transition-transform"><Quote size={20} /></div>
              <div>
                <h4 className="text-sm font-bold text-white">{getText("通知メッセージの文言", "Notification Copy")}</h4>
                <p className="text-xs text-gray-500 italic">{getText("件名 / 本文 / CTAボタンの言葉は「文言・言語設定」で管理されています。", "Edited in Copy & Language Settings.")}</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-gray-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </section>
        </div>

        {/* Sidebar: Preview Area */}
        <aside className="space-y-6">
          <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Monitor size={14} /> {getText("プレビュー", "Notification Preview")}
              </h3>
              <div className="flex gap-2">
                <button className="p-1 bg-[#1c1f2a] rounded border border-purple-500/50 text-purple-400"><Monitor size={12} /></button>
                <button className="p-1 bg-[#1c1f2a] rounded border border-[#2d313e] text-gray-500"><Smartphone size={12} /></button>
              </div>
            </div>

            <div className="bg-[#0d0e14] border border-[#1e212b] rounded-xl p-4 space-y-4 shadow-inner min-h-[300px]">
              <div className="space-y-1">
                <p className="text-[9px] text-gray-500 font-bold uppercase">{getText("件名：", "Subject: ")}</p>
                <p className="text-xs text-white font-medium">{getText("Premium Pet Supplies：そろそろ補充のタイミングです", "Premium Pet Supplies: Time to replenish")}</p>
              </div>
              <div className="pt-3 border-t border-[#1e212b] space-y-3">
                <div className="w-full h-2 bg-gray-800 rounded-full"></div>
                <div className="w-3/4 h-2 bg-gray-800 rounded-full"></div>
                <div className="aspect-[4/3] bg-[#161922] rounded-lg border border-[#2d313e] flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 bg-[#0d0e14] rounded border border-[#1e212b] mx-auto mb-2 flex items-center justify-center text-xl">🐕</div>
                    <p className="text-[10px] text-white font-bold mb-1">Premium Dog Food</p>
                    <p className="text-[8px] text-gray-500 italic mb-2">{getText("前回と同じ内容です", "Same as last time")}</p>
                    <button className="px-4 py-1.5 bg-purple-600 rounded text-[9px] font-bold text-white shadow-lg">{getText("再注文する", "Reorder Now")}</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-b from-[#1c1f2a] to-[#11131a] border border-purple-500/30 p-6 rounded-2xl shadow-xl relative overflow-visible">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={16} className="text-purple-400" />
              {getText("高度な通知運用をアンロック", "Advanced Notification Flow")}
            </h3>
            <div className="space-y-4 mb-8">
              {[
                getText("送信タイミングと閾値の自在な調整", "Full control over timing and thresholds"),
                getText("特定条件下でのSMS / LINE通知の併用", "Multi-channel support (SMS/LINE/etc.)"),
                getText("セグメント別のリマインドメッセージ出し分け", "Segment-specific remind messages"),
                getText("送信数と再注文CVRの相関分析レポート", "Correlation report: Sent count vs CVR")
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
                  {getText("Growthプランで、再注文をオーケストレートする強力な指揮官を手に入れましょう。", "Orchestrate reorders with advanced notification control in Growth Plan.")}
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2 group">
                  <span className="text-xs">Optimize Reminders with Growth</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ) : (
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                <Settings2 size={16} /> <span className="text-sm">Manage Advanced Flow</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </section>

          <div className="p-6 bg-[#11131a] border border-[#1e212b] rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <History size={14} className="text-gray-500" />
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{getText("ロジックの接続点", "Integration Point")}</p>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed italic">
              {getText(
                "この画面で設定した「タイミング」は、Thinking Logic Editor の判定結果と統合され、最も成功確率の高い瞬間に実行されます。",
                "The timing set here is integrated with Thinking Logic Editor's outcome, ensuring execution at the moment of highest probability."
              )}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Notifications;
