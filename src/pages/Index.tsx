import React, { useState } from "react";
import { FamilyPlanState, DEFAULT_PLAN_STATE } from "@/types/plan";
import { WebPlanWizard } from "@/components/WebPlanWizard";
import { MobilePlanWizard } from "@/components/MobilePlanWizard";
import { PlanPreview } from "@/components/PlanPreview";
import { AGE_GUIDELINES, PREPARED_FAMILY_CHARACTERISTICS, DISASTER_TIPS } from "@/data/educationalContent";
import { Button } from "@/components/ui/button";
import { Shield, Smartphone, Monitor, BookOpen, CheckCircle, Info, Heart, Sparkles, MapPin } from "lucide-react";

const Index = () => {
  const [plan, setPlan] = useState<FamilyPlanState>(DEFAULT_PLAN_STATE);
  const [lang, setLang] = useState<"tl" | "en">("tl");
  const [activeSection, setActiveSection] = useState<"wizard" | "preview" | "education">("wizard");

  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  const handlePlanChange = (updated: FamilyPlanState) => {
    setPlan(updated);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      {/* Top Branding Header */}
      <header className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white py-6 px-4 md:px-8 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
              <Shield className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight uppercase">
                {t("Ligtas CamNorte: Plano ng Pamilya", "Ligtas CamNorte: Family Preparedness Plan")}
              </h1>
              <p className="text-xs md:text-sm opacity-90 font-medium">
                {t(
                  "Gabay sa pagbuo ng plano para sa mga mamamayan ng Camarines Norte",
                  "A family preparedness plan builder for the citizens of Camarines Norte"
                )}
              </p>
            </div>
          </div>

          {/* Language & Navigation Controls */}
          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 flex">
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
        <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/30 px-3 py-1 rounded-full text-amber-400 text-xs font-bold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              {t("Probinsya ng Camarines Norte", "Province of Camarines Norte")}
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {t("Maging Handa, Maging Ligtas ang Pamilyang Pilipino", "Be Prepared, Keep the Filipino Family Safe")}
            </h2>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">
              {t(
                "Ang paghahanda ay nagsisimula sa tahanan. Gumawa ng inyong sariling Family Preparedness Plan ngayon upang masiguro ang kaligtasan ng bawat miyembro ng pamilya sa anumang sakuna.",
                "Preparedness starts at home. Create your own Family Preparedness Plan today to ensure the safety of every family member during any disaster."
              )}
            </p>
          </div>
          <div className="shrink-0 hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1590402449133-79410c36a006?auto=format&fit=crop&w=400&q=80" 
              alt="Filipino Family Preparedness" 
              className="w-72 h-48 object-cover rounded-2xl border-4 border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 mt-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex justify-center">
          <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm flex gap-2">
            <Button
              variant={activeSection === "wizard" ? "default" : "ghost"}
              onClick={() => setActiveSection("wizard")}
              className={`rounded-xl text-xs font-bold px-4 py-2 ${
                activeSection === "wizard" ? "bg-amber-500 hover:bg-amber-600 text-white" : "text-slate-600"
              }`}
            >
              <Monitor className="w-4 h-4 mr-2" />
              {t("Gumawa ng Plano (Parallel View)", "Create Plan (Parallel View)")}
            </Button>
            <Button
              variant={activeSection === "preview" ? "default" : "ghost"}
              onClick={() => setActiveSection("preview")}
              className={`rounded-xl text-xs font-bold px-4 py-2 ${
                activeSection === "preview" ? "bg-amber-500 hover:bg-amber-600 text-white" : "text-slate-600"
              }`}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {t("I-preview at I-download", "Preview & Download")}
            </Button>
            <Button
              variant={activeSection === "education" ? "default" : "ghost"}
              onClick={() => setActiveSection("education")}
              className={`rounded-xl text-xs font-bold px-4 py-2 ${
                activeSection === "education" ? "bg-amber-500 hover:bg-amber-600 text-white" : "text-slate-600"
              }`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {t("Edukasyon at Gabay", "Education & Guidelines")}
            </Button>
          </div>
        </div>

        {/* Section 1: Parallel Wizard View */}
        {activeSection === "wizard" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Side: Desktop Web App Wizard */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 space-y-1">
                  <p className="font-bold">
                    {t("Real-time Parallel Sync Aktibo!", "Real-time Parallel Sync Active!")}
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

            {/* Right Side: Simulated Smartphone Frame (Mobile App View) */}
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
                        className="w-full h-48 object-cover"
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
                        className="w-full h-32 object-cover"
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
                    <div className="relative h-48 md:h-64 bg-slate-900">
                      <img 
                        src={tip.imageUrl} 
                        alt={t(tip.title.tl, tip.title.en)} 
                        className="w-full h-full object-cover opacity-60"
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
    </div>
  );
};

export default Index;