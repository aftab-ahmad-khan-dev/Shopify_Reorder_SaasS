import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import {
  Sparkles,
  ArrowRight,
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { apiPost } from "../BackendServices/ApiCalls";
import { useAuth } from "@/context/AuthContext";
const Login = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const loginSchema = z.object({
    email: z.string().email(t.login.validation.emailRequired),
    password: z.string().min(6, t.login.validation.passwordMinLength),
  });

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated])

  const handleSubmit = async () => {
    setErrors({ email: "", password: "" });

    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const fieldErrors = { email: "", password: "" };
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiPost('/auth/login', { email, password });
      if (response.isSuccess) {
        const { tokens, user } = response.data;

        localStorage.setItem("access_token", tokens.accessToken);
        localStorage.setItem("refresh_token", tokens.refreshToken);
        localStorage.setItem("user_data", JSON.stringify(user));
        toast({
          title: t.login.toast.success,
          description: response.message,
          variant: "default"
        });
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(error);

      toast({
        title: t.login.toast.error,
        description: error.message || t.login.toast.somethingWentWrong,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className='min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div
          className='absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse'
          style={{ animationDuration: "4s" }}
        />
        <div
          className='absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse'
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl' />
      </div>

      {/* Grid Pattern Overlay */}
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none' />

      <div className='relative w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center'>
        {/* Left Side - Branding */}
        <div className='hidden lg:block space-y-8'>
          <div className='space-y-4'>
            <div className='inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/50'>
                <Sparkles className='w-5 h-5 text-white' />
              </div>
              <span className='font-bold text-xl text-white'>REORDER OS</span>
            </div>
          </div>

          <div className='space-y-6'>
            <h1 className='text-5xl font-bold text-white leading-tight'>
              {t.login.branding.title}
              <br />
              <span className='bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>
                {t.login.branding.titleHighlight}
              </span>
            </h1>
            <p className='text-lg text-slate-400 leading-relaxed max-w-md'>
              {t.login.branding.description}
            </p>
          </div>

          <div className='grid grid-cols-3 gap-4'>
            {[
              { value: "99.9%", label: t.login.branding.stats.uptime },
              { value: "2.5M+", label: t.login.branding.stats.orders },
              { value: "500+", label: t.login.branding.stats.merchants },
            ].map((stat, i) => (
              <div
                key={i}
                className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4'
              >
                <div className='text-2xl font-bold text-white mb-1'>
                  {stat.value}
                </div>
                <div className='text-sm text-slate-400'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className='w-full max-w-md mx-auto lg:mx-0'>
          <div className='bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-purple-500/10'>
            {/* Mobile Logo */}
            <Link to='/' className='lg:hidden flex items-center gap-3 mb-8'>
              <div className='w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/50'>
                <Sparkles className='w-5 h-5 text-white' />
              </div>
              <span className='font-bold text-xl text-white'>REORDER OS</span>
            </Link>

            <div className='mb-8'>
              <h2 className='text-3xl font-bold text-white mb-2'>{t.login.form.welcomeBack}</h2>
              <p className='text-slate-400'>{t.login.form.signInDescription}</p>
            </div>

            <div className='space-y-5'>
              {/* Email Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium text-slate-300'
                >
                  {t.login.form.emailAddress}
                </label>
                <div className='relative'>
                  <Mail className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                  <input
                    id='email'
                    type='email'
                    placeholder={t.login.form.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border ${errors.email ? "border-red-500/50" : "border-white/10"
                      } rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all`}
                  />
                </div>
                {errors.email && (
                  <p className='text-sm text-red-400 flex items-center gap-1'>
                    <span className='w-1 h-1 rounded-full bg-red-400' />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium text-slate-300'
                >
                  {t.login.form.password}
                </label>
                <div className='relative'>
                  <Lock className='absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400' />
                  <input
                    id='password'
                    type={showPassword ? "text" : "password"}
                    placeholder={t.login.form.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className={`w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border ${errors.password ? "border-red-500/50" : "border-white/10"
                      } rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all`}
                  />
                  <button
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors'
                  >
                    {showPassword ? (
                      <EyeOff className='w-5 h-5' />
                    ) : (
                      <Eye className='w-5 h-5' />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className='text-sm text-red-400 flex items-center gap-1'>
                    <span className='w-1 h-1 rounded-full bg-red-400' />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember & Forgot */}
              {/* <div className='flex items-center justify-between text-sm'>
                <label className='flex items-center gap-2 cursor-pointer group'>
                  <input
                    type='checkbox'
                    className='w-4 h-4 rounded border-white/10 bg-slate-800/50 text-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-0'
                  />
                  <span className='text-slate-400 group-hover:text-slate-300 transition-colors'>
                    {t.login.form.rememberMe}
                  </span>
                </label>
                <button
                  type='button'
                  className='text-purple-400 hover:text-purple-300 transition-colors font-medium'
                >
                  {t.login.form.forgotPassword}
                </button>
              </div> */}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className='w-full py-3.5 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group'
              >
                {isLoading ? (
                  <Loader2 className='w-5 h-5 animate-spin' />
                ) : (
                  <>
                    {t.login.form.signIn}
                    <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                  </>
                )}
              </button>
            </div>

            {/* Sign Up Link */}
            <p className='text-center text-sm text-slate-400 mt-8'>
              {t.login.form.noAccount}{" "}
              <Link
                to='/'
                className='text-purple-400 hover:text-purple-300 font-medium transition-colors'
              >
                {t.login.form.installOnShopify}
              </Link>
            </p>
          </div>

          {/* Trust Badge */}
          <div className='mt-6 flex items-center justify-center gap-6 text-xs text-slate-500'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
              <span>{t.login.trustBadge.allSystemsOperational}</span>
            </div>
            <span>•</span>
            <span>{t.login.trustBadge.soc2Certified}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
