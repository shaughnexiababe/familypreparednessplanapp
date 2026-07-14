import React, { useState, useEffect } from "react";
import { FamilyPlanState, DEFAULT_PLAN_STATE } from "@/types/plan";
import { WebPlanWizard } from "@/components/WebPlanWizard";
import { MobilePlanWizard } from "@/components/MobilePlanWizard";
import { PlanPreview } from "@/components/PlanPreview";
import { AuthModal } from "@/components/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { AGE_GUIDELINES, PREPARED_FAMILY_CHARACTERISTICS, DISASTER_TIPS } from "@/data/educationalContent";
import { CAMARINES_NORTE_HOTLINES } from "@/data/camNorteData";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Smartphone, 
  Monitor, 
  BookOpen, 
  CheckCircle, 
  Info, 
  Heart, 
  Sparkles, 
  MapPin, 
  RotateCcw, 
  Volume2, 
  AlertTriangle, 
  User, 
  LogOut, 
  CloudLightning, 
  Cloud,
  Menu,
  ChevronRight,
  Zap,
  FileText,
  Clock,
  ChevronDown,
  ChevronUp,
  Trash
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { PrivacyNotice } from "@/components/PrivacyNotice";

const Index = () => {
  const { user, logout, deleteAccount, savePlanToCloud, loadPlanFromCloud } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [showLanding, setShowLanding] = useState(true);

  // Load initial state from localStorage if available
  const [plan, setPlan] = useState<FamilyPlanState>(() => {
    const saved = localStorage.getItem("ligtas_camnorte_plan");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_PLAN_STATE;
      }
    }
    return DEFAULT_PLAN_STATE;
  });

  const [lang, setLang] = useState<"tl" | "en">("tl");
  const [activeSection, setActiveSection] = useState<"wizard" | "preview" | "education">("wizard");
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);
  const [pagasaSignal, setPagasaSignal] = useState<number>(0);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);

  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("ligtas_camnorte_plan", JSON.stringify(plan));
  }, [plan]);

  // Load plan from Firestore when user logs in
  useEffect(() => {
    const fetchCloudPlan = async () => {
      if (user) {
        const cloudPlan = await loadPlanFromCloud();
        if (cloudPlan) {
          setPlan(cloudPlan);
          toast.success(t("Na-load ang iyong plano mula sa cloud!", "Loaded your plan from the cloud!"));
        }
      }
    };
    fetchCloudPlan();
  }, [user]);

  // Auto-save to Firestore when plan changes and user is logged in
  useEffect(() => {
    if (!user) return;

    const delayDebounceFn = setTimeout(async () => {
      setIsSaving(true);
      try {
        await savePlanToCloud(plan);
        setLastSaved(new Date().toLocaleTimeString());
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setIsSaving(false);
      }
    }, 2000); // Debounce auto-save by 2 seconds

    return () => clearTimeout(delayDebounceFn);
  }, [plan, user]);

  const handlePlanChange = (updated: FamilyPlanState) => {
    setPlan(updated);
  };

  const handleReset = () => {
    if (window.confirm(t("Sigurado ka ba na nais mong i-reset ang iyong plano?", "Are you sure you want to reset your plan?"))) {
      setPlan(DEFAULT_PLAN_STATE);
      localStorage.removeItem("ligtas_camnorte_plan");
      toast.success(t("Na-reset ang plano sa default!", "Plan reset to default successfully!"));
    }
  };

  // Web Audio API Siren Simulator (No external assets needed!)
  const toggleSiren = () => {
    if (isSirenPlaying) {
      if (oscillator) {
        try {
          oscillator.stop();
        } catch (e) {}
        setOscillator(null);
      }
      setIsSirenPlaying(false);
      toast.info(t("Pinatay ang emergency siren.", "Emergency siren stopped."));
    } else {
      const ctx = audioContext || new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioContext) setAudioContext(ctx);

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(440, ctx.currentTime);

      // Create a sweeping siren effect
      const now = ctx.currentTime;
      osc.frequency.linearRampToValueAtTime(880, now + 0.5);
      osc.frequency.linearRampToValueAtTime(440, now + 1.0);
      
      // Loop the sweep
      let interval = setInterval(() => {
        if (!isSirenPlaying) {
          const tNow = ctx.currentTime;
          osc.frequency.linearRampToValueAtTime(880, tNow + 0.5);
          osc.frequency.linearRampToValueAtTime(440, tNow + 1.0);
        }
      }, 1000);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);

      osc.start();
      setOscillator(osc);
      setIsSirenPlaying(true);
      toast.error(t("Emergency Siren ay Aktibo! Gamitin lamang sa tunay na sakuna.", "Emergency Siren Active! Use only in real emergencies."));

      // Store interval reference to clear it later
      (osc as any).sirenInterval = interval;
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (oscillator) {
        try {
          oscillator.stop();
          clearInterval((oscillator as any).sirenInterval);
        } catch (e) {}
      }
    };
  }, [oscillator]);

  // Calculate Preparedness Score
  const calculateScore = () => {
    let totalPoints = 30;

    // 1. Profile filled (Max 6)
    let profileScore = 0;
    if (plan.profile.headOfHousehold) profileScore += 1;
    if (plan.profile.barangay && plan.profile.sitio) profileScore += 1;
    if (plan.profile.houseStructure && plan.profile.houseOwnership) profileScore += 1;
    if (plan.profile.waterSource && plan.profile.toiletFacility) profileScore += 1;
    if (plan.profile.electricitySource && plan.profile.cookingFacility) profileScore += 1;

    // Check if auto-detected or manual hazards are present
    const selectedMuni = CAMARINES_NORTE_HOTLINES.municipalities.find(m => m.name === plan.profile.municipality);
    const hasAutoHazards = selectedMuni?.hazardTypes && selectedMuni.hazardTypes.length > 0;
    const hasManualHazards = plan.profile.hazardVulnerability.length > 0;
    if (hasAutoHazards || hasManualHazards) profileScore += 1;

    // 2. Family members (Max 4)
    let familyScore = 0;
    if (plan.members.length > 0) familyScore += 1;
    if (plan.members.length >= 2) familyScore += 1;
    if (plan.members.length > 0 && plan.members.every(m => m.name && m.phone && m.bloodType)) familyScore += 1;
    if (plan.members.length > 0 && plan.members.every(m => m.usualLocation && m.age)) familyScore += 1;

    // 3. Roles & Tasks (Max 5)
    let rolesScore = 0;
    if (plan.roles.length > 0) {
      rolesScore += 1;
      const uniqueAssignedMembers = new Set(plan.roles.map(r => r.memberId)).size;
      if (uniqueAssignedMembers >= Math.min(plan.members.length, 2)) rolesScore += 1;

      const rolesWithTasks = plan.roles.filter(r => r.tasksBefore || r.tasksDuring || r.tasksAfter).length;
      if (rolesWithTasks > 0) rolesScore += 1;
      if (rolesWithTasks === plan.roles.length && plan.roles.length > 0) rolesScore += 1;
      if (plan.roles.every(r => r.roleType && r.otherNotes)) rolesScore += 1;
    }

    // 4. Evacuation places (Max 4)
    let evacScore = 0;
    if (plan.evacuation.meetingPlace1) evacScore += 1;
    if (plan.evacuation.meetingPlace2) evacScore += 1;
    if (plan.evacuation.evacCenter1 && plan.evacuation.evacCenter2) evacScore += 1;
    if (plan.evacuation.houseLayoutNotes) evacScore += 1;

    // 5. Checklist items checked (Max 8)
    let checklistScore = 0;
    const checkedCount =
      Object.values(plan.checklist.documentsCash).filter(Boolean).length +
      Object.values(plan.checklist.toiletries).filter(Boolean).length +
      Object.values(plan.checklist.foodMeds).filter(Boolean).length +
      Object.values(plan.checklist.tools).filter(Boolean).length +
      Object.values(plan.checklist.eBalde).filter(Boolean).length;
    
    if (checkedCount >= 30) checklistScore = 8;
    else if (checkedCount >= 20) checklistScore = 5;
    else if (checkedCount >= 10) checklistScore = 3;
    else if (checkedCount >= 5) checklistScore = 1;

    // 6. Schedule & Hotlines (Max 3)
    let hotlinesScore = 0;
    if (plan.schedule.date && plan.schedule.time) hotlinesScore += 1;
    if (plan.profile.brgyHotline || plan.profile.bpsoHotline) hotlinesScore += 1;
    if (plan.profile.bhwHotline) hotlinesScore += 1;

    const totalScore = profileScore + familyScore + rolesScore + evacScore + checklistScore + hotlinesScore;
    const percentage = Math.min(Math.round((totalScore / totalPoints) * 100), 100);

    const badge = percentage >= 95 ? t("Handang-Handa! 🌟", "Fully Prepared! 🌟") :
                  percentage >= 75 ? t("Handa na 👍", "Prepared 👍") :
                  percentage >= 40 ? t("Sapat ang Handa ⚠️", "Moderately Prepared ⚠️") :
                  t("Kailangan pa ng Paghahanda 🛑", "Needs More Preparation 🛑");

    return {
      percentage,
      badge,
      breakdown: [
        { label: t("Profil", "Profile"), score: profileScore, total: 6 },
        { label: t("Pamilya", "Family"), score: familyScore, total: 4 },
        { label: t("Tungkulin", "Roles"), score: rolesScore, total: 5 },
        { label: t("Likas", "Evac"), score: evacScore, total: 4 },
        { label: t("Go-Bag", "Kit"), score: checklistScore, total: 8 },
        { label: t("Hotline/Sched", "Hotlines"), score: hotlinesScore, total: 3 },
      ]
    };
  };

  const prepScore = calculateScore();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
    } catch (error: any) {
      toast.error(t("May error sa pagbura ng account.", "Error deleting account."));
    }
  };

  if (user && showLanding) {
    return (
      <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center p-6 text-center animate-fadeIn">
        <div className="max-w-md w-full space-y-8">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full blur opacity-25 animate-pulse"></div>
            <div className="relative bg-white overflow-hidden rounded-full inline-block border-2 border-amber-100 shadow-xl w-32 h-32 flex items-center justify-center">
              <img src="/app-logo.png" alt="Tahanang Handa Logo" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              {t("Plano sa Kahandaan ng Pamilya sa mga Sakuna", "Family Disaster Preparedness Plan")}
            </h1>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
              <p className="text-lg font-bold text-amber-800">
                {t("Ready ba ang inyong pamilya in case of disaster and emergencies?", "Is your family ready in case of disaster and emergencies?")}
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed font-medium">
              {t(
                "Ang bawat miyembro ng pamilya ay may role na pwedeng gampanan sa paniniguro na handa ang tahanan at buong pamilya sa anumang sakuna.",
                "Every family member has a role to play in ensuring the home and the whole family are ready for any disaster."
              )}
            </p>
          </div>

          <div className="pt-8 space-y-4">
            <Button
              onClick={() => setShowLanding(false)}
              className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white rounded-2xl py-7 text-lg font-black shadow-lg shadow-amber-200 transition-all active:scale-95"
            >
              {t("Magsimula Na", "Get Started Now")}
              <ChevronRight className="ml-2 w-6 h-6" />
            </Button>

            <button
              onClick={logout}
              className="text-slate-400 text-sm font-bold hover:text-red-500 transition-colors"
            >
              {t("I-logout ang Account", "Logout Account")}
            </button>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-2">
          <div className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">
            Tahanang Handa &copy; 2026
          </div>
          <PrivacyNotice lang={lang} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16 lg:pb-0">
      {/* Mobile Header (Matches Screenshot) */}
      <header className="lg:hidden bg-[#f39c12] text-white px-4 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/30 shadow-inner bg-white/20">
            <img src="/app-logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight uppercase leading-tight">
              TAHANANG HANDA
            </h1>
            <p className="text-[10px] font-bold opacity-90 tracking-wide">
              {t("Plano ng Pamilya", "Family Preparedness Plan")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "tl" ? "en" : "tl")}
            className="bg-black/20 hover:bg-black/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors"
          >
            {lang.toUpperCase()}
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 h-8 w-8">
                <Menu className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-slate-200 z-[100]">
              <DropdownMenuItem onClick={toggleSiren} className={`py-2.5 font-medium ${isSirenPlaying ? 'text-red-600 animate-pulse' : ''}`}>
                <Volume2 className="w-4 h-4 mr-2" />
                {isSirenPlaying ? t("I-off ang Siren", "Stop Emergency Siren") : t("Emergency Siren", "Test Emergency Siren")}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <PrivacyNotice
                lang={lang}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="py-2.5 font-medium">
                    <Shield className="w-4 h-4 mr-2 text-slate-500" />
                    {t("Patakaran sa Privacy", "Privacy Notice")}
                  </DropdownMenuItem>
                }
              />
              <DropdownMenuSeparator />
              {user ? (
                <>
                  <DropdownMenuItem onClick={logout} className="py-2.5 font-medium text-slate-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t("Mag-logout", "Logout")}
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="py-2.5 font-medium text-red-600">
                        <Trash className="w-4 h-4 mr-2" />
                        {t("Burahin ang Account", "Delete Account")}
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-3xl border-none">
                      <AlertDialogHeader>
                        <AlertDialogTitle>{t("Sigurado ka ba?", "Are you absolutely sure?")}</AlertDialogTitle>
                        <AlertDialogDescription>
                          {t(
                            "Ang aksyong ito ay hindi na maaaring bawiin. Permanenteng mabubura ang iyong account at ang iyong Family Preparedness Plan mula sa aming servers.",
                            "This action cannot be undone. This will permanently delete your account and remove your Family Preparedness Plan from our servers."
                          )}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl">{t("Bumalik", "Cancel")}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
                          {t("Oo, Burahin Na", "Yes, Delete Account")}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <DropdownMenuItem onClick={() => setIsAuthModalOpen(true)} className="py-2.5 font-medium">
                  <User className="w-4 h-4 mr-2 text-slate-500" />
                  {t("Mag-login", "Login / Register")}
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Desktop Branding Header */}
      <header className="hidden lg:block bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-6 px-8 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 overflow-hidden shadow-xl">
              <img src="/app-logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">
                {t("Tahanang Handa: Plano ng Pamilya", "Tahanang Handa: Family Preparedness Plan")}
              </h1>
              <p className="text-xs md:text-sm opacity-90 font-medium">
                {t(
                  "Gabay sa pagbuo ng plano para sa mga mamamayan ng Camarines Norte",
                  "A family preparedness plan builder for the citizens of Camarines Norte"
                )}
              </p>
            </div>
          </div>

          {/* Language, Auth & Navigation Controls */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            {/* Emergency Siren Button */}
            <Button
              onClick={toggleSiren}
              className={`rounded-xl text-xs font-bold px-4 py-2 flex items-center gap-2 transition-all ${
                isSirenPlaying 
                  ? "bg-red-600 hover:bg-red-700 text-white animate-bounce" 
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {isSirenPlaying ? t("I-off ang Siren", "Turn off Siren") : t("Emergency Siren", "Emergency Siren")}
            </Button>

            {/* User Authentication Button */}
            {user ? (
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                <User className="w-4 h-4 text-white" />
                <span className="text-xs font-bold text-white max-w-[120px] truncate">{user.email}</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="text-white hover:text-amber-200 transition-colors ml-1">
                      <Menu className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl border-slate-200">
                    <DropdownMenuItem onClick={logout} className="py-2.5 font-medium">
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("Mag-logout", "Logout")}
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="py-2.5 font-medium text-red-600">
                          <Trash className="w-4 h-4 mr-2" />
                          {t("Burahin ang Account", "Delete Account")}
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-3xl border-none">
                        <AlertDialogHeader>
                          <AlertDialogTitle>{t("Sigurado ka ba?", "Are you absolutely sure?")}</AlertDialogTitle>
                          <AlertDialogDescription>
                            {t(
                              "Ang aksyong ito ay hindi na maaaring bawiin. Permanenteng mabubura ang iyong account at data.",
                              "This action cannot be undone. This will permanently delete your account and data."
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-xl">{t("Bumalik", "Cancel")}</AlertDialogCancel>
                          <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
                            {t("Burahin Na", "Delete")}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white text-amber-600 hover:bg-amber-50 rounded-xl text-xs font-bold px-4 py-2"
              >
                <User className="w-4 h-4 mr-1.5" />
                {t("Mag-login / Register", "Login / Register")}
              </Button>
            )}

            <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 flex gap-1">
              <button
                onClick={() => setPagasaSignal(pagasaSignal === 0 ? 2 : 0)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                  pagasaSignal > 0 ? "bg-red-500 text-white" : "text-white hover:bg-white/10"
                }`}
                title={t("I-simulate ang Typhoon Signal", "Simulate Typhoon Signal")}
              >
                <CloudLightning className="w-3.5 h-3.5" />
                {pagasaSignal > 0 ? "Signal #" + pagasaSignal : "SIMULATE"}
              </button>
              <div className="w-px h-4 bg-white/20 self-center mx-1"></div>
              <button
                onClick={() => setLang("tl")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === "tl" ? "bg-white text-amber-600 shadow-sm" : "text-white hover:bg-white/10"
                }`}
              >
                Tagalog
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === "en" ? "bg-white text-amber-600 shadow-sm" : "text-white hover:bg-white/10"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Visual Banner */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mx-auto md:mx-0">
              <MapPin className="w-3.5 h-3.5" />
              {t("Probinsya ng Camarines Norte", "Province of Camarines Norte")}
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {t("Maging Handa, Maging Ligtas ang Pamilyang Pilipino", "Be Prepared, Keep the Filipino Family Safe")}
            </h2>
            <p className="text-xs md:text-base text-slate-300 leading-relaxed max-w-xl mx-auto md:mx-0">
              {t(
                "Ang paghahanda ay nagsisimula sa tahanan. Gumawa ng inyong sariling Family Preparedness Plan ngayon upang masiguro ang kaligtasan ng bawat miyembro ng pamilya sa anumang sakuna.",
                "Preparedness starts at home. Create your own Family Preparedness Plan today to ensure the safety of every family member during any disaster."
              )}
            </p>
          </div>
          <div className="shrink-0 w-full md:w-auto flex justify-center">
            <img 
              src="/app-logo.png"
              alt="Tahanang Handa Logo"
              className="w-full max-w-[200px] md:w-56 h-auto object-contain bg-white/10 backdrop-blur-sm rounded-3xl border-2 border-white/20 shadow-2xl p-4"
            />
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-4 lg:mt-8 space-y-6 lg:space-y-8">
        {/* Preparedness Score Widget */}
        <div className={`rounded-2xl border shadow-sm overflow-hidden animate-fadeIn transition-all duration-500 ${
          pagasaSignal > 0 ? "bg-red-50 border-red-200" : "bg-white border-slate-200"
        }`}>
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h3 className={`text-lg font-bold flex items-center gap-2 ${pagasaSignal > 0 ? "text-red-800" : "text-slate-800"}`}>
                  <Sparkles className={`w-5 h-5 ${pagasaSignal > 0 ? "text-red-500" : "text-amber-500"}`} />
                  {t("Antas ng Kahandaan ng Pamilya", "Family Preparedness Level")}
                </h3>
                {pagasaSignal > 0 && (
                  <div className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse uppercase tracking-widest">
                    Signal #{pagasaSignal} Active
                  </div>
                )}
              </div>
              <p className={`text-xs ${pagasaSignal > 0 ? "text-red-600 font-medium" : "text-slate-500"}`}>
                {pagasaSignal > 0
                  ? t("⚠️ MAY AKTIBONG TYPHOON SIGNAL! Pakisuri agad ang inyong Go-Bag.", "⚠️ ACTIVE TYPHOON SIGNAL! Please review your Go-Bag immediately.")
                  : t("Awtomatikong kinakalkula batay sa mga impormasyon at checklist na iyong sinagutan.", "Automatically calculated based on the information and checklist items you completed.")}
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="text-center">
                <span className={`text-3xl font-black ${pagasaSignal > 0 ? "text-red-600" : "text-amber-600"}`}>{prepScore.percentage}%</span>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">{t("KUMPLETO", "COMPLETE")}</span>
              </div>
              <div className="flex-1 md:w-48 bg-slate-100 h-3 rounded-full overflow-hidden">
                <div
                  className={`${pagasaSignal > 0 ? "bg-red-500" : "bg-gradient-to-r from-amber-500 to-emerald-500"} h-full transition-all duration-500`}
                  style={{ width: `${prepScore.percentage}%` }}
                ></div>
              </div>
              <div className={`${pagasaSignal > 0 ? "bg-red-100 border-red-300 text-red-800" : "bg-amber-50 border-amber-200 text-amber-800"} border px-3 py-1.5 rounded-xl text-xs font-bold shrink-0`}>
                {prepScore.badge}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-50 bg-slate-50/50 p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {prepScore.breakdown.map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{item.label}</p>
                  <div className="flex items-end justify-between">
                    <span className="text-xl font-black text-slate-800">{item.score}<span className="text-xs text-slate-300 ml-0.5">/{item.total}</span></span>
                    <div className="w-10 h-1 bg-slate-100 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`h-full ${item.score === item.total ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${(item.score / item.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-800 leading-relaxed">
                {t(
                  "Pahiwatig: Kumpletuhin ang bawat seksyon upang tumaas ang iyong score. Ang checklist (Go-Bag) ang may pinakamalaking puntos.",
                  "Tip: Complete each section to increase your score. The checklist (Go-Bag) carries the most points."
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Shared Web & Mobile) */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 bg-white p-4 rounded-[32px] border border-slate-200 shadow-sm animate-fadeIn">
          <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button
              variant={activeSection === "wizard" ? "default" : "ghost"}
              onClick={() => setActiveSection("wizard")}
              className={`rounded-xl text-xs sm:text-sm font-black px-4 sm:px-8 py-5 sm:py-6 justify-start sm:justify-center transition-all ${
                activeSection === "wizard" ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200" : "text-slate-500 hover:bg-white"
              }`}
            >
              <Monitor className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              {t("Bumuo ng Plano", "Build Plan")}
            </Button>
            <Button
              variant={activeSection === "preview" ? "default" : "ghost"}
              onClick={() => setActiveSection("preview")}
              className={`rounded-xl text-xs sm:text-sm font-black px-4 sm:px-8 py-5 sm:py-6 justify-start sm:justify-center transition-all ${
                activeSection === "preview" ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200" : "text-slate-500 hover:bg-white"
              }`}
            >
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              {t("I-preview at I-download", "Preview & Save")}
            </Button>
            <Button
              variant={activeSection === "education" ? "default" : "ghost"}
              onClick={() => setActiveSection("education")}
              className={`rounded-xl text-xs sm:text-sm font-black px-4 sm:px-8 py-5 sm:py-6 justify-start sm:justify-center transition-all ${
                activeSection === "education" ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-200" : "text-slate-500 hover:bg-white"
              }`}
            >
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              {t("Edukasyon at Gabay", "Education")}
            </Button>
          </div>

          {/* Reset Button */}
          <Button
            onClick={handleReset}
            variant="ghost"
            className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl text-[10px] sm:text-xs font-bold flex items-center gap-2 px-4"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {t("I-reset ang Plano", "Reset Plan")}
          </Button>
        </div>

        {/* Section 1: Plan Builder View */}
        {activeSection === "wizard" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* On Mobile/Tablet: Show Optimized Mobile Wizard Experience */}
            {/* On Desktop: Left Side of Parallel View */}
            <div className="lg:col-span-8 space-y-6">
              {/* Cloud Sync Status Indicator */}
              {user && (
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-800">
                  <div className="flex items-center gap-2">
                    {isSaving ? (
                      <CloudLightning className="w-4 h-4 text-emerald-600 animate-bounce" />
                    ) : (
                      <Cloud className="w-4 h-4 text-emerald-600" />
                    )}
                    <span>
                      {isSaving 
                        ? t("Sini-sync ang iyong plano sa cloud...", "Syncing your plan to the cloud...") 
                        : t("Naka-sync ang iyong plano sa cloud!", "Your plan is synced to the cloud!")}
                    </span>
                  </div>
                  {lastSaved && (
                    <span className="text-[10px] opacity-80">
                      {t("Huling save: ", "Last saved: ")} {lastSaved}
                    </span>
                  )}
                </div>
              )}

              {/* Mobile optimized view for small screens */}
              <div className="lg:hidden flex flex-col -mx-4 sm:mx-0">
                <div className="bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden border-t sm:border border-slate-200 shadow-xl min-h-[calc(100vh-140px)] flex flex-col">
                  <MobilePlanWizard plan={plan} onChange={handlePlanChange} lang={lang} />
                </div>
              </div>

              {/* Desktop wizard view */}
              <div className="hidden lg:block space-y-6">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800 space-y-1">
                    <p className="font-bold">
                      {t("Real-time Parallel Sync Hack!", "Real-time Parallel Sync Active!")}
                    </p>
                    <p>
                      {t(
                        "Ang anumang pagbabago na iyong gagawin sa Web App (kaliwa) ay awtomatikong magpapakita sa Mobile App (kanan) at vice versa.",
                        "Any changes you make in the Web App (left) will automatically reflect in the Mobile App (right) and vice-versa."
                      )}
                    </p>
                  </div>
                </div>
                <WebPlanWizard plan={plan} onChange={handlePlanChange} lang={lang} />
              </div>
            </div>

            {/* Right Side: Simulated Smartphone Frame (Mobile App View) - Only on Desktop */}
            <div className="lg:col-span-4 sticky top-28 hidden lg:block">
              <div className="relative mx-auto w-[320px] h-[640px] bg-slate-900 rounded-[40px] shadow-2xl border-[12px] border-slate-800 overflow-hidden flex flex-col">
                {/* Speaker & Camera Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-32 bg-slate-800 rounded-b-2xl z-50 flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
                </div>

                {/* Mobile Screen Content */}
                <div className="flex-1 overflow-hidden pt-4">
                  <MobilePlanWizard plan={plan} onChange={handlePlanChange} lang={lang} />
                </div>

                {/* Home Indicator Bar */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-slate-700 rounded-full z-50"></div>
              </div>
              <p className="text-center text-xs text-slate-500 mt-3 italic">
                {t("Interactive Mobile App Simulator", "Interactive Mobile App Simulator")}
              </p>
            </div>
          </div>
        )}

        {/* Section 2: Plan Preview & Download */}
        {activeSection === "preview" && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl font-black text-slate-800">
                {t("Iyong Family Preparedness Plan", "Your Family Preparedness Plan")}
              </h2>
              <p className="text-sm text-slate-500">
                {t(
                  "Suriin ang iyong plano sa ibaba. Maaari mo itong i-print o i-save bilang PDF upang ibahagi sa iyong pamilya.",
                  "Review your plan below. You can print it or save it as a PDF to share with your family."
                )}
              </p>
            </div>

            <PlanPreview plan={plan} lang={lang} />
          </div>
        )}

        {/* Section 3: Educational Section */}
        {activeSection === "education" && (
          <div className="space-y-12">
            {/* 1. Characteristics of Prepared Families */}
            <section className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
                  <Sparkles className="w-6 h-6 text-amber-500" />
                  {t("Mga Katangian ng Pamilyang Handa", "Characteristics of a Prepared Family")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {t(
                    "Ang mga sumusunod ay ang mga magagandang katangian at kaalaman ng isang pamilyang handa sa sakuna.",
                    "The following are the key qualities and knowledge of a family prepared for disasters."
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {PREPARED_FAMILY_CHARACTERISTICS.map((char, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div>
                      <img 
                        src={char.imageUrl} 
                        alt={t(char.title.tl, char.title.en)} 
                        className="w-full h-56 md:h-48 object-contain bg-slate-50 p-2"
                      />
                      <div className="p-6 space-y-4">
                        <h3 className="font-bold text-slate-800 text-base border-b pb-2 text-amber-600">
                          {t(char.title.tl, char.title.en)}
                        </h3>
                        <ul className="space-y-2">
                          {char.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="text-xs text-slate-600 flex items-start gap-2">
                              <span className="text-amber-500 font-bold">•</span>
                              <span>{t(item.tl, item.en)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Child Preparedness by Age */}
            <section className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-black text-slate-800 flex items-center justify-center gap-2">
                  <Heart className="w-6 h-6 text-red-500" />
                  {t("Pagtuturo sa mga Bata Ayon sa Edad", "Teaching Children by Age")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {t(
                    "Mahalagang turuan ang mga bata kung paano maging handa sa mga emergency batay sa kanilang edad.",
                    "It is important to teach children how to be prepared for emergencies based on their age."
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {AGE_GUIDELINES.map((guide, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between">
                    <div>
                      <img 
                        src={guide.imageUrl} 
                        alt={t(guide.title.tl, guide.title.en)} 
                        className="w-full h-48 md:h-32 object-contain bg-slate-50 p-2"
                      />
                      <div className="p-4 space-y-2 text-center">
                        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto font-black text-sm -mt-8 relative border-2 border-white shadow-md">
                          {guide.age}
                        </div>
                        <h3 className="font-bold text-slate-800 text-xs pt-1">
                          {t(guide.title.tl, guide.title.en)}
                        </h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          {t(guide.desc.tl, guide.desc.en)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Disaster Tips (Before, During, After) */}
            <section className="space-y-6">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-black text-slate-800">
                  {t("Mga Tip sa Oras ng Kalamidad", "Disaster Preparedness Tips")}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  {t(
                    "Mga dapat gawin Bago, Habang, at Pagkatapos ng iba't ibang uri ng sakuna.",
                    "What to do Before, During, and After different types of disasters."
                  )}
                </p>
              </div>

              <div className="space-y-6">
                {DISASTER_TIPS.map((tip, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="relative h-64 md:h-80 bg-white p-2">
                      <img 
                        src={tip.imageUrl} 
                        alt={t(tip.title.tl, tip.title.en)} 
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent flex items-end p-6">
                        <h3 className="text-xl md:text-2xl font-black text-white">
                          {t(tip.title.tl, tip.title.en)}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="bg-amber-50/50 p-4 rounded-xl space-y-2">
                        <h4 className="font-bold text-amber-700 uppercase tracking-wider">
                          {t("BAGO (BEFORE)", "BEFORE")}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          {tip.before.map((b, bIdx) => (
                            <li key={bIdx}>{t(b.tl, b.en)}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-red-50/50 p-4 rounded-xl space-y-2">
                        <h4 className="font-bold text-red-700 uppercase tracking-wider">
                          {t("HABANG (DURING)", "DURING")}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          {tip.during.map((d, dIdx) => (
                            <li key={dIdx}>{t(d.tl, d.en)}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-emerald-50/50 p-4 rounded-xl space-y-2">
                        <h4 className="font-bold text-emerald-700 uppercase tracking-wider">
                          {t("PAGKATAPOS (AFTER)", "AFTER")}
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          {tip.after.map((a, aIdx) => (
                            <li key={aIdx}>{t(a.tl, a.en)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        lang={lang} 
      />
    </div>
  );
};

export default Index;