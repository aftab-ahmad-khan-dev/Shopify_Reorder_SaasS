// src/config/whitelist.js

export const WHITELIST = {
  overall: [
    "/health",
    "/auth/register",
    "/auth/login",
    "/auth/logout",
    "/auth/refresh-token",
    "/shopify/orders",
    "/shopify/getOrderById",
    "/shopify/reorderOrder",
    // "/shopify/generateAccessToken",
    // "/shopify/code",
    // "/auth/me",
  ],

  mobile: ["/mobile/login", "/mobile/register", "/mobile/forgot-password"],

  admin: ["/admin/login", "/admin/register"],

  // Add more categories as needed
  other: [],
};
