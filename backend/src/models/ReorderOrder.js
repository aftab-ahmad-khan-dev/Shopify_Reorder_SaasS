import mongoose from "mongoose";

const reorderOrderSchema = new mongoose.Schema(
  {
    // Original Order Info
    originalOrder: {
      shopifyOrderId: { type: String, required: true },
      orderName: String,
      createdAt: Date,
      processedAt: Date,
      financialStatus: String,
      fulfillmentStatus: String,

      totalPrice: {
        amount: String,
        currency: String,
      },

      items: [
        {
          title: String,
          variantId: String,
          sku: String,
          quantity: Number,
          price: {
            amount: String,
            currency: String,
          },
        },
      ],

      fulfillment: {
        status: String,
        trackingNumber: String,
        trackingCompany: String,
        trackingUrl: String,
      },
    },

    // New Reorder Info
    reorderedOrder: {
      shopifyOrderId: String,
      orderName: String,
      createdAt: Date,
    },

    // Meta
    status: {
      type: String,
      enum: ["CREATED", "FAILED"],
      default: "CREATED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ReorderOrder", reorderOrderSchema);
