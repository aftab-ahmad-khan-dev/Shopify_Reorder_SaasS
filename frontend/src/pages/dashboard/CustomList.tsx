// src/pages/CustomList.tsx
import React from "react";
import {
  BarChart,
  Target,
  Lock,
  Zap,
  MousePointer2,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageStatus } from "@/components/dashboard/PageStatus";
import { useLanguage } from "@/context/LanguageContext";
import { PlanGuard } from "@/components/dashboard/PlanGuard";

interface CustomListProps {
  plan?: "Starter" | "Growth";
  lang?: "ja" | "en";
  setActiveTab?: (tab: string) => void;
}

const CustomList: React.FC<CustomListProps> = ({
  plan = "Starter",
  lang = "ja",
  setActiveTab = () => {},
}) => {
  const { t, language } = useLanguage();

  const getText = (jaText: string, enText: string) => {
    return language === "ja" ? jaText : enText;
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">
      {/* Header */}
      <PageHeader
        title={getText("カスタム再注文リスト", "Custom Reorder List")}
        description={getText(
          "顧客の購入履歴に基づいた専用の再注文リストを設計・管理します。",
          "Design and manage dedicated reorder lists based on customer purchase history."
        )}
        plan={plan}
      />

      <PageStatus
        status="active"
        location={getText("マイページ上部", "Top of My Page")}
        lastUpdated="2024-03-19 10:15"
      />

      {/* Result Block */}
      <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
        <div className="flex items-center gap-2 mb-6">
          <BarChart size={18} className="text-purple-400" />
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
            {getText(
              "この再注文リストの成果 (過去30日)",
              "Reorder List Results (Past 30 Days)"
            )}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            label={getText("再注文経由売上", "Revenue from List")}
            value="¥124,000"
            sub={plan === "Starter" ? "(¥110k - ¥140k)" : undefined}
          />

          <MetricCard
            label={getText("再注文率", "Reorder Rate")}
            value="18.2%"
            highlight
            sub={plan === "Starter" ? "(15% - 20%)" : undefined}
          />

          <MetricCard
            label={getText("リスト経由注文数", "Orders from List")}
            value={`42${getText("件", " cases")}`}
          />
        </div>
      </section>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Design Block */}
          <section className="bg-[#11131a] border border-[#1e212b] rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-[#1e212b] bg-[#161922] flex justify-between">
              <div className="flex items-center gap-2">
                <Target size={18} className="text-purple-400" />
                <h3 className="text-sm font-bold text-white">
                  {getText("再注文リストの設計", "Reorder List Design")}
                </h3>
              </div>

              <PlanGuard
                plan={plan}
                featureName={getText("リスト設計の変更", "Edit List Design")}
              >
                <button className="flex items-center gap-2 text-[10px] font-bold bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg">
                  {plan === "Starter" && <Lock size={12} />}
                  {getText("設定を変更", "Modify Settings")}
                </button>
              </PlanGuard>
            </div>

            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[#1e212b] text-gray-500 uppercase">
                  <th className="px-6 py-4 text-left">{getText("設定項目", "Settings")}</th>
                  <th className="px-6 py-4 text-left">{getText("現在値", "Current Value")}</th>
                  <th className="px-6 py-4 text-left">{getText("設計の意図", "Design Intent")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e212b]">
                {[
                  [
                    getText("表示対象", "Target"),
                    getText("購入履歴あり", "Purchased"),
                    getText("再注文確率が高い顧客のみに絞り込み", "Narrow down to likely repeaters"),
                  ],
                  [
                    getText("並び順", "Sorting"),
                    getText("購入日順", "By Date"),
                    getText("直近購入商品を優先表示", "Prioritize recent purchases"),
                  ],
                  [
                    getText("最大表示件数", "Max Count"),
                    "5",
                    getText("迷わず選べる商品数に制限", "Limit options to reduce friction"),
                  ],
                ].map(([label, value, intent], i) => (
                  <tr key={i} className="hover:bg-[#1c1f2a]/50">
                    <td className="px-6 py-4 text-gray-400 font-medium">{label}</td>
                    <td className="px-6 py-4 font-bold text-white">{value}</td>
                    <td className="px-6 py-4 text-gray-400 italic">{intent}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {plan === "Growth" && (
              <div className="p-4 bg-purple-900/10 border-t border-purple-500/20 flex gap-2">
                <Zap size={14} className="text-purple-400" />
                <p className="text-[10px] text-purple-200">
                  {getText(
                    "最大表示件数を7にすると再注文率が向上する可能性があります。",
                    "Increasing max count to 7 may improve reorder rate."
                  )}
                </p>
              </div>
            )}
          </section>

          {/* Logic Summary */}
          <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MousePointer2 size={18} className="text-gray-400" />
              <h3 className="text-[10px] font-bold text-gray-500 uppercase">
                {getText("表示ロジック概要", "Display Logic Summary")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                getText("過去90日間の注文履歴を参照", "Uses last 90 days order history"),
                getText("デジタル商品は自動除外", "Digital products are excluded"),
              ].map((text, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-4 bg-[#0d0e14] rounded-xl border border-[#1e212b]"
                >
                  <CheckCircle size={16} className="text-emerald-500" />
                  <span className="text-gray-300 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <section className="bg-gradient-to-b from-[#1c1f2a] to-[#11131a] border border-purple-500/30 p-6 rounded-2xl">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Zap size={16} className="text-purple-400" />
              {getText("このリストを最適化", "Optimize this List")}
            </h3>

            {plan === "Starter" ? (
              <div className="p-4 bg-purple-900/20 border border-purple-500/40 rounded-xl text-center">
                <p className="text-[10px] text-purple-200 mb-3">
                  {getText(
                    "Growthプランで高度な最適化が可能です。",
                    "Upgrade to Growth for advanced optimization."
                  )}
                </p>
                <button className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-xs font-bold text-white flex justify-center gap-2">
                  Upgrade to Growth
                  <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <button className="w-full bg-[#161922] hover:bg-[#1e212b] border border-[#2d313e] py-3 rounded-xl text-sm font-bold text-white">
                {getText("高度なルールを管理", "Manage Advanced Rules")}
              </button>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
};

export default CustomList;

/* ------------------ Small Helper ------------------ */

const MetricCard = ({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
}) => (
  <div className="p-4 bg-[#1c1f2a] rounded-xl border border-[#2d313e]">
    <span className="text-[10px] text-gray-500 font-bold uppercase">{label}</span>
    <div className="flex items-baseline gap-2 mt-1">
      <span
        className={`text-2xl font-bold ${highlight ? "text-emerald-400 italic" : "text-white"}`}
      >
        {value}
      </span>
      {sub && <span className="text-[10px] text-gray-600">{sub}</span>}
    </div>
  </div>
);
