// src/pages/Overview.tsx
import React from "react";
import {
  Activity,
  Layers,
  TrendingUp,
  ChevronRight,
  RefreshCw,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PageStatus } from "@/components/dashboard/PageStatus";

interface OverviewProps {
  plan?: "Starter" | "Growth";
  lang?: "ja" | "en";
  setActiveTab?: (tab: string) => void;
}

const Overview: React.FC<OverviewProps> = ({
  plan = "Starter",
  lang = "ja",
  setActiveTab = () => { },
}) => {
  const { t, language } = useLanguage();

  const getText = (jaText: string, enText: string) => {
    return language === 'ja' ? jaText : enText;
  };
  const colorMap = {
    emerald: {
      text: "text-emerald-400",
      bg: "bg-emerald-400",
    },
    purple: {
      text: "text-purple-400",
      bg: "bg-purple-400",
    },
    blue: {
      text: "text-blue-400",
      bg: "bg-blue-400",
    },
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <PageHeader
        title={getText("概要", "Overview")}
        description={getText(
          "再注文インフラの現在地を確認し、次のアクションを決定します。",
          "Check the current state of reorder infrastructure and decide the next action."
        )}
        plan={plan}
      />

      <PageStatus
        status="active"
        location={getText(
          "マイページ / 注文完了ページ",
          "My Page / Order Confirmation Page"
        )}
        lastUpdated="2024-03-20 14:30"
      />

      {/* Health Summary */}
      <section className="bg-gradient-to-br from-[#1c1f2a] to-[#11131a] border border-[#2d313e] p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity size={18} className="text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                {getText("ヘルスステータス", "Health Status")}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">
              {plan === "Starter"
                ? getText(
                  "再注文インフラは 順調に機能しています",
                  "Reorder infrastructure is functioning smoothly"
                )
                : getText(
                  "再注文インフラは 非常に高い水準で最適化されています",
                  "Reorder infrastructure is optimized at a very high standard"
                )}
            </h2>

            <p className="text-sm text-gray-400 max-w-2xl">
              {getText(
                "再注文しやすい顧客に、迷わず買える導線が表示されています。",
                "A direct purchase path is shown to customers likely to reorder."
              )}
            </p>
          </div>

          <div className="flex gap-8 items-center border-l border-[#2d313e] pl-8">
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                {getText("再注文率", "Reorder Rate")}
              </p>
              <p className="text-3xl font-bold text-white">22.5%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
                ROI
              </p>
              <p className="text-3xl font-bold text-emerald-400 italic">
                12.4x
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Systems + Next Action */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Systems */}
        <section className="lg:col-span-2 bg-[#11131a] border border-[#1e212b] p-6 rounded-xl">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
            {getText("稼働中の仕組みと影響度", "Active Systems & Impact")}
          </h3>

          <div className="space-y-4">
            {[
              {
                name: getText("ワンクリック再注文", "One-click Reorder"),
                impact: "82%",
                color: "emerald",
                width: "w-[82%]",
              },
              {
                name: getText("カスタム再注文", "Custom Reorder"),
                impact: "53%",
                color: "purple",
                width: "w-[53%]",
              },
              {
                name: getText("レコメンデーション", "Recommendation"),
                impact: "30%",
                color: "blue",
                width: "w-[30%]",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-4 bg-[#1c1f2a] border border-[#2d313e] rounded-xl"
              >
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Layers size={14} className="text-gray-400" />
                    <span className="text-sm font-bold text-white">
                      {item.name}
                    </span>
                  </div>

                  <span className={`${colorMap[item.color].text} font-bold`}>
                    {item.impact}
                  </span>
                </div>

                <div className="h-1 bg-[#11131a] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${colorMap[item.color].bg} rounded-full ${item.width}`}
                  />
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* Next Best Action */}
        <section className="bg-purple-900/10 border border-purple-500/30 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-purple-400" />
              <h3 className="text-sm font-bold text-purple-400 uppercase">
                {getText("次のおすすめ設定", "Next Best Action")}
              </h3>
            </div>

            <h4 className="text-lg font-bold text-white mb-2">
              {getText(
                "カスタム再注文リストを1つ追加",
                "Add 1 Custom Reorder List"
              )}
            </h4>

            <p className="text-xs text-gray-400">
              {getText(
                "特定カテゴリ向けの再注文リストを作成すると売上が伸びます。",
                "Create a custom reorder list for specific categories to increase revenue."
              )}
            </p>
          </div>

          <button
            onClick={() => setActiveTab("custom-list")}
            className="mt-6 flex items-center justify-between bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl"
          >
            {getText("設定ページへ移動", "Go to Settings")}
            <ArrowRight size={16} />
          </button>
        </section>
      </div>

      {/* Shortcuts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: getText("ロジックを編集", "Edit Logic"), tab: "thinking-logic", icon: <RefreshCw size={14} /> },
          { label: getText("コピーを調整", "Adjust Copy"), tab: "copy-settings", icon: <Plus size={14} /> },
          { label: getText("通知を設定", "Notifications"), tab: "notifications", icon: <Plus size={14} /> },
          { label: getText("全履歴を見る", "View History"), tab: "reorder-history", icon: <ChevronRight size={14} /> },
        ].map((item) => (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className="flex items-center gap-2 p-3 bg-[#11131a] border border-[#1e212b] rounded-lg text-[10px] font-bold text-gray-400 hover:text-white"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Overview;
