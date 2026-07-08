import React, { useState } from "react";
import { FamilyPlanState } from "@/types/plan";
import { CAMARINES_NORTE_HOTLINES } from "@/data/camNorteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, Users, Calendar, MapPin, CheckSquare, Phone, Menu, ChevronRight, Plus, Trash2, Info, AlertTriangle, Zap, Droplets } from "lucide-react";
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
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 font-sans select-none relative">
      {/* Mobile App Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-28">

        {/* Tab 1: Profile (Enhanced) */}
        {activeTab === "profile" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 space-y-5">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <div className="p-1.5 bg-amber-50 rounded-lg text-amber-500">
                  <MapPin className="w-4 h-4" />
                </div>
                {t("Impormasyon ng Sambahayan", "Household Information")}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-slate-500 ml-1 uppercase">{t("Munisipyo", "Municipality")}</Label>
                  <Select
                    value={plan.profile.municipality}
                    onValueChange={(val) => updateProfile({ municipality: val })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 h-10 text-xs shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CAMARINES_NORTE_HOTLINES.municipalities.map((m) => (
                        <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-500 ml-1 uppercase">{t("Barangay", "Barangay")}</Label>
                    <Input
                      value={plan.profile.barangay}
                      onChange={(e) => updateProfile({ barangay: e.target.value })}
                      className="rounded-xl border-slate-200 h-10 text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-500 ml-1 uppercase">{t("Sitio/Purok", "Sitio/Purok")}</Label>
                    <Input
                      value={plan.profile.sitio}
                      onChange={(e) => updateProfile({ sitio: e.target.value })}
                      className="rounded-xl border-slate-200 h-10 text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-slate-500 ml-1 uppercase">{t("Pagmamay-ari ng Bahay", "House Ownership")}</Label>
                  <Select
                    value={plan.profile.houseOwnership}
                    onValueChange={(val) => updateProfile({ houseOwnership: val })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 h-10 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Owned">{t("May-ari (Owned)", "Owned")}</SelectItem>
                      <SelectItem value="Rented">{t("Nangungupahan (Rented)", "Rented")}</SelectItem>
                      <SelectItem value="Shared">{t("Nakikitira (Shared)", "Shared")}</SelectItem>
                      <SelectItem value="Informal Settler">{t("Informal Settler", "Informal Settler")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-slate-500 ml-1 uppercase">{t("Estruktura ng Bahay", "House Structure")}</Label>
                  <Select
                    value={plan.profile.houseStructure}
                    onValueChange={(val) => updateProfile({ houseStructure: val })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 h-10 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Concrete">{t("Semento (Concrete)", "Concrete")}</SelectItem>
                      <SelectItem value="Wood">{t("Kahoy (Wood)", "Wood")}</SelectItem>
                      <SelectItem value="Semi-Concrete">{t("Semi-Concrete", "Semi-Concrete")}</SelectItem>
                      <SelectItem value="Light Materials">{t("Magaan na Materyales", "Light Materials")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-500 ml-1 uppercase">{t("Pinagkukunan ng Tubig", "Water Source")}</Label>
                    <Select value={plan.profile.waterSource} onValueChange={(val) => updateProfile({ waterSource: val })}>
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Faucet">{t("Gripo (Faucet)", "Faucet")}</SelectItem>
                        <SelectItem value="Well">{t("Balon (Well)", "Well")}</SelectItem>
                        <SelectItem value="Shared">{t("Nakikihati (Shared)", "Shared")}</SelectItem>
                        <SelectItem value="Spring">{t("Bukal (Spring)", "Spring")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[11px] font-bold text-slate-500 ml-1 uppercase">{t("Uri ng Palikuran", "Toilet Facility")}</Label>
                    <Select value={plan.profile.toiletFacility} onValueChange={(val) => updateProfile({ toiletFacility: val })}>
                      <SelectTrigger className="rounded-xl border-slate-200 h-10 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Water-sealed">{t("Water-sealed", "Water-sealed")}</SelectItem>
                        <SelectItem value="Open pit">{t("Open pit", "Open pit")}</SelectItem>
                        <SelectItem value="None">{t("Walang sariling CR", "None")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-slate-500 ml-1 uppercase">{t("Mga Bantang Panganib", "Hazards in Location")}</Label>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {["Baha (Flood)", "Lindol (Earthquake)", "Landslide", "Bagyo (Typhoon)", "Tsunami", "Storm Surge"].map((hazard) => {
                      const isChecked = plan.profile.hazardVulnerability.includes(hazard);
                      return (
                        <label key={hazard} className={`flex items-center gap-2 p-2 rounded-xl border transition-colors cursor-pointer ${isChecked ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100'}`}>
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => {
                              const updated = isChecked
                                ? plan.profile.hazardVulnerability.filter((h) => h !== hazard)
                                : [...plan.profile.hazardVulnerability, hazard];
                              updateProfile({ hazardVulnerability: updated });
                            }}
                          />
                          <span className="text-[10px] text-slate-700 font-medium leading-tight">{hazard}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Members */}
        {activeTab === "members" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                {t("Miyembro ng Pamilya", "Family Members")}
              </h2>
              <Button onClick={addMember} size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-[10px] font-bold h-7 px-3">
                <Plus className="w-3 h-3 mr-1" />
                {t("MAGDAGDAG", "ADD")}
              </Button>
            </div>

            <div className="space-y-3">
              {plan.members.map((m) => (
                <div key={m.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-3 relative">
                  <Button variant="ghost" size="icon" onClick={() => removeMember(m.id)} className="absolute top-2 right-2 text-red-500 h-7 w-7 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Pangalan", "Name")}</Label>
                      <Input
                        value={m.name}
                        onChange={(e) => updateMember(m.id, { name: e.target.value })}
                        className="rounded-xl border-slate-200 h-9 text-xs font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Edad", "Age")}</Label>
                        <Input
                          value={m.age}
                          onChange={(e) => updateMember(m.id, { age: e.target.value })}
                          type="number"
                          className="rounded-xl border-slate-200 h-9 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Blood Type", "Blood Type")}</Label>
                        <Select value={m.bloodType} onValueChange={(val) => updateMember(m.id, { bloodType: val })}>
                          <SelectTrigger className="rounded-xl border-slate-200 h-9 text-xs"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map(bt => (
                              <SelectItem key={bt} value={bt}>{bt}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Telepono", "Phone")}</Label>
                      <Input
                        value={m.phone}
                        onChange={(e) => updateMember(m.id, { phone: e.target.value })}
                        placeholder="09XX-XXX-XXXX"
                        className="rounded-xl border-slate-200 h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Karaniwang Lugar", "Usual Location")}</Label>
                      <Input
                        value={m.usualLocation}
                        onChange={(e) => updateMember(m.id, { usualLocation: e.target.value })}
                        placeholder={t("Hal. Trabaho, Paaralan", "e.g. Work, School")}
                        className="rounded-xl border-slate-200 h-9 text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Kondisyon / Vulnerability", "Vulnerability")}</Label>
                      <Select value={m.vulnerability} onValueChange={(val) => updateMember(m.id, { vulnerability: val })}>
                        <SelectTrigger className="rounded-xl border-slate-200 h-9 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="None">{t("Walang Espesyal na Kondisyon", "No Special Condition")}</SelectItem>
                          <SelectItem value="Senior Citizen">{t("Senior Citizen", "Senior Citizen")}</SelectItem>
                          <SelectItem value="Infant / Bata">{t("Bata / Infant", "Child / Infant")}</SelectItem>
                          <SelectItem value="Pregnant">{t("Buntis (Pregnant)", "Pregnant")}</SelectItem>
                          <SelectItem value="PWD">{t("PWD (Person with Disability)", "PWD")}</SelectItem>
                        </SelectContent>
                      </Select>
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
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                {t("Plano ng Paglikas", "Evacuation Plan")}
              </h2>

              <div className="space-y-4 pt-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Info className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t("Mga Lugar ng Tagpuan", "Meeting Places")}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-500 ml-1">{t("Unang Tagpuan (Primary)", "Primary Meeting Place")}</Label>
                      <Input
                        value={plan.evacuation.meetingPlace1}
                        onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, meetingPlace1: e.target.value}})}
                        placeholder={t("Hal. Plaza", "e.g. Plaza")}
                        className="rounded-xl border-slate-200 h-10 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-500 ml-1">{t("Pangalawang Tagpuan (Secondary)", "Secondary Meeting Place")}</Label>
                      <Input
                        value={plan.evacuation.meetingPlace2}
                        onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, meetingPlace2: e.target.value}})}
                        placeholder={t("Hal. Tapat ng Simbahan", "e.g. Near Church")}
                        className="rounded-xl border-slate-200 h-10 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{t("Evacuation Centers", "Evacuation Centers")}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-500 ml-1">{t("Center 1 (Primary)", "Evacuation Center 1")}</Label>
                      <Input
                        value={plan.evacuation.evacCenter1}
                        onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, evacCenter1: e.target.value}})}
                        placeholder={t("Hal. Covered Court", "e.g. Covered Court")}
                        className="rounded-xl border-slate-200 h-10 text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-500 ml-1">{t("Center 2 (Alternative)", "Evacuation Center 2")}</Label>
                      <Input
                        value={plan.evacuation.evacCenter2}
                        onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, evacCenter2: e.target.value}})}
                        placeholder={t("Hal. Paaralan", "e.g. School")}
                        className="rounded-xl border-slate-200 h-10 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-[10px] font-bold text-amber-700 ml-1 uppercase">{t("Layout ng Bahay at Exit Points", "House Layout & Exit Points")}</Label>
                  <Textarea
                    value={plan.evacuation.houseLayoutNotes}
                    onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, houseLayoutNotes: e.target.value}})}
                    placeholder={t("Ilarawan ang mga labasan at bintana...", "Describe exit points and windows...")}
                    className="rounded-xl border-slate-200 text-xs min-h-[80px]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Checklist */}
        {activeTab === "checklist" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 space-y-5">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-amber-500" />
                {t("Go Bag Checklist", "Go Bag Checklist")}
              </h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-amber-700 uppercase tracking-widest bg-amber-50 px-2 py-1 rounded-md inline-block">
                    {t("Dokumento at Pera", "Documents & Cash")}
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {Object.entries(plan.checklist.documentsCash).map(([key, val]) => (
                      <label key={key} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                        <Checkbox checked={val} onCheckedChange={() => toggleChecklistItem("documentsCash", key)} className="rounded-md" />
                        <span className="text-[11px] text-slate-600 font-medium">
                          {key === "emergencyMoney" ? t("Pera at ATM Cards", "Cash & ATM Cards") :
                           key === "govIds" ? t("Mga Government IDs", "Government IDs") :
                           key === "importantDocs" ? t("Birth/Marriage Certificates", "Important Documents") :
                           key === "familyPhotos" ? t("Larawan ng Pamilya", "Family Photos") :
                           t("Notebook at Panulat", "Notebook & Pen")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-pink-700 uppercase tracking-widest bg-pink-50 px-2 py-1 rounded-md inline-block">
                    {t("Kalinisan at Damit", "Toiletries & Clothes")}
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {Object.entries(plan.checklist.toiletries).map(([key, val]) => (
                      <label key={key} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                        <Checkbox checked={val} onCheckedChange={() => toggleChecklistItem("toiletries", key)} className="rounded-md" />
                        <span className="text-[11px] text-slate-600 font-medium">
                          {key === "covidKit" ? t("Alcohol at Face Masks", "Alcohol & Face Masks") :
                           key === "soapToothbrush" ? t("Sabon at Toothbrush", "Soap & Toothbrush") :
                           key === "clothes" ? t("Ekstrang Damit", "Extra Clothes") :
                           key === "mosquitoRepellant" ? t("Mosquito Repellant", "Mosquito Repellant") :
                           key === "menstrualPads" ? t("Sanitary Pads", "Sanitary Pads") :
                           key === "babyDiapers" ? t("Diapers (kung mayroon)", "Baby Diapers") :
                           key === "wetWipesTissue" ? t("Wet Wipes at Tissue", "Wet Wipes & Tissue") :
                           t("Kumot at Kapote", "Blanket & Raincoat")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md inline-block">
                    {t("Pagkain at Gamot", "Food & Medicines")}
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {Object.entries(plan.checklist.foodMeds).map(([key, val]) => (
                      <label key={key} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                        <Checkbox checked={val} onCheckedChange={() => toggleChecklistItem("foodMeds", key)} className="rounded-md" />
                        <span className="text-[11px] text-slate-600 font-medium">
                          {key === "drinkingWater" ? t("Tubig na Inumin", "Drinking Water") :
                           key === "readyToEatFood" ? t("Pagkaing Ready-to-Eat", "Ready-to-Eat Food") :
                           key === "firstAidMeds" ? t("First Aid at Gamot", "First Aid & Meds") :
                           key === "babyMeds" ? t("Gamot sa Sanggol", "Baby Meds") :
                           key === "canOpenerUtensils" ? t("Can Opener/Kubyertos", "Can Opener/Utensils") :
                           t("Maintenance Meds", "Maintenance Meds")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-black text-blue-700 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md inline-block">
                    {t("Kasangkapan", "Emergency Tools")}
                  </p>
                  <div className="grid grid-cols-1 gap-1">
                    {Object.entries(plan.checklist.tools).map(([key, val]) => (
                      <label key={key} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                        <Checkbox checked={val} onCheckedChange={() => toggleChecklistItem("tools", key)} className="rounded-md" />
                        <span className="text-[11px] text-slate-600 font-medium">
                          {key === "flashlight" ? t("Flashlight/Powerbank", "Flashlight/Powerbank") :
                           key === "whistle" ? t("Pito (Whistle)", "Whistle") :
                           key === "candleMatches" ? t("Kandila at Posporo", "Candle & Matches") :
                           key === "ropeRaincoat" ? t("Tali at Kapote", "Rope & Raincoat") :
                           key === "radioBlanket" ? t("Radio at Kumot", "Radio & Blanket") :
                           key === "multiToolKnife" ? t("Multi-tool Knife", "Multi-tool Knife") :
                           key === "extraBatteries" ? t("Ekstrang Baterya", "Extra Batteries") :
                           t("Laruan para sa Bata", "Comfort Toy")}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Hotlines */}
        {activeTab === "hotlines" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Personalize Barangay Hotlines */}
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 rounded-lg text-blue-500">
                  <Info className="w-4 h-4" />
                </div>
                {t("Hotline ng Inyong Barangay", "Your Barangay Hotlines")}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">{t("Hotline ng Brgy.", "Barangay Hotline")}</Label>
                  <Input
                    value={plan.profile.brgyHotline}
                    onChange={(e) => updateProfile({ brgyHotline: e.target.value })}
                    placeholder="09XX-XXX-XXXX"
                    className="rounded-xl border-slate-200 h-9 text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">BPSO</Label>
                    <Input
                      value={plan.profile.bpsoHotline}
                      onChange={(e) => updateProfile({ bpsoHotline: e.target.value })}
                      placeholder="Hotline"
                      className="rounded-xl border-slate-200 h-9 text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">BHW</Label>
                    <Input
                      value={plan.profile.bhwHotline}
                      onChange={(e) => updateProfile({ bhwHotline: e.target.value })}
                      placeholder="Hotline"
                      className="rounded-xl border-slate-200 h-9 text-xs"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-500 uppercase ml-1">{t("At Iba pa", "Others")}</Label>
                  <Input
                    value={plan.profile.otherHotline}
                    onChange={(e) => updateProfile({ otherHotline: e.target.value })}
                    placeholder={t("Ibang emergency contacts", "Other emergency contacts")}
                    className="rounded-xl border-slate-200 h-9 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Provincial Hotlines */}
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-600" />
                {t("Provincial Hotlines (PDRRMO)", "Provincial Hotlines (PDRRMO)")}
              </h2>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 space-y-1.5">
                  <p className="text-slate-600 flex justify-between items-center border-b border-amber-100 pb-1">
                    <span className="font-bold">OPCEN:</span>
                    <span className="font-black text-amber-900">{CAMARINES_NORTE_HOTLINES.pdrrmo.opcen}</span>
                  </p>
                  <p className="text-slate-600 flex justify-between items-center">
                    <span className="font-bold">SMART:</span>
                    <span className="font-black text-amber-900">{CAMARINES_NORTE_HOTLINES.pdrrmo.smart}</span>
                  </p>
                  <p className="text-slate-600 flex justify-between items-center">
                    <span className="font-bold">GLOBE:</span>
                    <span className="font-black text-amber-900">{CAMARINES_NORTE_HOTLINES.pdrrmo.globe}</span>
                  </p>
                  <div className="pt-1 flex gap-2">
                    <div className="flex-1 bg-white p-1.5 rounded-lg border border-amber-100 text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">PNP</p>
                      <p className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.pdrrmo.pnp}</p>
                    </div>
                    <div className="flex-1 bg-white p-1.5 rounded-lg border border-amber-100 text-center">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">BFP</p>
                      <p className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.pdrrmo.bfp}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Municipal Hotlines */}
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                {t(`MDRRMO ${selectedMuni.name}`, `MDRRMO ${selectedMuni.name}`)}
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-1.5">
                  <p className="text-[10px] font-black text-emerald-800 uppercase tracking-tighter border-b border-emerald-100 pb-1">{t("MDRRMO Hotline", "MDRRMO Hotline")}</p>
                  <div className="space-y-1">
                    {selectedMuni.mdrrmo.map((m, i) => (
                      <p key={i} className="font-black text-emerald-900 text-xs">{m}</p>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase">PNP {selectedMuni.name}</p>
                    <p className="font-black text-slate-800 text-xs mt-0.5">{selectedMuni.pnp}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <p className="text-[9px] font-black text-slate-400 uppercase">BFP {selectedMuni.name}</p>
                    <p className="font-black text-slate-800 text-xs mt-0.5">{selectedMuni.bfp}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Utility Hotlines */}
            <div className="bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-base font-black text-slate-800 flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                {t("Mga Utility Hotline", "Utility Hotlines")}
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[11px] font-bold">CANORECO</span>
                  </div>
                  <span className="text-xs font-black text-slate-700">{CAMARINES_NORTE_HOTLINES.utilities.canoreco}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-[11px] font-bold">Prime Water</span>
                  </div>
                  <span className="text-xs font-black text-slate-700">{CAMARINES_NORTE_HOTLINES.utilities.primeWater}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[11px] font-bold">CN Water District</span>
                  </div>
                  <span className="text-xs font-black text-slate-700">{CAMARINES_NORTE_HOTLINES.utilities.waterDistrict}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-red-500" />
                    <span className="text-[11px] font-bold">BFP Provincial</span>
                  </div>
                  <span className="text-xs font-black text-slate-700">{CAMARINES_NORTE_HOTLINES.utilities.bfpProvincial}</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Mobile App Bottom Navigation Bar */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-3 px-2 flex justify-around items-center shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] shrink-0 z-50 rounded-t-[32px]">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === "profile" ? "text-amber-500 scale-110" : "text-slate-400"}`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === "profile" ? "bg-amber-50" : ""}`}>
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">{t("Profil", "Profile")}</span>
        </button>

        <button
          onClick={() => setActiveTab("members")}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === "members" ? "text-amber-500 scale-110" : "text-slate-400"}`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === "members" ? "bg-amber-50" : ""}`}>
            <Users className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">{t("Pamilya", "Family")}</span>
        </button>

        <button
          onClick={() => setActiveTab("evac")}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === "evac" ? "text-amber-500 scale-110" : "text-slate-400"}`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === "evac" ? "bg-amber-50" : ""}`}>
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">{t("Likas", "Evac")}</span>
        </button>

        <button
          onClick={() => setActiveTab("checklist")}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === "checklist" ? "text-amber-500 scale-110" : "text-slate-400"}`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === "checklist" ? "bg-amber-50" : ""}`}>
            <CheckSquare className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">{t("Gamit", "Kit")}</span>
        </button>

        <button
          onClick={() => setActiveTab("hotlines")}
          className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === "hotlines" ? "text-amber-500 scale-110" : "text-slate-400"}`}
        >
          <div className={`p-1.5 rounded-xl ${activeTab === "hotlines" ? "bg-amber-50" : ""}`}>
            <Phone className="w-6 h-6" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-tighter">{t("Hotline", "Hotline")}</span>
        </button>
      </div>
    </div>
  );
};
