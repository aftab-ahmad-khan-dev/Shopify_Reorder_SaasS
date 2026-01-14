import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiGet, apiPost } from "../../BackendServices/ApiCalls";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Download, Loader2, History, ChevronLeft, ChevronRight, Filter, ExternalLink, CheckCircle, BrainCircuit, MousePointer2, TrendingUp, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { PlanGuard } from "@/components/dashboard/PlanGuard";
import ReorderTable from "@/components/ReorderTable";
import { Order, PaymentStatus, FulfillmentStatus, ReorderType, TriggerType } from "../types";
import { useToast } from "@/hooks/use-toast";

interface ReorderHistoryProps {
  plan?: "Starter" | "Growth";
  lang?: "ja" | "en";
  setActiveTab?: (tab: string) => void;
}

const ReorderHistory: React.FC<ReorderHistoryProps> = ({
  plan = "Starter",
  lang = "ja",
  setActiveTab = () => { },
}) => {
  const { t, language } = useLanguage();

  const getText = (jaText: string, enText: string) => {
    return language === 'ja' ? jaText : enText;
  };   // plan prop - adjust according to your auth/context
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [reordering, setReordering] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiGet("/shopify/orders");
        if (data?.isSuccess) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const customer = (order.customer?.firstName || "Guest").toLowerCase();
    const orderName = (order.name || "").toLowerCase();
    const amount = (order.totalPriceSet?.shopMoney?.amount || "").toString();

    const query = search.toLowerCase();

    return customer.includes(query) || orderName.includes(query) || amount.includes(query);
  });
  console.log("🚀 ~ ReorderHistory ~ filteredOrders:", filteredOrders)

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const exportToCSV = () => {
    if (filteredOrders.length === 0) return;

    const headers = [
      t.reorderHistory.table.customer,
      t.reorderHistory.table.orderNumber,
      t.reorderHistory.table.amount,
      t.reorderHistory.table.payment,
      t.reorderHistory.table.fulfillment,
      t.reorderHistory.table.date,
    ];

    const rows = filteredOrders.map((order) => [
      order.customer?.firstName || t.reorderHistory.status.guest,
      order.name,
      `${order.totalPriceSet?.shopMoney?.amount || 0} ${order.totalPriceSet?.shopMoney?.currencyCode || ""}`,
      order.displayFinancialStatus || "Unknown",
      order.displayFulfillmentStatus || "Unknown",
      new Date(order.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "reorder_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const summaryStats = [
    { label: getText("再注文数", "Reorder Count"), value: orders.length.toString(), unit: getText("件", "orders") },
    { label: getText("再注文売上合計", "Total Revenue"), value: "¥2,842,000", unit: "" }, // ← TODO: real calc
    { label: getText("平均再注文単価", "Avg Reorder Value"), value: "¥5,420", unit: "" },
    { label: getText("再注文成功率", "Success Rate"), value: "98.2%", unit: "(Paid / Total)" },
  ];

  // Transform orders to match ReorderTable format
  const transformedOrders: Order[] = paginatedOrders.map((order) => ({
    id: order.id,
    customer: order.customer?.firstName || "Guest",
    orderNumber: order.name,
    date: new Date(order.createdAt).toLocaleDateString(),
    amount: parseFloat(order.totalPriceSet?.shopMoney?.amount || "0"),
    paymentStatus: (order.displayFinancialStatus === "PAID" ? "PAID" : "UnPaid") as PaymentStatus,
    fulfillmentStatus: (order.displayFulfillmentStatus || "UNFULFILLED") as FulfillmentStatus,
    reorderType: "One-click" as ReorderType,
    trigger: "My Page" as TriggerType,
    intervalDays: 30
  }));

  const handleViewDetails = async (order: Order) => {
    setSelectedOrder(order);
    setLoadingDetails(true);
    try {
      const numericId = order.id.split("/").pop();
      const res = await apiPost("/shopify/getOrderById", { orderId: numericId });
      if (res?.isSuccess) {
        setOrderDetails(res);
      }
    } catch (error) {
      console.error("Failed to load order details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleReorder = async () => {
    if (!orderDetails) return;
    setReordering(true);
    try {
      const res = await apiPost("/shopify/reorderOrder", { orderId: orderDetails.id });
      if (res?.message) {
        setSelectedOrder(false);
        toast({
          title: "Success",
          description: res.message,
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to reorder",
          variant: "destructive"
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to reorder",
        variant: "destructive"
      });
    } finally {
      setReordering(false);
    }
  };

  const handleTrackOrder = () => {
    if (orderDetails?.fulfillments?.length > 0) {
      const trackingUrl = orderDetails.fulfillments[0]?.trackingInfo?.[0]?.url;
      if (trackingUrl) {
        window.open(trackingUrl, '_blank');
      }
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500 pb-12">
      {/* Header */}
      <PageHeader
        title={getText("再注文履歴", "Reorder History")}
        description={getText(
          "発生した再注文の全履歴を確認します。これらは「売上の履歴書」であり、ROIの根拠となるデータです。",
          "Review full reorder history. These records are the 'resume of sales' and the foundation of ROI."
        )}
        plan={plan}
      />

      {/* ① Summary Cards */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <History size={16} className="text-purple-400" />
          {getText("再注文アクティビティ サマリー", "Reorder Activity Summary")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryStats.map((stat, i) => (
            <div key={i} className="bg-[#11131a] border border-[#1e212b] p-5 rounded-2xl">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-[10px] text-gray-500 font-medium">{stat.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ② Search + Filters + Export */}
      <section className="bg-[#11131a] border border-[#1e212b] p-6 rounded-2xl space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <Input
              className="w-full bg-[#0d0e14] border border-[#2d313e] rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-gray-600 focus:border-purple-500 transition-colors"
              placeholder={getText("注文番号、顧客名で検索...", "Search by order#, customer...")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-gray-500 font-bold uppercase">{getText("期間：", "Period:")}</p>
              <select className="bg-[#161922] border border-[#2d313e] rounded-lg px-3 py-1.5 text-[10px] font-bold text-gray-300">
                <option>{("Last 30 Days")}</option>
                <option>{("Last 90 Days")}</option>
                <option>{("All Time")}</option>
              </select>
            </div>

            <PlanGuard plan={plan} featureName={getText("高度なフィルタリング", "Advanced Filtering")}>
              <button className="flex items-center gap-2 bg-[#1c1f2a] border border-[#2d313e] px-4 py-1.5 rounded-lg text-[10px] font-bold text-gray-300 hover:text-white transition-all">
                <Filter size={14} /> {getText("詳細フィルタ", "More Filters")}
              </button>
            </PlanGuard>
          </div>
        </div>

        {/* Export area */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-[#1e212b] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/20 rounded-lg text-purple-400">
              <History size={16} />
            </div>
            <p className="text-[10px] text-gray-500 italic max-w-sm leading-relaxed">
              {getText(
                "このデータは、社内レポートや経理処理、広告ROI分析に使用できます。Growthプランでは詳細な項目カスタマイズが可能です。",
                "Use this data for reports, accounting, or ROI analysis. Column customization available in Growth."
              )}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:flex-none bg-[#1c1f2a] border-[#2d313e] hover:bg-[#2d313e] text-xs font-bold"
              onClick={exportToCSV}
            >
              <Download size={14} className="mr-2" />
              {getText("CSV出力", "Export CSV")}
            </Button>

            {plan === "Growth" && (
              <button className="flex items-center gap-2 text-purple-400 text-[10px] font-bold hover:text-purple-300 transition-colors px-2">
                {getText("エクスポート設定", "Export Settings")}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ③ Table */}
      <section className="bg-[#11131a] border border-[#1e212b] rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-purple-500" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-400">{t.reorderHistory.noOrders}</div>
        ) : (
          <>
            <ReorderTable
              orders={transformedOrders}
              onViewDetails={handleViewDetails}
              plan={plan}
            />

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-[#2d313e] text-sm text-gray-400">
              <p>
                {t.reorderHistory.pagination.showing
                  .replace("{start}", (startIndex + 1).toString())
                  .replace("{end}", Math.min(startIndex + itemsPerPage, filteredOrders.length).toString())
                  .replace("{total}", filteredOrders.length.toString())}
              </p>

              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="text-gray-400 hover:text-white"
                  >
                    <ChevronLeft size={16} />
                  </Button>

                  <span>
                    {t.reorderHistory.pagination.page
                      .replace("{current}", currentPage.toString())
                      .replace("{total}", totalPages.toString())}
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="text-gray-400 hover:text-white"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* Optional: Keep your fancy modal if you prefer modal over navigation */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#000]/50 backdrop-blur-md" onClick={() => setSelectedOrder(null)}></div>
          <div className="relative bg-[#11131a] border border-[#1e212b] w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[#1e212b] flex items-center justify-between bg-[#161922]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-900/40 rounded-2xl text-purple-400"><History size={24} /></div>
                <div>
                  <h4 className="text-lg font-bold text-white leading-none mb-1">{getText("注文詳細コンテキスト", "Reorder Context Details")}</h4>
                  <p className="text-xs text-gray-500 font-mono">{selectedOrder.orderNumber}</p>
                </div>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X size={20} className="text-gray-500" /></button>
            </div>

            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
              {/* Section 1: Reorder Context */}
              <section className="space-y-4">
                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <BrainCircuit size={14} className="text-purple-400" /> {getText("再注文の発生要因", "Reorder Generation Context")}
                </h5>
                <div className="p-5 bg-[#0d0e14] rounded-2xl border border-[#1e212b] space-y-4">
                  <p className="text-xs text-emerald-400 font-bold italic border-l-2 border-emerald-500 pl-3">
                    {getText("この再注文は以下のロジックに基づき表示・発生しました：", "This reorder was triggered based on the following logic:")}
                  </p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li className="flex items-center gap-2"><CheckCircle size={12} className="text-emerald-500" /> {getText("最終購入から", "Last purchase was")} {selectedOrder.intervalDays} {getText("日が経過", "days ago")}</li>
                    <li className="flex items-center gap-2"><CheckCircle size={12} className="text-emerald-500" /> {getText("在庫ステータス：有効", "Product was in stock")}</li>
                    <li className="flex items-center gap-2"><CheckCircle size={12} className="text-emerald-500" /> {getText("顧客タイプ：非定期便利用者", "Customer is non-subscriber")}</li>
                  </ul>
                </div>
              </section>

              {/* Section 2: Reorder Path */}
              <section className="space-y-4">
                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <MousePointer2 size={14} className="text-purple-400" /> {getText("行動プロセス", "Action Flow Path")}
                </h5>
                <div className="flex items-center gap-4">
                  <div className="flex-1 p-3 bg-[#1c1f2a] rounded-xl border border-[#2d313e] text-center">
                    <p className="text-[9px] text-gray-500 uppercase mb-1">{getText("表示場所", "Impression")}</p>
                    <p className="text-xs font-bold text-white">{selectedOrder.trigger}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-700" />
                  <div className="flex-1 p-3 bg-[#1c1f2a] rounded-xl border border-[#2d313e] text-center">
                    <p className="text-[9px] text-gray-500 uppercase mb-1">{getText("再注文タイプ", "Type")}</p>
                    <p className="text-xs font-bold text-white">{selectedOrder.reorderType}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-700" />
                  <div className="flex-1 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                    <p className="text-[9px] text-emerald-500/80 uppercase mb-1">{getText("注文完了", "Converted")}</p>
                    <p className="text-xs font-bold text-emerald-400">Success</p>
                  </div>
                </div>
              </section>

              {/* Section 3: Revenue Attribution */}
              <section className="space-y-4">
                <h5 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <TrendingUp size={14} className="text-purple-400" /> {getText("売上貢献の扱い", "Revenue Attribution")}
                </h5>
                <div className="p-4 bg-purple-900/10 border border-purple-500/20 rounded-2xl flex justify-between items-center">
                  <p className="text-xs text-purple-200">{getText("この注文は ROI 分析において「追加売上」としてカウントされています。", "This order is attributed as 'Incremental Revenue' in ROI analysis.")}</p>
                  <div className="text-right">
                    <p className="text-[9px] text-gray-500 uppercase">{getText("売上金額", "Attributed")}</p>
                    <p className="text-lg font-bold text-white">¥{selectedOrder.amount.toLocaleString()}</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="p-6 bg-[#0d0e14] border-t border-[#1e212b] flex justify-end gap-3">
              {orderDetails?.fulfillments?.[0]?.trackingInfo?.[0]?.url && (
                <button
                  onClick={handleTrackOrder}
                  className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-[#2d313e] rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all"
                >
                  <ExternalLink size={14} /> Track Order
                </button>)}
              <button
                onClick={handleReorder}
                disabled={reordering || !orderDetails}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 rounded-xl text-xs font-bold text-white shadow-lg shadow-emerald-900/20 transition-all"
              >
                {reordering ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <MousePointer2 size={14} />
                )}
                {reordering ? "Reordering..." : "Reorder Now"}
              </button>
              <button onClick={() => setSelectedOrder(null)} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-xl text-xs font-bold text-white shadow-lg shadow-purple-900/20 transition-all">
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReorderHistory;