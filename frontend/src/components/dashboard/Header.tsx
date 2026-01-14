import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useShop } from "@/context/ShopContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Store,
  ChevronDown,
  Zap,
  HelpCircle,
  BookOpen,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  sidebarOpen: boolean;
  onMobileMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, onMobileMenuToggle }) => {
  const { user, logout } = useAuth();
  const { shop, plan, isPlanGrowth } = useShop();
  const { t, language, setLanguage } = useLanguage();

  return (
    <motion.header
      initial={false}
      animate={{ 
        marginLeft: typeof window !== 'undefined' && window.innerWidth >= 640 
          ? (sidebarOpen ? 256 : 72) 
          : 0 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-16 fixed top-0 right-0 left-0 z-50 border-b border-[#1e212b] bg-[#0d0e14]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between"
    >
      {/* Mobile Menu Button */}
      <button
        onClick={onMobileMenuToggle}
        className="sm:hidden p-2 text-gray-400 hover:text-white transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* LEFT — Store Info */}
      <div className="items-center gap-4 hidden sm:flex">
        <div className="flex items-center gap-3 bg-[#161922] px-3 py-1.5 rounded-lg border border-[#2d313e]">
          <div className="w-8 h-8 bg-[#1c1f2a] rounded flex items-center justify-center text-gray-400">
            <Store size={18} />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight text-white">
              {shop?.name || t.header.yourStore}
            </span>
            <span className="text-[10px] text-gray-500 leading-tight">
              {shop?.domain}
            </span>
          </div>

          <ChevronDown size={14} className="text-gray-500 ml-2" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex ml-auto sm:ml-0 items-center gap-6">
        {/* Language Toggle */}
        <div className="flex items-center bg-[#161922] rounded-lg p-1 border border-[#2d313e]">
          <button
            onClick={() => setLanguage("ja")}
            className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${
              language === "ja"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            JA
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 text-[10px] font-bold rounded transition-all ${
              language === "en"
                ? "bg-purple-600 text-white shadow-lg"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            EN
          </button>
        </div>

        {/* Manual + Plan */}
        <div className="hidden sm:flex items-center gap-3 bg-[#161922] px-4 py-1.5 rounded-xl border border-[#2d313e]">
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <BookOpen size={16} className="group-hover:text-purple-400" />
            <span className="text-xs font-bold">
              {language === "ja" ? "マニュアル" : "Manual"}
            </span>
          </button>

          <div className="w-[1px] h-4 bg-[#2d313e] mx-1" />

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                isPlanGrowth
                  ? "bg-purple-900/40 text-purple-400 border-purple-500/40"
                  : "bg-gray-800 text-gray-400 border-gray-700"
              }`}
            >
              {plan.toUpperCase()}
            </span>

            {!isPlanGrowth && (
              <button className="flex items-center gap-1.5 bg-[#2d1b54] text-purple-400 px-2 py-1 rounded-lg border border-[#4c3583] hover:bg-[#39246a] transition-colors text-[10px] font-bold">
                <Zap size={12} fill="currentColor" />
                UPGRADE
              </button>
            )}
          </div>
        </div>

        <div className="h-6 w-[1px] bg-[#1e212b]" />

        {/* Help */}
        <button className="text-gray-400 hover:text-white transition-colors">
          <HelpCircle size={20} />
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg ring-2 ring-purple-600/20">
              {user?.name?.charAt(0) || "U"}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <Link to="/dashboard/settings">
            <DropdownMenuItem className="gap-2">
              <User className="w-4 h-4" />
              {t.header.userMenu.accountSettings}
            </DropdownMenuItem></Link>
            <DropdownMenuItem className="gap-2">
              <HelpCircle className="w-4 h-4" />
              {t.header.userMenu.helpSupport}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={logout}
              className="gap-2 text-destructive"
            >
              <LogOut className="w-4 h-4" />
              {t.header.userMenu.signOut}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
};

export default Header;
