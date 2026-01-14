// controllers/shopify.controller.js

import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { generateApiResponse, generateErrorApiResponse } from "../utils/response.util.js";
import ReorderOrder from "../models/ReorderOrder.js";
const storeDomain = process.env.STOREDOMAIN;
const accessToken = process.env.ACCESSTOKEN;

export default class ShopifyController {
  static async getAllOrders(req, res) {
    try {


      if (!storeDomain || !accessToken) {
        return generateErrorApiResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "storeDomain and accessToken are required"
        );
      }

      let orders = [];
      let hasNextPage = true;
      let cursor = null;

      while (hasNextPage) {
        const query = `
  query ($cursor: String) {
    orders(first: 250, after: $cursor, sortKey: PROCESSED_AT) {
      nodes {
        id
        name
        createdAt
        displayFinancialStatus
        displayFulfillmentStatus
        totalPriceSet {
          shopMoney {
            amount
            currencyCode
          }
        }
        customer {
          firstName
          lastName
          email
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        hasNextPage
      }
    }
  }
`;


        const response = await axios.post(
          `https://${storeDomain}/admin/api/2024-01/graphql.json`,
          {
            query,
            variables: { cursor },
          },
          {
            headers: {
              "X-Shopify-Access-Token": accessToken,
              "Content-Type": "application/json",
            },
          }
        );

        const orderData = response.data?.data?.orders;
        if (!orderData) {
          console.error("Shopify GraphQL Errors:", response.data.errors);
          throw new Error("Invalid Shopify GraphQL response");
        }
        orders.push(...orderData.nodes);
        hasNextPage = orderData.pageInfo.hasNextPage;
        cursor = orderData.pageInfo.endCursor;
      }

      return generateApiResponse(
        res,
        StatusCodes.OK,
        "Orders retrieved successfully",
        {
          total: orders.length,
          orders,
        }
      );
    } catch (error) {
      console.error("Shopify Orders Error:", error.response?.data || error.message);

      return generateErrorApiResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to fetch orders from Shopify"
      );
    }
  }

  static async getOrderById(req, res) {
    try {
      const { orderId } = req.body;

      if (!storeDomain || !accessToken || !orderId) {
        return generateErrorApiResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "storeDomain, accessToken and orderId are required"
        );
      }

      const query = `
      query ($id: ID!) {
        order(id: $id) {
          id
          name
          createdAt
          processedAt
          displayFinancialStatus
          displayFulfillmentStatus

          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }

          customer {
            firstName
            lastName
            email
            phone
          }

          shippingAddress {
            name
            address1
            address2
            city
            province
            country
            zip
            phone
          }

          billingAddress {
            name
            address1
            city
            country
            zip
          }

          lineItems(first: 50) {
            nodes {
              title
              quantity
              sku
               variant {
                id
                sku
              }
              originalUnitPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
            }
          }

          fulfillments {
            status
            trackingInfo {
              number
              company
              url
            }
          }
        }
      }
    `;

      const response = await axios.post(
        `https://${storeDomain}/admin/api/2024-01/graphql.json`,
        {
          query,
          variables: { id: `gid://shopify/Order/${orderId}` },
        },
        {
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      const order = response.data?.data?.order;

      if (!order) {
        return generateErrorApiResponse(
          res,
          StatusCodes.NOT_FOUND,
          "Order not found"
        );
      }

      return generateApiResponse(
        res,
        StatusCodes.OK,
        "Order retrieved successfully",
        order
      );
    } catch (error) {
      console.error(
        "Get Order By ID Error:",
        error.response?.data || error.message
      );

      return generateErrorApiResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to fetch order details"
      );
    }
  }

  static async reorderOrders(req, res) {
    try {
      const { order } = req.body;

      if (!storeDomain || !accessToken || !order) {
        return generateErrorApiResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "storeDomain, accessToken and order data are required"
        );
      }

      // Build line items for new order
      const lineItems = order.lineItems.nodes
        .filter(item => item.variant?.id)
        .map(item => ({
          variantId: item.variant.id,
          quantity: item.quantity
        }));


      // Build input for orderCreate
      const orderInput = {
        lineItems,
        customer: order.customer ? { id: order.customer.id } : undefined,
        shippingAddress: order.shippingAddress || undefined,
        billingAddress: order.billingAddress || undefined,
        financialStatus: "PAID"
      };

      const mutation = `
        mutation createOrder($input: OrderInput!) {
          orderCreate(input: $input) {
            order {
              id
              name
              createdAt
              lineItems(first: 50) {
                nodes {
                  title
                  quantity
                }
              }
            }
            userErrors {
              field
              message
              code
            }
          }
        }
      `;

      const response = await axios.post(
        `https://${storeDomain}/admin/api/2024-01/graphql.json`,
        { query: mutation, variables: { input: orderInput } },
        { headers: { "X-Shopify-Access-Token": accessToken, "Content-Type": "application/json" } }
      );

      const data = response.data?.data?.orderCreate;
      if (data.userErrors.length > 0) {
        return generateErrorApiResponse(
          res,
          StatusCodes.BAD_REQUEST,
          data.userErrors.map(e => e.message).join(", ")
        );
      }

      return generateApiResponse(
        res,
        StatusCodes.OK,
        "Order reordered successfully",
        data.order
      );

    } catch (error) {
      console.error("Reorder Order Error:", error.response?.data || error.message);
      return generateErrorApiResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to reorder order"
      );
    }
  }
  static async reorderOrder(req, res) {
    try {
      const { orderId } = req.body;
      if (!orderId) {
        return res.status(400).json({ message: "orderId is required" });
      }

      const getOrderQuery = `
      query getOrder($id: ID!) {
        order(id: $id) {
          id
          name
          createdAt
          processedAt
          displayFinancialStatus
          displayFulfillmentStatus

          totalPriceSet {
            shopMoney {
              amount
              currencyCode
            }
          }

          customer {
            firstName
            lastName
            email
            phone
          }

          shippingAddress {
            name
            address1
            address2
            city
            province
            country
            zip
            phone
          }

          billingAddress {
            name
            address1
            city
            country
            zip
          }

          lineItems(first: 50) {
            nodes {
              title
              quantity
              sku
               variant {
                id
                sku
              }
                quantity
              originalUnitPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
            }
          }

          fulfillments {
            status
            trackingInfo {
              number
              company
              url
            }
          }
        }
      }
    `;

      const getOrderRes = await axios.post(
        `https://${storeDomain}/admin/api/2024-01/graphql.json`,
        {
          query: getOrderQuery,
          variables: { id: orderId },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken,
          },
        }
      );
      console.log(
        "GET ORDER DATA 👉",
        JSON.stringify(getOrderRes.data, null, 2)
      );

      const orderData = getOrderRes.data.data.order;
      if (!orderData) {
        return res.status(404).json({ message: "Original order not found" });
      }

      // === STEP 2: Prepare lineItems for reorder ===
      const lineItems = orderData.lineItems.nodes.map((item) => ({
        variantId: item.variant.id,
        quantity: item.quantity,
      }));

      // === STEP 3: Create new order with same items ===
      const createOrderMutation = `
      mutation {
        orderCreate(
          order: {
            email: "${orderData.email || "customer@example.com"}"
            lineItems: ${JSON.stringify(lineItems).replace(/"([^"]+)":/g, '$1:')}
            note: "Reorder of ${orderData.name}"
          }
        ) {
          order {
            id
            name
            createdAt
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

      const createOrderRes = await axios.post(
        `https://${storeDomain}/admin/api/2024-01/graphql.json`,
        { query: createOrderMutation },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Access-Token": accessToken,
          },
        }
      );
      console.log(
        "CREATE ORDER DATA 👉",
        JSON.stringify(createOrderRes.data, null, 2)
      );

      const { orderCreate } = createOrderRes.data.data;
      if (orderCreate.userErrors.length > 0) {
        return res.status(400).json({ errors: orderCreate.userErrors });
      }
      const items = orderData.lineItems.nodes.map((item) => ({
        title: item.title,
        variantId: item.variant?.id,
        sku: item.variant?.sku,
        quantity: item.quantity,
        price: {
          amount: item.originalUnitPriceSet.shopMoney.amount,
          currency: item.originalUnitPriceSet.shopMoney.currencyCode,
        },
      }));
      const fulfillment = orderData.fulfillments?.[0];

      const fulfillmentData = fulfillment
        ? {
          status: fulfillment.status,
          trackingNumber: fulfillment.trackingInfo?.[0]?.number,
          trackingCompany: fulfillment.trackingInfo?.[0]?.company,
          trackingUrl: fulfillment.trackingInfo?.[0]?.url,
        }
        : null;
      await ReorderOrder.create({
        originalOrder: {
          shopifyOrderId: orderData.id,
          orderName: orderData.name,
          createdAt: orderData.createdAt,
          processedAt: orderData.processedAt,
          financialStatus: orderData.displayFinancialStatus,
          fulfillmentStatus: orderData.displayFulfillmentStatus,
          totalPrice: {
            amount: orderData.totalPriceSet.shopMoney.amount,
            currency: orderData.totalPriceSet.shopMoney.currencyCode,
          },
          items,
          fulfillment: fulfillmentData,
        },

        reorderedOrder: {
          shopifyOrderId: orderCreate.order.id,
          orderName: orderCreate.order.name,
          createdAt: orderCreate.order.createdAt,
        },
      });
      return res.status(200).json({
        message: `Order ${orderData.name} reordered successfully`,
        newOrder: orderCreate.order,
      });
    } catch (error) {
      console.error("Reorder Order Error:", error.response?.data || error.message);
      return res.status(500).json({ message: "Failed to reorder order" });
    }
  }

  static async generateAccessToken(req, res) {
    try {
      const { storeDomain, clientId, clientSecret, code } = req.body;

      if (!storeDomain || !clientId || !clientSecret || !code) {
        return generateErrorApiResponse(
          res,
          StatusCodes.BAD_REQUEST,
          "storeDomain, clientId, clientSecret, and code are required"
        );
      }

      const response = await axios.post(
        `https://${storeDomain}/admin/oauth/access_token`,
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        }
      );

      const { access_token } = response.data;

      return generateApiResponse(
        res,
        StatusCodes.OK,
        "Access token generated successfully",
        {
          storeDomain,
          accessToken: access_token,
        }
      );
    } catch (error) {
      console.error("Generate Access Token Error:", error.response?.data || error.message);
      return generateErrorApiResponse(
        res,
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to generate access token"
      );
    }
  }
  static getAuthLink(req, res) {
    try {
      const storeDomain = "reorderos-test.myshopify.com"; // Shopify store domain
      const clientId = "d3eb0514572cd6ffc3ba17bb40b71e14"; // Shopify app Client ID
      const redirectUri = encodeURIComponent("http://localhost:3000/api/shopify/callback"); // jahan redirect hoga
      const scopes = encodeURIComponent("read_orders,write_orders"); // required scopes
      const state = "random_string_123"; // security purpose

      const link = `https://${storeDomain}/admin/oauth/authorize?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}&grant_options[]=per-user`;

      return res.json({
        message: "Shopify OAuth link generated",
        link,
      });
    } catch (error) {
      console.error("Generate Auth Link Error:", error.message);
      return res.status(500).json({
        message: "Failed to generate auth link",
      });
    }
  }
}
