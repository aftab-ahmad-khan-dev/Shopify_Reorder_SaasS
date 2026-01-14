// src/pages/SettingsPage.tsx
import React from "react";
import {
  Activity,
  Target,
  ListChecks,
  Clock3,
  Power,
  AlertTriangle,
  Smartphone,
  Zap,
  History,
  Shield,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PlanGuard } from "@/components/dashboard/PlanGuard";

interface SettingsPageProps {
  plan?: "Starter" | "Growth";
  setActiveTab?: (tab: string) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({
  plan = "Starter",
  setActiveTab = () => { },
}) => {
  const { language } = useLanguage();

  const getText = (ja: string, en: string) =>
    language === "ja" ? ja : en;


  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">
      <PageHeader
        title={getText("全体設定", "General Settings")}
        description={getText("アプリの全体稼働状態を監視し、最適なエントリーポイントを制御する司令塔です。", "Monitor system status and orchestrate entry points from this control panel.")}
        plan={plan}
      />

      {/* ① Global Status Summary */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#11131a] border border-[#1e212b] p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Activity size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">{getText("アプリ稼働状態", "App Status")}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
            <p className="text-xl font-bold text-white">{getText("Active", "Active")}</p>
          </div>
        </div>
        <div className="bg-[#11131a] border border-[#1e212b] p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Target size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">{getText("表示エントリーポイント", "Entry Point")}</p>
          </div>
          <p className="text-xl font-bold text-white">{getText("マイページ / 注文完了", "My Page / Conf.")}</p>
        </div>
        <div className="bg-[#11131a] border border-[#1e212b] p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <ListChecks size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">{getText("有効な主要機能", "Active Features")}</p>
          </div>
          <p className="text-xl font-bold text-purple-400">3 / 3</p>
        </div>
        <div className="bg-[#11131a] border border-[#1e212b] p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Clock3 size={14} />
            <p className="text-[10px] font-bold uppercase tracking-widest">{getText("最終設定変更", "Last Config Change")}</p>
          </div>
          <p className="text-sm font-bold text-gray-400">2024-03-20 14:30</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* ② Global ON/OFF */}
          <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                  <Power size={16} className="text-emerald-500" />
                  {getText("再注文機能 全体ON/OFF", "Global Reorder Toggle")}
                </h3>
                <p className="text-xs text-gray-500">{getText("ストア上の全UIを一括で制御します。", "Batch control for all store UI elements.")}</p>
              </div>
              <div className="w-12 h-6 bg-emerald-600 rounded-full flex items-center px-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
              </div>
            </div>

            <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle size={14} />
                <p className="text-[10px] font-bold uppercase">{getText("影響範囲 (停止時に無効化されるもの)", "Operational Impact")}</p>
              </div>
              <ul className="text-[10px] text-gray-500 space-y-1 pl-6 list-disc">
                <li>{getText("全再注文UI（ワンクリック、カスタム、おすすめ等）の非表示", "Hide all Reorder UI components")}</li>
                <li>{getText("自動リマインド通知の送信停止", "Stop automated remind notifications")}</li>
              </ul>
              <p className="text-[10px] text-gray-400 italic pt-2 border-t border-red-500/10">
                {getText("※ 管理画面内のデータや設定は保持されます。顧客側の表示のみが即座に停止します。", "Note: Analytics and settings are preserved. Only client-facing UI will be hidden.")}
              </p>
            </div>
          </section>

          {/* ③ Display Placement */}
          <section className="bg-[#11131a] border border-[#1e212b] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#1e212b] bg-[#161922]">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Smartphone size={16} className="text-purple-400" />
                {getText("表示場所設定と期待効果", "Placement Strategy")}
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                {
                  label: getText("マイページ上部 (推奨)", "Top of My Page (Recommended)"),
                  desc: getText("再注文率が最も高い地点です。目的を持って訪れる顧客に最適です。", "Highest conversion. Ideal for customers with intent."),
                  active: true
                },
                {
                  label: getText("注文完了ページ", "Order Confirmation Page"),
                  desc: getText("追加注文・ついで買いに特化した導線です。連続購入を促進します。", "Best for consecutive purchases or immediate add-ons."),
                  active: false
                }
              ].map((item, idx) => (
                <div key={item.label} className={`p-4 rounded-xl border transition-all cursor-pointer ${item.active ? 'bg-[#1c1f2a] border-purple-500/40' : 'bg-[#0d0e14] border-[#1e212b] hover:border-[#2d313e]'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-xs font-bold ${item.active ? 'text-white' : 'text-gray-400'}`}>{item.label}</p>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${item.active ? 'border-purple-500' : 'border-gray-700'}`}>
                      {item.active && <div className="w-2 h-2 bg-purple-500 rounded-full"></div>}
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed italic">{item.desc}</p>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-[10px] text-purple-400 font-bold flex items-center gap-2">
                  <Zap size={10} fill="currentColor" /> {getText("Growthプラン：複数の表示場所を同時に有効化できます", "Growth Plan: Enable multiple locations simultaneously")}
                </p>
              </div>
            </div>
          </section>

          {/* ⑤ Recent Changes */}
          <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
            <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <History size={14} /> {getText("最近の設定変更履歴", "Recent Changes")}
            </h3>
            <div className="space-y-3">
              {[
                { date: '2024-03-20 14:30', change: getText('アプリ稼働状態：有効', 'App Status -> Active'), user: 'Admin' },
                { date: '2024-03-19 10:15', change: getText('表示場所：マイページ', 'Placement -> My Page'), user: 'Admin' },
                { date: '2024-03-18 16:45', change: getText('レコメンドロジック更新', 'Recommendation Logic Updated'), user: 'Admin' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] py-1 border-b border-[#1e212b] last:border-0">
                  <div className="flex gap-4">
                    <span className="text-gray-600 font-mono">{log.date}</span>
                    <span className="text-gray-300 font-medium">{log.change}</span>
                  </div>
                  <span className="text-gray-600">by {log.user}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ④ Sidebar Action: Plan Management */}
        <aside className="space-y-6">
          <section className="bg-gradient-to-b from-[#1c1f2a] to-[#11131a] border border-purple-500/30 p-6 rounded-2xl shadow-xl relative overflow-visible">
            <h3 className="text-sm font-bold text-purple-400 mb-4 flex items-center gap-2">
              <Shield size={16} />
              {getText("現在のプラン運用", "Current Operations")}
            </h3>
            <div className="space-y-6 mb-8">
              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">{getText("プラン種別", "Active Plan")}</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white">Starter Plan</span>
                  <span className="text-[9px] bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded font-bold">{getText("FREE", "FREE")}</span>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-gray-500 font-bold uppercase mb-2">{getText("現在運用中のリソース", "Included Operations")}</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <span>{getText("月間再注文：50件まで", "Up to 50 reorders / mo")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <span>{getText("基本ロジック：安定稼働中", "Basic logic operational")}</span>
                  </li>
                  <li className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle size={14} className="text-emerald-500" />
                    <span>{getText("主要データ閲覧：可能", "Core analytics active")}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-[#1e212b]">
                <p className="text-xs text-purple-200 leading-relaxed italic mb-4">
                  {getText("Starterプランでは、再注文の基本的な流れを安定して運用できます。", "In Starter, you can stably operate the essential reorder flow.")}
                </p>
                <PlanGuard plan={plan} featureName={getText("高度な戦略運用", "Advanced Strategic Operations")}>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                    <span className="text-sm">Upgrade to Growth</span>
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </PlanGuard>
              </div>
            </div>
          </section>

          <div className="p-6 bg-[#11131a] border border-[#1e212b] rounded-2xl">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{getText("ヒント", "Tip")}</p>
            <p className="text-xs text-gray-400 leading-relaxed italic">
              {getText(
                "「表示場所」に迷ったら、まずは「マイページ上部」を推奨します。そこが最も再購入の意思が固まっているポイントです。",
                "Unsure about placement? Start with 'Top of My Page'. It's where re-purchase intent is highest."
              )}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SettingsPage;
