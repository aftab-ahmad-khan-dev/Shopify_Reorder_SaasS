import { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowRight,
  Check,
  Brain,
  Zap,
  BarChart3,
  Shield,
  Clock,
  ListChecks,
  Target,
  Lightbulb,
  Mail,
  Twitter,
  Linkedin,
  Github,
  Home,
  Phone,
  Users,
  MessageSquare,
  Send,
  MapPin,
  Play,
  Star,
  TrendingUp,
  Package,
  Repeat,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import WhatsApp from "../Assets/whatsapp.png";
function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Landing() {
  const { t } = useLanguage();
  const [showSupport, setShowSupport] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "features", "pricing", "about", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t.landing.nav.home, path: "#home", icon: Home },
    { name: t.landing.nav.features, path: "#features", icon: Zap },
    { name: t.landing.nav.pricing, path: "#pricing", icon: BarChart3 },
    { name: t.landing.nav.about, path: "#about", icon: Users },
    { name: t.landing.nav.contact, path: "#contact", icon: Phone },
  ];

  const stats = [
    { value: "32%", label: t.landing.stats.reorderRate },
    { value: "15x", label: t.landing.stats.roi },
    { value: "50+", label: t.landing.stats.stores },
    { value: "10+", label: t.landing.stats.experience },
  ];

  const testimonials = [
    {
      quote:
        "ReorderOS transformed our repeat purchase rate. The one-click reorder feature alone increased our LTV by 28%.",
      author: "Sarah Chen",
      role: "CEO, Premium Pet Co",
      rating: 5,
    },
    {
      quote:
        "Finally, a tool that understands repeat purchases aren't just about reminders anymore. The behavior design approach works.",
      author: "Michael Rodriguez",
      role: "Head of Growth, NutriVita",
      rating: 5,
    },
    {
      quote:
        "We've tried subscription models before. ReorderOS gave us all the benefits without forcing customers into commitments.",
      author: "Emily Watson",
      role: "Founder, Clean Beauty Lab",
      rating: 5,
    },
  ];

  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative'>
      {/* Animated Background */}
      {/* Animated Background */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        {/* Changed: centered the ellipse and reduced left/right intensity */}
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/15 via-transparent to-transparent' />

        {/* Optional: keep your existing pulse blobs, they look great */}
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-violet-800/10 rounded-full blur-[120px] animate-pulse' />
        <div
          className='absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] animate-pulse'
          style={{ animationDelay: "2s" }}
        />

        {/* Grid overlay - unchanged */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-20" />
      </div>

      {/* WhatsApp Support */}
      <div className='fixed bottom-8 right-8 z-50'>
        <button
          onClick={() => setShowSupport(!showSupport)}
          className='group relative w-16 h-16  hover:scale-110 transition-transform duration-300 flex items-center justify-center'
        >
          <img src={WhatsApp} className='w-16 h-16 text-white' />
        </button>

        {showSupport && (
          <div className='absolute bottom-20 right-0 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom-4'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-semibold text-lg'>{t.landing.support.title}</h3>
              <button
                onClick={() => setShowSupport(false)}
                className='text-slate-400 hover:text-white'
              >
                ✕
              </button>
            </div>
            <div className='space-y-3'>
              <a
                href='https://wa.me/1234567890'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 hover:border-green-500/40 transition-all group'
              >
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg'>
                  <img src={WhatsApp} className='w-6 h-6 text-white' />
                </div>
                <div className='flex-1'>
                  <p className='font-medium text-white'>{t.landing.support.whatsapp.title}</p>
                  <p className='text-sm text-slate-400'>{t.landing.support.whatsapp.subtitle}</p>
                </div>
                <ArrowRight className='w-4 h-4 text-slate-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all' />
              </a>
              <a
                href='mailto:support@reorderos.com'
                className='flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group'
              >
                <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg'>
                  <Mail className='w-6 h-6 text-white' />
                </div>
                <div className='flex-1'>
                  <p className='font-medium text-white'>{t.landing.support.email.title}</p>
                  <p className='text-sm text-slate-400'>{t.landing.support.email.subtitle}</p>
                </div>
                <ArrowRight className='w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all' />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          scrolled
            ? "bg-slate-900/80 backdrop-blur-2xl border-b border-slate-800/50 shadow-xl"
            : "bg-transparent"
        )}
      >
        <div className='max-w-7xl mx-auto px-2 sm:px-6 h-20 flex items-center justify-between'>
          <div className="px-6 mb-12 mt-12">
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

          <div className='hidden md:flex items-center gap-10 bg-slate-800/40 backdrop-blur-md rounded-2xl px-2 py-2 border border-slate-700/50'>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className={cn(
                  "px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2 relative overflow-hidden group",
                  activeSection === item.path.slice(1)
                    ? "bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 text-white shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                )}
              >
                {activeSection === item.path.slice(1) && (
                  <div className='absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 blur-xl' />
                )}
                <item.icon className='w-4 h-4 relative z-10' />
                <span className='relative z-10'>{item.name}</span>
              </a>
            ))}
          </div>

          <a
            href='https://apps.shopify.com/reorderos'
            target='_blank'
            rel='noopener noreferrer'
            className='group relative px-2 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 font-medium rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 overflow-hidden'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
            <span className='relative z-10'>{t.landing.nav.shopify}</span>
          </a>
          <Link
            to='/login'
            className='group relative px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 font-medium rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 overflow-hidden'
          >
            <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
            <span className='relative z-10'>{t.landing.nav.login}</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section id='home' className='relative pt-32 pb-20 px-6 overflow-hidden'>
        <div className='relative max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Left Column */}
            <div className='relative z-10 flex flex-col justify-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-4'>
                <div className='w-2 h-2 rounded-full w-25 bg-violet-400 animate-pulse' />
                <span className='text-sm font-medium text-violet-300'>
                  {t.landing.hero.badge}
                </span>
              </div>

              <h1
                className='text-5xl lg:text-7xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-8'
                style={{ animationDelay: "0.1s" }}
              >
                <span className='bg-gradient-to-br from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-[1.1] block'>
                  {t.landing.hero.title}
                </span>
                <span className='bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent leading-[1.1] block'>
                  {t.landing.hero.titleHighlight}
                </span>
              </h1>

              <p
                className='text-xl lg:text-2xl text-slate-300 mb-8 leading-relaxed animate-in fade-in slide-in-from-bottom-12'
                style={{ animationDelay: "0.2s" }}
              >
                {t.landing.hero.subtitle}
              </p>

              <div
                className='flex flex-col sm:flex-row gap-4 mb-12 animate-in fade-in slide-in-from-bottom-16'
                style={{ animationDelay: "0.3s" }}
              >
                <a
                  href='https://apps.shopify.com/reorderos'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group relative px-8 py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 rounded-xl font-semibold shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-3 overflow-hidden'
                >
                  <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                  <Link to='/login' className='relative z-10'>
                    {t.landing.hero.startTrial}
                  </Link>
                  <ArrowRight className='w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform' />
                </a>
                <button className='group px-8 py-4 border-2 border-slate-700 hover:border-violet-500/50 bg-slate-800/50 hover:bg-slate-800 rounded-xl font-semibold transition-all flex items-center justify-center gap-3'>
                  <Play className='w-5 h-5 text-violet-400' />
                  <span>{t.landing.hero.watchDemo}</span>
                </button>
              </div>

              {/* All 4 Stats - Responsive Grid */}
              <div
                className='grid grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-20'
                style={{ animationDelay: "0.4s" }}
              >
                {stats.map((stat) => (
                  <div key={stat.label} className='relative group'>
                    <div className='absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all' />
                    <div className='relative p-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 backdrop-blur-sm'>
                      <div className='text-3xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent mb-1'>
                        {stat.value}
                      </div>
                      <div className='text-sm text-slate-400'>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Interactive Visual */}
            <div
              className='relative animate-in fade-in slide-in-from-right-8'
              style={{ animationDelay: "0.2s" }}
            >
              <div className='relative'>
                {/* Main Card */}
                <div className='relative z-10 p-8 rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50 backdrop-blur-xl shadow-2xl'>
                  <div className='flex items-center justify-between mb-6'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center'>
                        <Package className='w-6 h-6 text-white' />
                      </div>
                      <div>
                        <div className='font-semibold'>Previous Order</div>
                        <div className='text-sm text-slate-400'>
                          3 items • $127.50
                        </div>
                      </div>
                    </div>
                    <div className='px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium'>
                      Ready to reorder
                    </div>
                  </div>

                  <div className='space-y-3 mb-6'>
                    {[
                      "Premium Coffee Beans",
                      "Organic Tea Set",
                      "Filter Papers",
                    ].map((item, i) => (
                      <div
                        key={item}
                        className='flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/30'
                      >
                        <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center'>
                          <Check className='w-5 h-5 text-violet-400' />
                        </div>
                        <div className='flex-1'>
                          <div className='text-sm font-medium'>{item}</div>
                          <div className='text-xs text-slate-400'>Qty: 1</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className='group w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 rounded-xl font-semibold transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 flex items-center justify-center gap-2'>
                    <Repeat className='w-5 h-5' />
                    <span>Reorder in One Click</span>
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                  </button>
                </div>

                {/* Floating Elements */}
                <div className='absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-3xl animate-pulse' />
                <div
                  className='absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse'
                  style={{ animationDelay: "1s" }}
                />

                {/* Metric Cards */}
                <div
                  className=' p-4 mt-4 rounded-2xl bg-slate-900/95 border border-slate-700/50 backdrop-blur-xl shadow-xl animate-in slide-in-from-left-4'
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center'>
                      <TrendingUp className='w-5 h-5 text-emerald-400' />
                    </div>
                    <div>
                      <div className='text-2xl font-bold text-emerald-400'>+32%</div>
                      <div className='text-xs text-slate-400'>Reorder Rate</div>
                    </div>
                  </div>
                </div>

                <div
                  className=' p-4 mt-4 rounded-2xl bg-slate-900/95 border border-slate-700/50 backdrop-blur-xl shadow-xl animate-in slide-in-from-right-4'
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center'>
                      <Zap className='w-5 h-5 text-violet-400' />
                    </div>
                    <div>
                      <div className='text-2xl font-bold text-violet-400'>15x</div>
                      <div className='text-xs text-slate-400'>ROI</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className='relative py-12 px-6 border-y border-slate-800/50'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
            <div className='flex items-center gap-2 text-slate-400'>
              <span className='text-sm font-medium'>
                {t.landing.hero.trustedBy}
              </span>
            </div>
            <div className='flex items-center gap-12 opacity-50'>
              {["Shopify", "Klaviyo", "Stripe", "Recharge"].map((brand) => (
                <div key={brand} className='text-lg font-semibold text-slate-500'>
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className='py-32 px-6 relative'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-20'>
            <h2 className='text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent'>
              {t.landing.problem.title}
            </h2>
            <p className='text-xl text-slate-400 max-w-3xl mx-auto'>
              {t.landing.problem.subtitle}
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-6 mb-20'>
            {[
              {
                icon: Mail,
                title: t.landing.problem.manualReminders.title,
                desc: t.landing.problem.manualReminders.desc,
              },
              {
                icon: Repeat,
                title: t.landing.problem.subscriptionFirst.title,
                desc: t.landing.problem.subscriptionFirst.desc,
              },
              {
                icon: Target,
                title: t.landing.problem.passiveButtons.title,
                desc: t.landing.problem.passiveButtons.desc,
              },
            ].map((item) => (
              <div
                key={item.title}
                className='group p-8 rounded-3xl bg-gradient-to-b from-slate-800/30 to-slate-900/30 border border-slate-700/30 backdrop-blur-sm hover:border-slate-600/50 transition-all'
              >
                <div className='w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform'>
                  <item.icon className='w-7 h-7 text-slate-500' />
                </div>
                <h3 className='text-xl font-semibold mb-3 text-slate-300'>
                  {item.title}
                </h3>
                <p className='text-slate-400'>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className='relative max-w-4xl mx-auto'>
            <div className='absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-3xl' />
            <div className='relative p-12 rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-xl text-center'>
              <Lightbulb className='w-16 h-16 mx-auto mb-6 text-violet-400' />
              <p className='text-2xl lg:text-3xl text-slate-200 leading-relaxed mb-4'>
                {t.landing.problem.insight1}
              </p>
              <p className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent'>
                {t.landing.problem.insight2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id='features' className='py-32 px-6 relative'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-20'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm mb-6'>
              <Sparkles className='w-4 h-4 text-violet-400' />
              <span className='text-sm font-medium text-violet-300'>
                {t.landing.features.badge}
              </span>
            </div>
            <h2 className='text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent'>
              {t.landing.features.title}
            </h2>
            <p className='text-xl text-slate-400 max-w-3xl mx-auto'>
              {t.landing.features.subtitle}
            </p>
          </div>

          <div className='grid lg:grid-cols-3 gap-8'>
            {[
              {
                icon: Zap,
                title: t.landing.features.oneClick.title,
                description: t.landing.features.oneClick.description,
                features: t.landing.features.oneClick.features,
                color: "from-violet-500 to-purple-500",
              },
              {
                icon: ListChecks,
                title: t.landing.features.customLists.title,
                description: t.landing.features.customLists.description,
                features: t.landing.features.customLists.features,
                color: "from-purple-500 to-fuchsia-500",
              },
              {
                icon: Clock,
                title: t.landing.features.smartRecommendations.title,
                description: t.landing.features.smartRecommendations.description,
                features: t.landing.features.smartRecommendations.features,
                color: "from-fuchsia-500 to-pink-500",
              },
            ].map((feature) => (
              <div key={feature.title} className='group relative'>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl blur-xl transition-all duration-500`}
                />
                <div className='relative h-full p-8 rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all duration-500'>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <div className='w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center'>
                      <feature.icon className='w-7 h-7 text-violet-400' />
                    </div>
                  </div>
                  <h3 className='text-2xl font-bold mb-4'>{feature.title}</h3>
                  <p className='text-slate-400 mb-6 leading-relaxed'>
                    {feature.description}
                  </p>
                  <ul className='space-y-3'>
                    {feature.features.map((item) => (
                      <li key={item} className='flex items-center gap-3'>
                        <div className='w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0'>
                          <Check className='w-3 h-3 text-violet-400' />
                        </div>
                        <span className='text-sm text-slate-300'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Capabilities */}
      <section className='py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-20'>
            <h2 className='text-5xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent'>
              {t.landing.advanced.title}
            </h2>
          </div>

          <div className='grid lg:grid-cols-2 gap-8'>
            {[
              {
                icon: Brain,
                title: t.landing.advanced.thinkingLogic.title,
                description: t.landing.advanced.thinkingLogic.description,
                features: t.landing.advanced.thinkingLogic.features,
                badge: t.landing.advanced.thinkingLogic.badge,
                gradient: "from-violet-500 to-purple-500",
              },
              {
                icon: BarChart3,
                title: t.landing.advanced.analytics.title,
                description: t.landing.advanced.analytics.description,
                features: t.landing.advanced.analytics.features,
                badge: t.landing.advanced.analytics.badge,
                gradient: "from-blue-500 to-cyan-500",
              },
            ].map((feature) => (
              <div key={feature.title} className='group relative'>
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl blur-2xl transition-all duration-500`}
                />
                <div className='relative p-10 rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all'>
                  <div className='flex items-start justify-between mb-8'>
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5`}
                    >
                      <div className='w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center'>
                        <feature.icon className='w-8 h-8 text-violet-400' />
                      </div>
                    </div>
                    <span className='px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium'>
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className='text-3xl font-bold mb-4'>{feature.title}</h3>
                  <p className='text-lg text-slate-400 mb-8 leading-relaxed'>
                    {feature.description}
                  </p>
                  <ul className='space-y-4'>
                    {feature.features.map((item) => (
                      <li key={item} className='flex items-center gap-3'>
                        <Check className='w-5 h-5 text-violet-400 shrink-0' />
                        <span className='text-slate-300'>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className='py-32 px-6'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-20'>
            <h2 className='text-5xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent'>
              {t.landing.testimonials.title}
            </h2>
            <p className='text-xl text-slate-400'>
              {t.landing.testimonials.subtitle}
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {testimonials.map((testimonial, i) => (
              <div key={i} className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all' />
                <div className='relative p-8 rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 transition-all'>
                  <div className='flex gap-1 mb-6'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 fill-amber-400 text-amber-400'
                      />
                    ))}
                  </div>
                  <p className='text-slate-300 mb-8 leading-relaxed text-lg'>
                    "{testimonial.quote}"
                  </p>
                  <div className='flex items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center font-bold text-lg'>
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className='font-semibold'>{testimonial.author}</div>
                      <div className='text-sm text-slate-400'>
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id='pricing' className='py-32 px-6 relative'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-20'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm mb-6'>
              <BarChart3 className='w-4 h-4 text-violet-400' />
              <span className='text-sm font-medium text-violet-300'>
                {t.landing.pricing.badge}
              </span>
            </div>
            <h2 className='text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent'>
              {t.landing.pricing.title}
            </h2>
            <p className='text-xl text-slate-400 max-w-3xl mx-auto mb-4'>
              {t.landing.pricing.subtitle}
            </p>
            <p className='text-violet-400 font-medium'>
              {t.landing.pricing.trial}
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto'>
            {/* Starter Plan */}
            <div className='group relative p-8 rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm hover:border-slate-600/50 flex flex-col transition-all'>
              <div className='mb-8'>
                <h3 className='text-2xl font-bold mb-3'>{t.landing.pricing.starter.name}</h3>
                <div className='flex items-baseline gap-2 mb-4'>
                  <span className='text-6xl font-bold'>{t.landing.pricing.starter.price}</span>
                  <span className='text-slate-400 text-lg'>{t.landing.pricing.starter.perMonth}</span>
                </div>
                <p className='text-slate-400 text-lg'>
                  {t.landing.pricing.starter.description}
                </p>
              </div>

              <ul className='space-y-4 mb-10'>
                {t.landing.pricing.starter.features.map((feature) => (
                  <li key={feature} className='flex items-start gap-3'>
                    <div className='w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5'>
                      <Check className='w-4 h-4 text-emerald-400' />
                    </div>
                    <span className='text-slate-300'>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className='w-full py-4 mt-auto border-2 border-slate-700 hover:border-slate-600 bg-slate-800/50 hover:bg-slate-800 rounded-xl font-semibold transition-all group-hover:scale-105'>
                {t.landing.pricing.starter.cta}
              </button>
            </div>

            {/* Growth Plan */}
            <div className='group relative'>
              <div className='absolute -inset-1 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-all' />
              <div className='relative p-8 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-violet-500/50 backdrop-blur-sm'>
                <div className='absolute -top-5 left-1/2 -translate-x-1/2'>
                  <div className='px-6 py-2 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 text-white font-bold shadow-xl'>
                    {t.landing.pricing.growth.popular}
                  </div>
                </div>

                <div className='mb-8 mt-4'>
                  <h3 className='text-2xl font-bold mb-3'>{t.landing.pricing.growth.name}</h3>
                  <div className='flex items-baseline gap-2 mb-4'>
                    <span className='text-6xl font-bold'>{t.landing.pricing.growth.price}</span>
                    <span className='text-slate-400 text-lg'>{t.landing.pricing.growth.perMonth}</span>
                  </div>
                  <p className='text-slate-400 text-lg'>
                    {t.landing.pricing.growth.description}
                  </p>
                </div>

                <div className='mb-6 p-4 rounded-xl bg-violet-500/10 border border-violet-500/20'>
                  <p className='text-sm text-violet-300'>
                    {t.landing.pricing.growth.everythingIn}
                  </p>
                </div>

                <ul className='space-y-4 mb-10'>
                  {t.landing.pricing.growth.features.map((feature) => (
                    <li key={feature} className='flex items-start gap-3'>
                      <div className='w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center shrink-0 mt-0.5'>
                        <Check className='w-4 h-4 text-violet-400' />
                      </div>
                      <span className='text-slate-300'>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className='w-full py-4 bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all group-hover:scale-105'>
                  {t.landing.pricing.growth.cta}
                </button>
              </div>
            </div>
          </div>

          <p className='text-center text-slate-400 mt-12'>
            {t.landing.pricing.enterprise.split('Contact us')[0]}
            <a
              href='#contact'
              className='text-violet-400 hover:text-violet-300 underline'
            >
              Contact us
            </a>
            {t.landing.pricing.enterprise.split('Contact us')[1]}
          </p>
        </div>
      </section>

      {/* About */}
      <section
        id='about'
        className='py-32 px-6 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent'
      >
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-20'>
            <h2 className='text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent'>
              {t.landing.about.title}
            </h2>
            <p className='text-xl text-slate-400 max-w-3xl mx-auto'>
              {t.landing.about.subtitle}
            </p>
          </div>

          <div className='flex flex-col lg:flex-col gap-16 justify-center items-center mb-20'>
            <div>
              <h3 className='text-4xl text-center font-bold mb-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent'>
                {t.landing.about.systemTitle}
              </h3>
              <div className='space-y-6 text-center text-lg text-slate-300 leading-relaxed'>
                {t.landing.about.description.map((paragraph, index) => (
                  <p key={index} className={index === 1 ? 'text-center' : ''}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
              {[
                {
                  value: "10+",
                  label: "Years in ecommerce",
                  gradient: "from-violet-500 to-purple-500",
                },
                {
                  value: "50+",
                  label: "Stores optimized",
                  gradient: "from-purple-500 to-fuchsia-500",
                },
                {
                  value: "32%",
                  label: "Avg reorder rate increase",
                  gradient: "from-fuchsia-500 to-pink-500",
                },
                {
                  value: "15x",
                  label: "Average ROI",
                  gradient: "from-blue-500 to-cyan-500",
                },
              ].map((stat) => (
                <div key={stat.label} className='group relative'>
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-10 rounded-2xl blur-xl group-hover:blur-2xl transition-all`}
                  />
                  <div className='relative p-8 rounded-2xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm text-center group-hover:border-slate-600/50 transition-all'>
                    <div
                      className={`text-5xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-3`}
                    >
                      {stat.value}
                    </div>
                    <p className='text-slate-400'>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id='contact' className='py-32 px-6 relative'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-20'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 backdrop-blur-sm mb-6'>
              <img src={WhatsApp} className='w-4 h-4 text-violet-400' />
              <span className='text-sm font-medium text-violet-300'>
                {t.landing.contact.badge}
              </span>
            </div>
            <h2 className='text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent'>
              {t.landing.contact.title}
            </h2>
            <p className='text-xl text-slate-400 max-w-3xl mx-auto'>
              {t.landing.contact.subtitle}
            </p>
          </div>

          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Contact Form */}
            <div className='order-2 lg:order-1'>
              <div className='relative group'>
                <div className='absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-3xl blur-2xl' />
                <div className='relative p-10 rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl'>
                  <h3 className='text-3xl font-bold mb-8'>{t.landing.contact.form.title}</h3>
                  <form className='space-y-6'>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium mb-3 text-slate-300'>
                          {t.landing.contact.form.name}
                        </label>
                        <input
                          type='text'
                          required
                          className='w-full px-5 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-white placeholder-slate-500'
                          placeholder={t.landing.contact.form.namePlaceholder}
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium mb-3 text-slate-300'>
                          {t.landing.contact.form.email}
                        </label>
                        <input
                          type='email'
                          required
                          className='w-full px-5 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-white placeholder-slate-500'
                          placeholder={t.landing.contact.form.emailPlaceholder}
                        />
                      </div>
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-3 text-slate-300'>
                        {t.landing.contact.form.storeUrl}
                      </label>
                      <input
                        type='url'
                        className='w-full px-5 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all text-white placeholder-slate-500'
                        placeholder={t.landing.contact.form.urlPlaceholder}
                      />
                    </div>
                    <div>
                      <label className='block text-sm font-medium mb-3 text-slate-300'>
                        {t.landing.contact.form.message}
                      </label>
                      <textarea
                        rows={6}
                        required
                        className='w-full px-5 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none text-white placeholder-slate-500'
                        placeholder={t.landing.contact.form.messagePlaceholder}
                      />
                    </div>
                    <button
                      type='submit'
                      className='group w-full py-4 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 rounded-xl font-semibold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all flex items-center justify-center gap-3'
                    >
                      <span>{t.landing.contact.form.submit}</span>
                      <Send className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className='order-1 lg:order-2 space-y-6'>
              <div className='p-8 rounded-3xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-slate-700/50 backdrop-blur-sm'>
                <h3 className='text-2xl font-bold mb-8'>{t.landing.contact.info.title}</h3>
                <div className='space-y-8'>
                  {[
                    {
                      icon: Mail,
                      title: t.landing.contact.info.email.title,
                      content: (
                        <div className='space-y-1'>
                          <a
                            href='mailto:hello@reorderos.com'
                            className='text-slate-300 hover:text-violet-400 transition-colors block'
                          >
                            {t.landing.contact.info.email.hello}
                          </a>
                          <a
                            href='mailto:support@reorderos.com'
                            className='text-slate-300 hover:text-violet-400 transition-colors block'
                          >
                            {t.landing.contact.info.email.support}
                          </a>
                        </div>
                      ),
                      gradient: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: MessageSquare,
                      title: t.landing.contact.info.chat.title,
                      content: (
                        <p className='text-slate-300 whitespace-pre-line'>
                          {t.landing.contact.info.chat.hours}
                        </p>
                      ),
                      gradient: "from-green-500 to-emerald-500",
                    },
                    {
                      icon: MapPin,
                      title: t.landing.contact.info.location.title,
                      content: (
                        <p className='text-slate-300 whitespace-pre-line'>
                          {t.landing.contact.info.location.description}
                        </p>
                      ),
                      gradient: "from-violet-500 to-purple-500",
                    },
                  ].map((item) => (
                    <div key={item.title} className='flex items-start gap-4'>
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} p-0.5 shrink-0`}
                      >
                        <div className='w-full h-full rounded-xl bg-slate-900 flex items-center justify-center'>
                          <item.icon className='w-6 h-6 text-violet-400' />
                        </div>
                      </div>
                      <div>
                        <p className='font-semibold text-lg mb-2'>{item.title}</p>
                        {item.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='p-8 rounded-3xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 backdrop-blur-sm'>
                <h4 className='font-semibold mb-3'>{t.landing.contact.demo.title}</h4>
                <p className='text-slate-300 mb-4'>
                  {t.landing.contact.demo.description}
                </p>
                <a
                  href='https://calendly.com/reorderos/demo'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-medium group'
                >
                  {t.landing.contact.demo.cta}
                  <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className='py-24 px-6'>
        <div className='max-w-7xl mx-auto text-center'>
          <div className='inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 mb-8 shadow-xl shadow-violet-500/30'>
            <Shield className='w-10 h-10 text-white' />
          </div>
          <h2 className='text-4xl font-bold mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent'>
            {t.landing.trust.title}
          </h2>
          <p className='text-xl text-slate-400 mb-12 max-w-3xl mx-auto'>
            {t.landing.trust.subtitle}
          </p>
          <div className='grid md:grid-cols-4 gap-6 text-left'>
            {[
              { icon: Shield, title: t.landing.trust.features[0] },
              { icon: Check, title: t.landing.trust.features[1] },
              { icon: Zap, title: t.landing.trust.features[2] },
              { icon: Target, title: t.landing.trust.features[3] },
            ].map((item) => (
              <div key={item.title} className='group relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all' />
                <div className='relative p-6 rounded-2xl bg-gradient-to-b from-slate-800/30 to-slate-900/30 border border-slate-700/30 backdrop-blur-sm hover:border-slate-600/50 transition-all'>
                  <item.icon className='w-8 h-8 text-violet-400 mb-4' />
                  <p className='text-slate-300 font-medium'>{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className='py-32 px-6 relative overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/10 to-transparent' />
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-full blur-[120px]' />
        </div>
        <div className='max-w-7xl mx-auto text-center relative z-10'>
          <h2 className='text-5xl lg:text-7xl font-bold mb-8 leading-tight'>
            <span className='bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent block mb-4'>
              {t.landing.finalCta.title1}
            </span>
            <span className='bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent block'>
              {t.landing.finalCta.title2}
            </span>
          </h2>
          <p className='text-2xl text-slate-400 mb-12'>
            {t.landing.finalCta.subtitle}
          </p>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-6'>
            <a
              href='https://apps.shopify.com/reorderos'
              target='_blank'
              rel='noopener noreferrer'
              className='group px-10 py-5 text-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 rounded-xl transition-all font-semibold flex items-center gap-3'
            >
              <Link to='/login'>{t.landing.finalCta.startTrial}</Link>
              <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
            </a>
            <a
              href='#features'
              className='px-10 py-5 text-lg border-2 border-slate-700 hover:border-violet-500/50 bg-slate-800/50 hover:bg-slate-800 rounded-xl transition-all font-semibold'
            >
              {t.landing.finalCta.viewFeatures}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='relative py-20 px-6 border-t border-slate-800/50'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid md:grid-cols-12 gap-12 mb-16'>
            <div className='md:col-span-4'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg'>
                  <Sparkles className='w-6 h-6 text-white' />
                </div>
                <span className='font-bold text-2xl'>ReorderOS</span>
              </div>
              <p className='text-slate-400 mb-8 leading-relaxed'>
                {t.landing.footer.description}
              </p>
              <div className='flex gap-3'>
                {[
                  { icon: Twitter, href: "https://twitter.com/reorderos" },
                  { icon: Linkedin, href: "https://linkedin.com/company/reorderos" },
                  { icon: Github, href: "https://github.com/reorderos" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group w-11 h-11 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center hover:bg-gradient-to-br hover:from-violet-500/20 hover:to-fuchsia-500/20 hover:border-violet-500/50 transition-all'
                  >
                    <social.icon className='w-5 h-5 text-slate-400 group-hover:text-violet-400 transition-colors' />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: t.landing.footer.product.title,
                links: t.landing.footer.product.links,
              },
              {
                title: t.landing.footer.company.title,
                links: t.landing.footer.company.links,
              },
              {
                title: t.landing.footer.resources.title,
                links: t.landing.footer.resources.links,
              },
            ].map((column) => (
              <div key={column.title} className='md:col-span-2'>
                <h4 className='font-semibold text-lg mb-6'>{column.title}</h4>
                <ul className='space-y-4'>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href='#'
                        className='text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group'
                      >
                        <span>{link}</span>
                        <ArrowRight className='w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all' />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className='md:col-span-2'>
              <h4 className='font-semibold text-lg mb-6'>{t.landing.footer.newsletter.title}</h4>
              <p className='text-slate-400 mb-4 text-sm'>
                {t.landing.footer.newsletter.description}
              </p>
              <div className='flex gap-2'>
                <input
                  type='email'
                  placeholder={t.landing.footer.newsletter.placeholder}
                  className='flex-1 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg focus:outline-none focus:border-violet-500 text-sm'
                />
                <button className='p-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center hover:shadow-lg hover:shadow-violet-500/30 transition-all'>
                  <Send className='w-5 h-4' />
                </button>
              </div>
            </div>
          </div>

          <div className='pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-6'>
            <p className='text-slate-400'>{t.landing.footer.copyright}</p>
            <div className='flex items-center gap-8 text-sm'>
              {t.landing.footer.legal.map((link) => (
                <a
                  key={link}
                  href='#'
                  className='text-slate-400 hover:text-white transition-colors'
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
