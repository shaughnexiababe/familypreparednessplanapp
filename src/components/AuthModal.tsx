import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Mail, Lock, Sparkles, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "tl" | "en";
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, lang }) => {
  const { login, register, resetPassword, isDemoMode } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register" | "reset">("login");

  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

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
      onClose();
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
      onClose();
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

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[420px] rounded-2xl p-6 bg-white border border-slate-100 shadow-2xl">
        <DialogHeader className="items-center text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md border-2 border-amber-100 bg-white">
            <img src="/app-logo.png" alt="Tahanang Handa Logo" className="w-full h-full object-cover" />
          </div>
          <DialogTitle className="text-xl font-black text-slate-900 uppercase tracking-tight">
            {t("Tahanang Handa Account", "Tahanang Handa Account")}
          </DialogTitle>
          <DialogDescription className="text-xs text-slate-500">
            {t(
              "I-save ang iyong Family Preparedness Plan sa cloud upang ma-access ito kahit saan.",
              "Save your Family Preparedness Plan to the cloud to access it anywhere."
            )}
          </DialogDescription>
        </DialogHeader>

        {isDemoMode && (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">{t("Demo Mode Aktibo", "Demo Mode Active")}</span>
              {t(
                "Gumagana ang login gamit ang anumang email/password para sa pagsubok. Upang ikonekta ang iyong totoong Firebase, i-set up ang environment variables sa iyong hosting.",
                "Login works with any email/password for testing. To connect your real Firebase, set up the environment variables in your hosting."
              )}
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(val: any) => setActiveTab(val)} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-2 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger value="login" className="rounded-lg text-xs font-bold py-2">
              {t("Mag-login", "Login")}
            </TabsTrigger>
            <TabsTrigger value="register" className="rounded-lg text-xs font-bold py-2">
              {t("Mag-register", "Register")}
            </TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login" className="space-y-4 mt-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">{t("Email Address", "Email Address")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <Label className="text-xs font-bold text-slate-600">{t("Password", "Password")}</Label>
                  <button
                    type="button"
                    onClick={() => setActiveTab("reset")}
                    className="text-[11px] text-amber-600 hover:underline font-semibold"
                  >
                    {t("Nakalimutan ang Password?", "Forgot Password?")}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold h-9 mt-2"
              >
                {isSubmitting ? t("Naglo-login...", "Logging in...") : t("Mag-login", "Login")}
              </Button>
            </form>
          </TabsContent>

          {/* Register Form */}
          <TabsContent value="register" className="space-y-4 mt-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">{t("Email Address", "Email Address")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">{t("Password", "Password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">{t("Kumpirmahin ang Password", "Confirm Password")}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-9 rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold h-9 mt-2"
              >
                {isSubmitting ? t("Nirerehistro...", "Registering...") : t("Lumikha ng Account", "Create Account")}
              </Button>
            </form>
          </TabsContent>

          {/* Reset Password Form */}
          <TabsContent value="reset" className="space-y-4 mt-4">
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-600">{t("Email Address", "Email Address")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 rounded-xl border-slate-200 text-xs h-9"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("login")}
                  className="flex-1 rounded-xl text-xs font-bold h-9"
                >
                  {t("Bumalik", "Back")}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold h-9"
                >
                  {isSubmitting ? t("Ipinapadala...", "Sending...") : t("Ipadala ang Link", "Send Link")}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};