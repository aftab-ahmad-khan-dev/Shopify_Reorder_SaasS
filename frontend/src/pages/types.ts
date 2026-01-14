export type PaymentStatus = 'PAID' | 'UnPaid' | 'PARTIAL';
export type FulfillmentStatus = 'FULFILLED' | 'UNFULFILLED' | 'PROCESSING';
export type ReorderType = 'One-click' | 'Custom' | 'Recommended';
export type TriggerType = 'My Page' | 'Email' | 'Notification';

export interface Order {
  id: string;
  customer: string;
  orderNumber: string;
  date: string;
  amount: number;
  paymentStatus: PaymentStatus;
  fulfillmentStatus: FulfillmentStatus;
  reorderType: ReorderType;
  trigger: TriggerType;
  intervalDays: number;
}