import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useShop } from "@/context/ShopContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  LayoutDashboard,
  Brain,
  Filter,
  FileText,
  Languages,
  BarChart3,
  Lightbulb,
  Bell,
  Settings,
  History,
  ChevronLeft,
  Sparkles,
  Lock,
  RefreshCw,
  Package,
  Eye,
  BrainCircuit,
  Files,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, isMobileOpen = false, onMobileClose }) => {
  const location = useLocation();
  const { isPlanGrowth } = useShop();
  const { t } = useLanguage();

  const navItems = [
    {
      path: "/dashboard",
      icon: LayoutDashboard,
      label: t.sidebar.navigation.overview,
      requiresGrowth: false,
    },
    // {
    //   path: "/dashboard/logic-editor",
    //   icon: Brain,
    //   label: t.sidebar.navigation.thoughtLogic,
    //   requiresGrowth: true,
    // },
    {
      path: "/dashboard/CustomList",
      icon: Package,
      label: t.sidebar.navigation.CustomList,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/ReorderRecommendation",
      icon: Sparkles,
      label: t.sidebar.navigation.ReorderRecommendation,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/ConditionalVisibilityPage",
      icon: Eye,
      label: t.sidebar.navigation.ConditionalVisibilityPage,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/ThinkingLogicEditor",
      icon: BrainCircuit,
      label: t.sidebar.navigation.ThinkingLogicEditor,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/IndustryTemplate",
      icon: Files,
      label: t.sidebar.navigation.IndustryTemplate,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/CopySettings",
      icon: Languages,
      label: t.sidebar.navigation.CopySettings,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/notifications",
      icon: Bell,
      label: t.sidebar.navigation.notifications,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/analytics",
      icon: BarChart3,
      label: t.sidebar.navigation.analyticsRoi,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/history",
      icon: History,
      label: t.sidebar.navigation.reorderHistory,
      requiresGrowth: false,
    },
    {
      path: "/dashboard/settings",
      icon: Settings,
      label: t.sidebar.navigation.settings,
      requiresGrowth: false,
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={onMobileClose}
        />
      )}

      <AnimatePresence mode='wait'>
        <motion.aside
          initial={false}
          animate={{
            width: isOpen ? 265 : 80,
            x: typeof window !== 'undefined' && window.innerWidth < 640
              ? (isMobileOpen ? 0 : -265)
              : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 flex flex-col ${typeof window !== 'undefined' && window.innerWidth < 640
            ? (isMobileOpen ? 'flex' : 'hidden')
            : 'flex'
            }`}
        >
          {/* Logo */}
          <div className="px-6 mb-12 mt-4">
            <div className="flex items-center gap-4 group cursor-pointer relative">
              <div className="relative flex-shrink-0">
                {/* Soft Ambient Glow */}
                <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>

                {/* Outer Orbit Ring */}
                <div className="absolute -inset-1.5 border border-purple-500/10 rounded-2xl group-hover:rotate-180 transition-transform duration-1000 ease-in-out"></div>

                {/* Main Icon Container (Glass Style) */}
                <div className="relative w-11 h-11 bg-[#161922] border border-[#2d313e] rounded-xl flex items-center justify-center shadow-2xl overflow-hidden group-hover:border-purple-500/40 transition-colors duration-500">
                  {/* Internal Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/5 via-transparent to-white/5 opacity-50"></div>

                  <RefreshCw
                    size={22}
                    className="text-purple-400 relative z-10 transform group-hover:rotate-[360deg] transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    strokeWidth={2.5}
                  />

                  {/* Bottom Light Bar */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-[20px] font-black tracking-[-0.05em] text-white leading-none uppercase italic">REORDER</span>
                  <span className="text-[10px] font-black bg-gradient-to-br from-purple-400 to-indigo-400 bg-clip-text text-transparent uppercase tracking-[0.15em] ml-0.5">OS</span>
                </div>

                {/* Interactive Underline Indicator */}
                <div className="h-[2px] w-full mt-2 overflow-hidden rounded-full bg-[#1e212b]">
                  <div className="h-full w-1/4 bg-gradient-to-r from-purple-500 to-transparent group-hover:translate-x-48 transition-transform duration-1000 ease-in-out"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className='flex-1 overflow-y-auto no-scrollbar py-4 px-2'>
            <ul className='space-y-3'>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isLocked = item.requiresGrowth && !isPlanGrowth;
                const Icon = item.icon;

                return (
                  <li key={item.path}>
                    <NavLink
                      to={isLocked ? "#" : item.path}
                      onClick={(e) => isLocked && e.preventDefault()}
                      className={cn(
                        "nav-link relative group",
                        isActive && "active",
                        isLocked && "opacity-60 cursor-not-allowed"
                      )}
                    >
                      <Icon className='w-5 h-5 shrink-0' />
                      <AnimatePresence mode='wait'>
                        {isOpen && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.15 }}
                            className='whitespace-nowrap flex-1'
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      {isLocked && isOpen && (
                        <Lock className='w-3.5 h-3.5 text-muted-foreground' />
                      )}
                      {item.requiresGrowth && isOpen && !isLocked && (
                        <span className='plan-badge growth text-[10px]'>{t.sidebar.pro}</span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Collapse Button */}
          <div className='p-2 border-t border-sidebar-border'>
            <button
              onClick={onToggle}
              className='w-full flex items-center justify-end gap-2 p-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors'
            >
              <motion.div
                animate={{ rotate: isOpen ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className='w-5 h-5' />
              </motion.div>
              <AnimatePresence mode='wait'>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='text-sm'
                  >
                    {t.sidebar.collapse}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </motion.aside>
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
