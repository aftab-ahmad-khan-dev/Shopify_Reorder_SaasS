import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { apiPost } from "../../BackendServices/ApiCalls";
import { useLanguage } from "@/context/LanguageContext";

import {
  ArrowLeft,
  Package,
  Calendar,
  CreditCard,
  Truck,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle,
  ShoppingBag
} from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [reordering, setReordering] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await apiPost("/shopify/getOrderById", { orderId: id });
        if (res?.isSuccess) setOrder(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-muted-foreground">{t.orderDetails.loadingOrder}</p>
      </div>
    </div>
  );

  if (!order) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
        <p className="text-xl font-semibold text-muted-foreground">{t.orderDetails.orderNotFound}</p>
      </div>
    </div>
  );



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> {t.orderDetails.back}
          </Button>
          <Package className="w-6 h-6 text-muted-foreground" />
                      <h1 className="text-2xl font-bold">{order.name}</h1>

        </div>
        <div className="flex gap-2">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${order.displayFinancialStatus === "PAID"
                ? "bg-green-500/10 text-green-500"
                : "bg-yellow-500/10 text-yellow-500"
                }`}>
                {order.displayFinancialStatus ? order.displayFinancialStatus : t.orderDetails.unpaid}
              </span>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${order.displayFulfillmentStatus === "FULFILLED"
                ? "bg-blue-500/10 text-blue-500"
                : "bg-gray-500/10 text-gray-500"
                }`}>
                {order.displayFulfillmentStatus}
              </span>
          </div>
          <Button
            className="min-w-24 mt-auto"
            variant="default"
            size="sm"
            disabled={reordering}
            onClick={async () => {
              setReordering(true);
              try {
                const res = await apiPost("/shopify/reorderOrder", { orderId: order.id });
                if (res?.message) {
                  toast({
                    title: t.orderDetails.toast.success,
                    description: res.message,
                    variant: "default"
                  });
                } else {
                  toast({
                    title: t.orderDetails.toast.error,
                    description: t.orderDetails.toast.failedToReorder,
                    variant: "destructive"
                  });
                }
              } catch (err) {
                console.error(err);
                toast({
                  title: t.orderDetails.toast.error,
                  description: t.orderDetails.toast.failedToReorder,
                  variant: "destructive"
                });
              } finally {
                setReordering(false);
              }
            }}
          >
            {reordering ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              </>
            ) : (
              t.orderDetails.reorder
            )}
          </Button>

        </div>

      </div>

      {/* Order Info */}
      <div className="glass-card rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-semibold mb-4">{t.orderDetails.orderInformation}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{t.orderDetails.orderId}</span>
            </div>
            <p className="font-semibold">{order.id}</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{t.orderDetails.totalAmount}</span>
            </div>
            <p className="font-semibold text-success">
              {order.totalPriceSet.shopMoney.amount} {order.totalPriceSet.shopMoney.currencyCode}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{t.orderDetails.orderDate}</span>
            </div>
            <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">{t.orderDetails.products}</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.orderDetails.product}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.orderDetails.quantity}</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">{t.orderDetails.price}</th>
              </tr>
            </thead>
            <tbody>
              {order.lineItems.nodes.map((item, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 font-medium">{item.title}</td>
                  <td className="p-4">{item.quantity}</td>
                  <td className="p-4 font-medium text-success">
                    {item.originalUnitPriceSet.shopMoney.amount} {item.originalUnitPriceSet.shopMoney.currencyCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Fulfillments */}
      {order.fulfillments.length > 0 && (
        <div className="glass-card rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">{t.orderDetails.fulfillment}</h2>
          </div>
          {order.fulfillments.map((f, idx) => (
            <div key={idx} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-medium">{t.orderDetails.status}: {f.status}</span>
              </div>
              {f.trackingInfo?.map((trackingItem, tIdx) => (
                <div key={tIdx} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div>
                    <p className="font-medium">{trackingItem.company}</p>
                    <p className="text-sm text-muted-foreground">{t.orderDetails.tracking}: {trackingItem.number}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={trackingItem.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t.orderDetails.track}
                    </a>
                  </Button>
                </div>
              )) || null}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default OrderDetails;
