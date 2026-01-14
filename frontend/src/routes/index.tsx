import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Overview from "@/pages/dashboard/Overview";
import LogicEditor from "@/pages/dashboard/LogicEditor";
import VisibilityRules from "@/pages/dashboard/VisibilityRules";
import Templates from "@/pages/dashboard/Templates";
import CopyLanguage from "@/pages/dashboard/CopyLanguage";
import Analytics from "@/pages/dashboard/Analytics";
import Recommendations from "@/pages/dashboard/Recommendations";
import Notifications from "@/pages/dashboard/Notifications";
import ReorderHistory from "@/pages/dashboard/ReorderHistory";
import SettingsPage from "@/pages/dashboard/Settings";
import NotFound from "@/pages/NotFound";
import OrderDetail from "@/pages/dashboard/OrderDetail";
import CustomList from "@/pages/dashboard/CustomList";
import ReorderRecommendation from "@/pages/dashboard/ReorderRecommendation";
import ConditionalVisibilityPage from "@/pages/dashboard/ConditionalVisibilityPage";
import ThinkingLogicEditor from "@/pages/dashboard/ThinkingLogicEditor";
import IndustryTemplate from "@/pages/dashboard/IndustryTemplate";
import CopySettings from "@/pages/dashboard/CopySettings";
import AnalyticsRoi from "@/pages/dashboard/AnalyticsRoi";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<Overview />} />
      <Route path="logic-editor" element={<LogicEditor />} />
      <Route path="visibility" element={<VisibilityRules />} />
      <Route path="CustomList" element={<CustomList />} />
      <Route path="ReorderRecommendation" element={<ReorderRecommendation />} />
      <Route path="ConditionalVisibilityPage" element={<ConditionalVisibilityPage />} />
      <Route path="ThinkingLogicEditor" element={<ThinkingLogicEditor />} />
      <Route path="IndustryTemplate" element={<IndustryTemplate />} />
      <Route path="CopySettings" element={<CopySettings />} />
      <Route path="templates" element={<Templates />} />
      <Route path="copy" element={<CopyLanguage />} />
      <Route path="analytics" element={<AnalyticsRoi />} />
      <Route path="recommendations" element={<Recommendations />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="history" element={<ReorderHistory />} />
      <Route path="orderDetail/:id" element={<OrderDetail />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;