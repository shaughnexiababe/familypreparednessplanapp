import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Lock, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const { login, register, resetPassword, isDemoMode, user, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">("login");
  const [lang, setLang] = useState<"tl" | "en">("tl");

  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(t("Mangyaring punan ang lahat ng field.", "Please fill in all fields."));
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email, password);
      toast.success(t("Matagumpay na naka-login!", "Logged in successfully!"));
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || t("Maling email o password.", "Invalid email or password."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error(t("Mangyaring punan ang lahat ng field.", "Please fill in all fields."));
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t("Hindi nagtutugma ang password.", "Passwords do not match."));
      return;
    }

    if (password.length < 6) {
      toast.error(t("Ang password ay dapat may hindi bababa sa 6 na karakter.", "Password must be at least 6 characters."));
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password);
      toast.success(t("Matagumpay na nakalikha ng account!", "Account created successfully!"));
      navigate("/");
    } catch (error: any) {
      toast.error(error.message || t("May error sa paglikha ng account.", "Error creating account."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(t("Mangyaring ilagay ang iyong email.", "Please enter your email."));
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      toast.success(t("Naipadala ang password reset link sa iyong email!", "Password reset link sent to your email!"));
      setActiveTab("login");
    } catch (error: any) {
      toast.error(error.message || t("May error sa pagpapadala ng reset link.", "Error sending reset link."));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-0 overflow-hidden rounded-3xl w-24 h-24 shadow-lg border-4 border-amber-100 bg-white flex items-center justify-center">
            <img src="/app-logo.png" alt="Tahanang Handa Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
              Tahanang Handa
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              {t(
                "Pumili ng paraan upang magpatuloy sa iyong Family Preparedness Plan.",
                "Choose a way to continue with your Family Preparedness Plan."
              )}
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-slate-100 p-1 rounded-xl flex">
            <button
              onClick={() => setLang("tl")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lang === "tl" ? "bg-white text-amber-600 shadow-sm" : "text-slate-500 hover:bg-white/50"
              }`}
            >
              Tagalog
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                lang === "en" ? "bg-white text-amber-600 shadow-sm" : "text-slate-500 hover:bg-white/50"
              }`}
            >
              English
            </button>
          </div>
        </div>

        {isDemoMode && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-800">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-sm">{t("Demo Mode Aktibo", "Demo Mode Active")}</span>
              <p className="mt-1 opacity-90">
                {t(
                  "Gumagana ang login gamit ang anumang email/password para sa pagsubok.",
                  "Login works with any email/password for testing."
                )}
              </p>
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-2xl h-12">
            <TabsTrigger value="login" className="rounded-xl text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm">
              {t("Mag-login", "Login")}
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-xl text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm">
              {t("Mag-register", "Register")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 mt-6">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">{t("Email Address", "Email Address")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 rounded-2xl border-slate-200 text-sm h-11 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-bold text-slate-700">{t("Password", "Password")}</Label>
                  <button
                    type="button"
                    onClick={() => setActiveTab("reset")}
                    className="text-xs text-amber-600 hover:underline font-bold"
                  >
                    {t("Nakalimutan ang Password?", "Forgot Password?")}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 rounded-2xl border-slate-200 text-sm h-11 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-sm font-black h-12 mt-2 shadow-lg shadow-amber-200 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                {isSubmitting ? t("Naglo-login...", "Logging in...") : t("MAG-LOGIN", "LOGIN")}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 mt-6">
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">{t("Email Address", "Email Address")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 rounded-2xl border-slate-200 text-sm h-11 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">{t("Password", "Password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-11 rounded-2xl border-slate-200 text-sm h-11 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">{t("Kumpirmahin ang Password", "Confirm Password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-11 rounded-2xl border-slate-200 text-sm h-11 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-sm font-black h-12 mt-2 shadow-lg shadow-amber-200 transition-all hover:translate-y-[-2px] active:translate-y-[0px]"
              >
                {isSubmitting ? t("Nirerehistro...", "Registering...") : t("LUMIKHA NG ACCOUNT", "CREATE ACCOUNT")}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="reset" className="space-y-4 mt-6">
            <form onSubmit={handleReset} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">{t("Email Address", "Email Address")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-11 rounded-2xl border-slate-200 text-sm h-11 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("login")}
                  className="flex-1 rounded-2xl text-sm font-bold h-12 border-slate-200"
                >
                  {t("Bumalik", "Back")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-sm font-bold h-12"
                >
                  {isSubmitting ? t("Ipinapadala...", "Sending...") : t("Ipadala ang Link", "Send Link")}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      <p className="mt-8 text-[11px] text-slate-400 font-bold uppercase tracking-widest">
        Tahanang Handa &bull; Probinsya ng Camarines Norte
      </p>
    </div>
  );
};

export default Login;
