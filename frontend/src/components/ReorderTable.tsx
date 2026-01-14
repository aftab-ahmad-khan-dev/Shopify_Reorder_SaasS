import React from 'react';
import { Order, PaymentStatus, FulfillmentStatus, ReorderType, TriggerType } from '../pages/types';
import { MousePointer2, Mail, BellRing, Clock } from 'lucide-react';

interface ReorderTableProps {
  orders: Order[];
  onViewDetails: (order: Order) => void;
  plan: 'Starter' | 'Growth';
}

const PaymentBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
  const styles = {
    PAID: 'bg-[#122b22] text-[#10b981] border-[#1a4031]',
    UnPaid: 'bg-[#2b2412] text-[#f59e0b] border-[#40351a]',
    PARTIAL: 'bg-[#2b2b12] text-[#eab308] border-[#40401a]'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

const FulfillmentBadge: React.FC<{ status: FulfillmentStatus }> = ({ status }) => {
  const styles = {
    FULFILLED: 'bg-[#121b2b] text-[#3b82f6] border-[#1a2840]',
    UNFULFILLED: 'bg-[#1a1c22] text-[#6b7280] border-[#2d313e]',
    PROCESSING: 'bg-[#122b2b] text-[#06b6d4] border-[#1a4040]'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${styles[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

const ReorderTypeBadge: React.FC<{ type: ReorderType }> = ({ type }) => {
  const styles = {
    'One-click': 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5',
    'Custom': 'text-purple-400 border-purple-500/30 bg-purple-500/5',
    'Recommended': 'text-blue-400 border-blue-500/30 bg-blue-500/5'
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${styles[type]}`}>
      {type}
    </span>
  );
};

const TriggerIcon: React.FC<{ trigger: TriggerType }> = ({ trigger }) => {
  switch (trigger) {
    case 'My Page': return <MousePointer2 size={12} className="text-gray-400" />;
    case 'Email': return <Mail size={12} className="text-gray-400" />;
    case 'Notification': return <BellRing size={12} className="text-gray-400" />;
    default: return null;
  }
};

const ReorderTable: React.FC<ReorderTableProps> = ({ orders, onViewDetails, plan }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#1e212b] bg-[#11131a]">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="border-b border-[#1e212b] text-gray-500 text-[10px] font-bold uppercase tracking-wider bg-[#161922]">
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Order #</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">Trigger</th>
            <th className="px-6 py-4">Interval</th>
            <th className="px-6 py-4">Amount</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1e212b]">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-[#161922] transition-colors group">
              <td className="px-6 py-4">
                <p className="text-sm font-bold text-white leading-none mb-1">{order.customer}</p>
                <p className="text-[10px] text-gray-500 font-medium tracking-tighter">{order.date}</p>
              </td>
              <td className="px-6 py-4 text-sm font-mono font-bold text-gray-300">{order.orderNumber}</td>
              <td className="px-6 py-4">
                {plan === 'Growth' ? (
                  <ReorderTypeBadge type={order.reorderType} />
                ) : (
                  <span className="text-[10px] text-gray-600 italic">Locked</span>
                )}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <TriggerIcon trigger={order.trigger} />
                  <span className="text-xs text-gray-400">{order.trigger}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-300">
                  <Clock size={12} className="text-gray-500" />
                  <span>{order.intervalDays} days</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm font-bold text-white">
                ¥{order.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1.5">
                  <PaymentBadge status={order.paymentStatus} />
                  <FulfillmentBadge status={order.fulfillmentStatus} />
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <button 
                  onClick={() => onViewDetails(order)}
                  className="bg-[#1c1f2a] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg border border-[#2d313e] hover:border-[#8a70d6] hover:text-[#8a70d6] transition-all"
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReorderTable;