import React, { useState } from "react";
import { FamilyPlanState } from "@/types/plan";
import { CAMARINES_NORTE_HOTLINES } from "@/data/camNorteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, Calendar, MapPin, CheckSquare, Phone, Menu, ChevronRight, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface MobilePlanWizardProps {
  plan: FamilyPlanState;
  onChange: (updated: FamilyPlanState) => void;
  lang: "tl" | "en";
}

export const MobilePlanWizard: React.FC<MobilePlanWizardProps> = ({ plan, onChange, lang }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "members" | "evac" | "checklist" | "hotlines">("profile");
  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  const updateProfile = (fields: Partial<typeof plan.profile>) => {
    onChange({
      ...plan,
      profile: { ...plan.profile, ...fields }
    });
  };

  const addMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: "",
      gender: "Lalaki (Male)",
      age: "",
      phone: "",
      bloodType: "O+",
      usualLocation: "",
      vulnerability: "None"
    };
    onChange({
      ...plan,
      members: [...plan.members, newMember]
    });
    toast.success(t("Miyembro ay naidagdag!", "Member added!"));
  };

  const removeMember = (id: string) => {
    onChange({
      ...plan,
      members: plan.members.filter((m) => m.id !== id)
    });
    toast.error(t("Miyembro ay tinanggal.", "Member removed."));
  };

  const updateMember = (id: string, fields: Partial<typeof plan.members[0]>) => {
    onChange({
      ...plan,
      members: plan.members.map((m) => (m.id === id ? { ...m, ...fields } : m))
    });
  };

  const toggleChecklistItem = (category: keyof typeof plan.checklist, item: string) => {
    const currentCategory = plan.checklist[category] as Record<string, boolean>;
    onChange({
      ...plan,
      checklist: {
        ...plan.checklist,
        [category]: {
          ...currentCategory,
          [item]: !currentCategory[item]
        }
      }
    });
  };

  const selectedMuni = CAMARINES_NORTE_HOTLINES.municipalities.find(
    (m) => m.name.toLowerCase() === plan.profile.municipality.toLowerCase()
  ) || CAMARINES_NORTE_HOTLINES.municipalities[2];

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 font-sans select-none">
      {/* Mobile App Header */}
      <div className="bg-amber-500 text-white px-4 py-3 flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-white animate-pulse" />
          <div>
            <h1 className="text-sm font-black tracking-tight uppercase">Ligtas CamNorte</h1>
            <p className="text-[10px] opacity-90">{t("Plano ng Pamilya", "Family Preparedness Plan")}</p>
          </div>
        </div>
        <div className="bg-amber-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
          {lang.toUpperCase()}
        </div>
      </div>

      {/* Mobile App Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* Tab 1: Profile */}
        {activeTab === "profile" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                {t("Lokasyon ng Bahay", "Home Location")}
              </h2>

              <div className="space-y-2">
                <Label className="text-xs text-slate-600">{t("Munisipyo", "Municipality")}</Label>
                <Select
                  value={plan.profile.municipality}
                  onValueChange={(val) => updateProfile({ municipality: val })}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CAMARINES_NORTE_HOTLINES.municipalities.map((m) => (
                      <SelectItem key={m.name} value={m.name}>
                        {m.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-slate-600">{t("Barangay", "Barangay")}</Label>
                <Input
                  value={plan.profile.barangay}
                  onChange={(e) => updateProfile({ barangay: e.target.value })}
                  placeholder={t("Ipasok ang Barangay", "Enter Barangay")}
                  className="rounded-xl border-slate-200 h-9 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-slate-600">{t("Estruktura ng Bahay", "House Structure")}</Label>
                <Select
                  value={plan.profile.houseStructure}
                  onValueChange={(val) => updateProfile({ houseStructure: val })}
                >
                  <SelectTrigger className="rounded-xl border-slate-200 h-9 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Concrete">{t("Semento (Concrete)", "Concrete")}</SelectItem>
                    <SelectItem value="Wood">{t("Kahoy (Wood)", "Wood")}</SelectItem>
                    <SelectItem value="Light Materials">{t("Magaan na Materyales", "Light Materials")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Members */}
        {activeTab === "members" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                {t("Miyembro ng Pamilya", "Family Members")}
              </h2>
              <Button onClick={addMember} size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs h-8">
                <Plus className="w-3 h-3 mr-1" />
                {t("Magdagdag", "Add")}
              </Button>
            </div>

            <div className="space-y-3">
              {plan.members.map((m) => (
                <div key={m.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 space-y-2 relative">
                  <Button variant="ghost" size="icon" onClick={() => removeMember(m.id)} className="absolute top-2 right-2 text-red-500 h-7 w-7">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>

                  <div className="space-y-2">
                    <Input
                      value={m.name}
                      onChange={(e) => updateMember(m.id, { name: e.target.value })}
                      placeholder={t("Pangalan", "Name")}
                      className="rounded-xl border-slate-200 h-8 text-xs font-bold"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={m.age}
                        onChange={(e) => updateMember(m.id, { age: e.target.value })}
                        placeholder={t("Edad", "Age")}
                        type="number"
                        className="rounded-xl border-slate-200 h-8 text-xs"
                      />
                      <Input
                        value={m.phone}
                        onChange={(e) => updateMember(m.id, { phone: e.target.value })}
                        placeholder={t("Telepono", "Phone")}
                        className="rounded-xl border-slate-200 h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Evacuation */}
        {activeTab === "evac" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                {t("Plano ng Paglikas", "Evacuation Plan")}
              </h2>

              <div className="space-y-2">
                <Label className="text-xs text-slate-600">{t("Unang Tagpuan", "Primary Meeting Place")}</Label>
                <Input
                  value={plan.evacuation.meetingPlace1}
                  onChange={(e) => onChange({
                    ...plan,
                    evacuation: { ...plan.evacuation, meetingPlace1: e.target.value }
                  })}
                  placeholder={t("Hal. Plaza", "e.g. Plaza")}
                  className="rounded-xl border-slate-200 h-9 text-xs"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-slate-600">{t("Itinalagang Evacuation Center", "Evacuation Center")}</Label>
                <Input
                  value={plan.evacuation.evacCenter1}
                  onChange={(e) => onChange({
                    ...plan,
                    evacuation: { ...plan.evacuation, evacCenter1: e.target.value }
                  })}
                  placeholder={t("Hal. Covered Court", "e.g. Covered Court")}
                  className="rounded-xl border-slate-200 h-9 text-xs"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Checklist */}
        {activeTab === "checklist" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-500" />
                {t("Checklist ng Go Bag", "Go Bag Checklist")}
              </h2>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <Checkbox
                    checked={plan.checklist.documentsCash.emergencyMoney}
                    onCheckedChange={() => toggleChecklistItem("documentsCash", "emergencyMoney")}
                  />
                  <span className="text-xs text-slate-700">{t("Pera at ATM Cards", "Cash & ATM Cards")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <Checkbox
                    checked={plan.checklist.documentsCash.govIds}
                    onCheckedChange={() => toggleChecklistItem("documentsCash", "govIds")}
                  />
                  <span className="text-xs text-slate-700">{t("Mga ID at Dokumento", "IDs & Documents")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <Checkbox
                    checked={plan.checklist.foodMeds.drinkingWater}
                    onCheckedChange={() => toggleChecklistItem("foodMeds", "drinkingWater")}
                  />
                  <span className="text-xs text-slate-700">{t("Tubig na Inumin", "Drinking Water")}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer py-1">
                  <Checkbox
                    checked={plan.checklist.tools.flashlight}
                    onCheckedChange={() => toggleChecklistItem("tools", "flashlight")}
                  />
                  <span className="text-xs text-slate-700">{t("Flashlight at Powerbank", "Flashlight & Powerbank")}</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Hotlines */}
        {activeTab === "hotlines" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3">
              <h2 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500" />
                {t("Mga Emergency Hotline", "Emergency Hotlines")}
              </h2>

              <div className="space-y-2 text-xs">
                <div className="p-2 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="font-bold text-amber-800 uppercase">PDRRMO CamNorte</p>
                  <p className="text-slate-600">Opcen: {CAMARINES_NORTE_HOTLINES.pdrrmo.opcen}</p>
                  <p className="text-slate-600">Smart: {CAMARINES_NORTE_HOTLINES.pdrrmo.smart}</p>
                </div>

                <div className="p-2 bg-amber-50 rounded-xl border border-amber-100">
                  <p className="font-bold text-amber-800 uppercase">MDRRMO {selectedMuni.name}</p>
                  <p className="text-slate-600">Hotline: {selectedMuni.mdrrmo.join(" / ")}</p>
                  <p className="text-slate-600">PNP: {selectedMuni.pnp}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile App Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 py-2 px-4 flex justify-around items-center shadow-lg shrink-0 z-10">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 ${activeTab === "profile" ? "text-amber-500" : "text-slate-400"}`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[9px] font-bold">{t("Profil", "Profile")}</span>
        </button>

        <button
          onClick={() => setActiveTab("members")}
          className={`flex flex-col items-center gap-1 ${activeTab === "members" ? "text-amber-500" : "text-slate-400"}`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[9px] font-bold">{t("Pamilya", "Family")}</span>
        </button>

        <button
          onClick={() => setActiveTab("evac")}
          className={`flex flex-col items-center gap-1 ${activeTab === "evac" ? "text-amber-500" : "text-slate-400"}`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[9px] font-bold">{t("Likas", "Evac")}</span>
        </button>

        <button
          onClick={() => setActiveTab("checklist")}
          className={`flex flex-col items-center gap-1 ${activeTab === "checklist" ? "text-amber-500" : "text-slate-400"}`}
        >
          <CheckSquare className="w-5 h-5" />
          <span className="text-[9px] font-bold">{t("Gamit", "Kit")}</span>
        </button>

        <button
          onClick={() => setActiveTab("hotlines")}
          className={`flex flex-col items-center gap-1 ${activeTab === "hotlines" ? "text-amber-500" : "text-slate-400"}`}
        >
          <Phone className="w-5 h-5" />
          <span className="text-[9px] font-bold">{t("Hotline", "Hotline")}</span>
        </button>
      </div>
    </div>
  );
};