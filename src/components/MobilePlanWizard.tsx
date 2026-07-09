import React, { useState } from "react";
import { FamilyPlanState, FamilyMember, FamilyRole } from "@/types/plan";
import { CAMARINES_NORTE_HOTLINES } from "@/data/camNorteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  Users,
  Calendar,
  MapPin,
  CheckSquare,
  Phone,
  Plus,
  Trash2,
  Briefcase,
  Lightbulb,
  Droplets,
  Home,
  AlertTriangle,
  Flame,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface MobilePlanWizardProps {
  plan: FamilyPlanState;
  onChange: (updated: FamilyPlanState) => void;
  lang: "tl" | "en";
}

export const MobilePlanWizard: React.FC<MobilePlanWizardProps> = ({ plan, onChange, lang }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "members" | "roles" | "evac" | "checklist" | "schedule">("profile");
  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  const updateProfile = (fields: Partial<typeof plan.profile>) => {
    onChange({
      ...plan,
      profile: { ...plan.profile, ...fields }
    });
  };

  const addMember = () => {
    const newMember: FamilyMember = {
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
      members: plan.members.filter((m) => m.id !== id),
      roles: plan.roles.filter((r) => r.memberId !== id)
    });
    toast.error(t("Miyembro ay tinanggal.", "Member removed."));
  };

  const updateMember = (id: string, fields: Partial<FamilyMember>) => {
    onChange({
      ...plan,
      members: plan.members.map((m) => (m.id === id ? { ...m, ...fields } : m))
    });
  };

  const addRelative = () => {
    const newRelative: RelativeContact = {
      id: Date.now().toString(),
      name: "",
      gender: "Lalaki (Male)",
      age: "",
      phone: "",
      bloodType: "O+",
      address: ""
    };
    onChange({
      ...plan,
      relatives: [...plan.relatives, newRelative]
    });
    toast.success(t("Emergency contact ay naidagdag!", "Emergency contact added!"));
  };

  const removeRelative = (id: string) => {
    onChange({
      ...plan,
      relatives: plan.relatives.filter((r) => r.id !== id)
    });
    toast.error(t("Emergency contact ay tinanggal.", "Emergency contact removed."));
  };

  const updateRelative = (id: string, fields: Partial<RelativeContact>) => {
    onChange({
      ...plan,
      relatives: plan.relatives.map((r) => (r.id === id ? { ...r, ...fields } : r))
    });
  };

  const addRole = () => {
    const newRole: FamilyRole = {
      memberId: plan.members[0]?.id || "1",
      memberName: plan.members[0]?.name || "",
      roleType: "Anak",
      tasksBefore: "",
      tasksDuring: "",
      tasksAfter: "",
      otherNotes: ""
    };
    onChange({
      ...plan,
      roles: [...plan.roles, newRole]
    });
    toast.success(t("Tungkulin ay naidagdag!", "Role added!"));
  };

  const removeRole = (index: number) => {
    onChange({
      ...plan,
      roles: plan.roles.filter((_, idx) => idx !== index)
    });
    toast.error(t("Tungkulin ay tinanggal.", "Role removed."));
  };

  const updateRole = (index: number, fields: Partial<FamilyRole>) => {
    onChange({
      ...plan,
      roles: plan.roles.map((r, idx) => (idx === index ? { ...r, ...fields } : r))
    });
  };

  const toggleChecklistItem = (category: keyof typeof plan.checklist, item: string) => {
    const categoryData = plan.checklist[category] as any;
    onChange({
      ...plan,
      checklist: {
        ...plan.checklist,
        [category]: {
          ...categoryData,
          [item]: !categoryData[item]
        }
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 font-sans select-none relative">
      {/* Mobile App Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-32 no-scrollbar">

        {/* Tab 1: Detailed Profile */}
        {activeTab === "profile" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-5">
              <div className="border-b pb-4 mb-2 text-center">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                  {t("Profil ng Sambahayan", "Household Profile")}
                </h2>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-2 italic px-2">
                  {t(
                    "Sa paglalaan ng oras para magkaroon ng isang mahusay na nakahandang plano sa sakuna para sa pamilya o personal, ang iyong pagkabalisa tungkol sa iyong sarili at kapakanan ng iyong pamilya sa panahon ng agarang banta mula sa isang peligro ay lubos na mababawasan.",
                    "By dedicating time to having a well-prepared disaster plan for the family or personally, your anxiety about your own and your family's welfare during an immediate threat from a hazard will be significantly reduced."
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Pangalan ng Puno ng Pamilya", "Name of Head of Household")}</Label>
                  <Input value={plan.profile.headOfHousehold} onChange={(e) => updateProfile({ headOfHousehold: e.target.value })} placeholder={t("Buong Pangalan", "Full Name")} className="rounded-2xl border-slate-200 h-11 text-xs font-bold px-4 shadow-sm" />
                </div>

                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Munisipyo", "Municipality")}</Label>
                  <Select value={plan.profile.municipality} onValueChange={(val) => updateProfile({ municipality: val })}>
                    <SelectTrigger className="rounded-2xl border-slate-200 h-11 text-xs px-4 shadow-sm"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-2xl">
                      {CAMARINES_NORTE_HOTLINES.municipalities.map((m) => (
                        <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Barangay", "Barangay")}</Label>
                    <Input value={plan.profile.barangay} onChange={(e) => updateProfile({ barangay: e.target.value })} placeholder="Barangay" className="rounded-2xl border-slate-200 h-11 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Sitio / Purok", "Sitio")}</Label>
                    <Input value={plan.profile.sitio} onChange={(e) => updateProfile({ sitio: e.target.value })} placeholder="Sitio" className="rounded-2xl border-slate-200 h-11 text-xs" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Estruktura", "Structure")}</Label>
                    <Select value={plan.profile.houseStructure} onValueChange={(val) => updateProfile({ houseStructure: val })}>
                      <SelectTrigger className="rounded-2xl border-slate-200 h-11 text-xs px-4 shadow-sm"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="Concrete">{t("Semento", "Concrete")}</SelectItem>
                        <SelectItem value="Wood">{t("Kahoy", "Wood")}</SelectItem>
                        <SelectItem value="Light Materials">{t("Magaan", "Light")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Pagmamay-ari", "Ownership")}</Label>
                    <Select value={plan.profile.houseOwnership} onValueChange={(val) => updateProfile({ houseOwnership: val })}>
                      <SelectTrigger className="rounded-2xl border-slate-200 h-11 text-xs px-4 shadow-sm"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="Owned">{t("Sarili", "Owned")}</SelectItem>
                        <SelectItem value="Rented">{t("Renta", "Rented")}</SelectItem>
                        <SelectItem value="Informal">{t("Informal", "Informal")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
              <h2 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-500" />
                {t("Utilities at Panganib", "Utilities & Hazards")}
              </h2>

              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase">{t("Kuryente", "Electricity")}</Label>
                    <Select value={plan.profile.electricitySource} onValueChange={(val) => updateProfile({ electricitySource: val })}>
                      <SelectTrigger className="border-none bg-transparent h-6 p-0 text-xs shadow-none focus:ring-0 font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="CANORECO">CANORECO</SelectItem>
                        <SelectItem value="Solar">Solar</SelectItem>
                        <SelectItem value="Generator">Generator</SelectItem>
                        <SelectItem value="None">{t("Wala", "None")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <Droplets className="w-5 h-5 text-blue-500 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase">{t("Tubig", "Water")}</Label>
                    <Input value={plan.profile.waterSource} onChange={(e) => updateProfile({ waterSource: e.target.value })} className="border-none bg-transparent h-6 p-0 text-xs shadow-none focus-visible:ring-0 font-bold" placeholder="e.g. Faucet, Well" />
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <Flame className="w-5 h-5 text-orange-500 shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase">{t("Lutuan", "Cooking")}</Label>
                    <Select value={plan.profile.cookingFacility} onValueChange={(val) => updateProfile({ cookingFacility: val })}>
                      <SelectTrigger className="border-none bg-transparent h-6 p-0 text-xs shadow-none focus:ring-0 font-bold"><SelectValue /></SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="Gas">Gas (LPG)</SelectItem>
                        <SelectItem value="Charcoal">{t("Uling", "Charcoal")}</SelectItem>
                        <SelectItem value="Electric">{t("Kuryente", "Electric")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Mga Panganib", "Hazards")}</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Baha", "Lindol", "Landslide", "Bagyo", "Storm Surge"].map((hazard) => {
                      const isChecked = plan.profile.hazardVulnerability.includes(hazard);
                      return (
                        <button
                          key={hazard}
                          onClick={() => {
                            const updated = isChecked
                              ? plan.profile.hazardVulnerability.filter(h => h !== hazard)
                              : [...plan.profile.hazardVulnerability, hazard];
                            updateProfile({ hazardVulnerability: updated });
                          }}
                          className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border ${
                            isChecked ? "bg-red-500 border-red-500 text-white shadow-md" : "bg-white border-slate-200 text-slate-400"
                          }`}
                        >
                          {hazard}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Family Members (Detailed) */}
        {activeTab === "members" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
              <div className="border-b pb-4 mb-2 text-center">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center justify-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  {t("Direktoryo ng mga Miyembro ng Pamilya", "Directory of Family Members")}
                </h2>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-2 italic px-2">
                  {t(
                    "Ang pagkakaroon ng kumpletong listahan ng bawat miyembro ng pamilya ay mahalaga upang matukoy ang mga espesyal na pangangailangan at masiguro ang kaligtasan ng lahat sa oras ng paglikas.",
                    "Having a complete list of every family member is essential to identify special needs and ensure everyone's safety during evacuation."
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between px-1 pt-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">{t("Mga Miyembro sa Bahay", "Household Members")}</h3>
                <Button onClick={addMember} size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-[10px] font-bold h-9 px-4">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  {t("DAGDAG", "ADD")}
                </Button>
              </div>

              <div className="space-y-4">
              {plan.members.map((m) => (
                <div key={m.id} className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100 space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <Button variant="ghost" size="icon" onClick={() => removeMember(m.id)} className="text-red-400 h-8 w-8 hover:bg-red-50 rounded-xl">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <Input value={m.name} onChange={(e) => updateMember(m.id, { name: e.target.value })} placeholder={t("Pangalan", "Full Name")} className="rounded-2xl border-slate-200 h-10 text-xs font-bold pr-10" />

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Edad", "Age")}</Label>
                      <Input value={m.age} onChange={(e) => updateMember(m.id, { age: e.target.value })} type="number" className="rounded-2xl border-slate-200 h-10 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Blood Type", "Blood")}</Label>
                      <Select value={m.bloodType} onValueChange={(val) => updateMember(m.id, { bloodType: val })}>
                        <SelectTrigger className="rounded-2xl border-slate-200 h-10 text-xs px-3 shadow-sm"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Telepono", "Phone")}</Label>
                      <Input value={m.phone} onChange={(e) => updateMember(m.id, { phone: e.target.value })} placeholder="09XX-XXX-XXXX" className="rounded-2xl border-slate-200 h-10 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Vulnerability", "Condition")}</Label>
                      <Select value={m.vulnerability} onValueChange={(val) => updateMember(m.id, { vulnerability: val })}>
                        <SelectTrigger className="rounded-2xl border-slate-200 h-10 text-xs px-3 shadow-sm"><SelectValue /></SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="None">{t("Normal", "None")}</SelectItem>
                          <SelectItem value="Senior Citizen">Senior Citizen</SelectItem>
                          <SelectItem value="PWD">PWD</SelectItem>
                          <SelectItem value="Pregnant">{t("Buntis", "Pregnant")}</SelectItem>
                          <SelectItem value="Infant">{t("Sanggol", "Infant")}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Other Emergency Contacts Section */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-500" />
                  {t("Ibang Kontak sa Emergency", "Other Emergency Contacts")}
                </h2>
                <Button onClick={addRelative} size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-[10px] font-bold h-9 px-4">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  {t("DAGDAG", "ADD")}
                </Button>
              </div>
              <p className="text-[10px] text-slate-500 font-medium px-1 italic">
                {t("Mga kamag-anak o kaibigan na hindi niyo kasama sa bahay.", "Relatives or friends not living in the same house.")}
              </p>

              <div className="space-y-4">
                {plan.relatives.map((r) => (
                  <div key={r.id} className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2">
                      <Button variant="ghost" size="icon" onClick={() => removeRelative(r.id)} className="text-red-400 h-8 w-8 hover:bg-red-50 rounded-xl">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <Input value={r.name} onChange={(e) => updateRelative(r.id, { name: e.target.value })} placeholder={t("Pangalan", "Full Name")} className="rounded-2xl border-slate-200 h-10 text-xs font-bold pr-10" />

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Telepono", "Phone")}</Label>
                        <Input value={r.phone} onChange={(e) => updateRelative(r.id, { phone: e.target.value })} placeholder="09XX-XXX-XXXX" className="rounded-2xl border-slate-200 h-10 text-xs" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Blood Type", "Blood")}</Label>
                        <Select value={r.bloodType} onValueChange={(val) => updateRelative(r.id, { bloodType: val })}>
                          <SelectTrigger className="rounded-2xl border-slate-200 h-10 text-xs px-3 shadow-sm"><SelectValue /></SelectTrigger>
                          <SelectContent className="rounded-xl">
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map(bt => <SelectItem key={bt} value={bt}>{bt}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Tirahan", "Address")}</Label>
                      <Input value={r.address} onChange={(e) => updateRelative(r.id, { address: e.target.value })} placeholder={t("Address", "Address")} className="rounded-2xl border-slate-200 h-10 text-xs" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Tab 3: Family Roles */}
        {activeTab === "roles" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
              <div className="border-b pb-4 mb-2 text-center">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center justify-center gap-2">
                  <Briefcase className="w-5 h-5 text-amber-500" />
                  {t("Mga Tungkulin at Gawain", "Family Roles & Tasks")}
                </h2>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-2 italic px-2">
                  {t(
                    "Ang bawat miyembro ng pamilya ay may mahalagang tungkuling dapat gampanan bago, habang, at pagkatapos ng sakuna upang masiguro na mabilis at organisado ang pagtugon ng pamilya sa anumang panganib.",
                    "Every family member has an important role to play before, during, and after a disaster to ensure the family's response to any hazard is fast and organized."
                  )}
                </p>
              </div>

              <div className="flex items-center justify-between px-1 pt-2">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">{t("Listahan ng mga Tungkulin", "Roles List")}</h3>
                <Button onClick={addRole} size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-[10px] font-bold h-9 px-4">
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  {t("DAGDAG", "ADD")}
                </Button>
              </div>

              <div className="space-y-4">
                {plan.roles.map((role, idx) => (
                <div key={idx} className="bg-white p-5 rounded-[32px] shadow-sm border border-slate-100 space-y-3 relative">
                  <div className="absolute top-0 right-0 p-2">
                    <Button variant="ghost" size="icon" onClick={() => removeRole(idx)} className="text-red-400 h-8 w-8 hover:bg-red-50 rounded-xl"><Trash2 className="w-4 h-4" /></Button>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Sino", "Who")}</Label>
                      <Select value={role.memberId} onValueChange={(val) => {
                        const m = plan.members.find(m => m.id === val);
                        updateRole(idx, { memberId: val, memberName: m?.name || "" });
                      }}>
                        <SelectTrigger className="rounded-2xl border-slate-200 h-10 text-xs px-3 shadow-sm"><SelectValue placeholder="Pumili..." /></SelectTrigger>
                        <SelectContent className="rounded-xl">
                          {plan.members.map(m => <SelectItem key={m.id} value={m.id}>{m.name || "Member"}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Gawain Habang Sakuna", "Task During Disaster")}</Label>
                      <Textarea value={role.tasksDuring} onChange={(e) => updateRole(idx, { tasksDuring: e.target.value })} placeholder={t("e.g. Patayin ang kuryente", "e.g. Switch off electricity")} className="rounded-2xl border-slate-200 text-xs min-h-[60px]" />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Bago ang Sakuna", "Before Disaster")}</Label>
                      <Input value={role.tasksBefore} onChange={(e) => updateRole(idx, { tasksBefore: e.target.value })} placeholder="e.g. Check Go-Bag" className="rounded-2xl border-slate-200 h-9 text-xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        )}

        {/* Tab 4: Evacuation Details */}
        {activeTab === "evac" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
              <div className="border-b pb-4 mb-2 text-center">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center justify-center gap-2">
                  <Home className="w-5 h-5 text-amber-500" />
                  {t("Tagpuan at Likasan", "Evacuation Plan")}
                </h2>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-2 italic px-2">
                  {t(
                    "Ang pagpaplano ay mahalaga upang matiyak na maaari kang lumikas nang mabilis at ligtas kahit ano man ang mga kalagayan",
                    "Planning is essential to ensure that you can evacuate quickly and safely regardless of the circumstances"
                  )}
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Unang Tagpuan", "Primary Meeting Place")}</Label>
                  <Input value={plan.evacuation.meetingPlace1} onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, meetingPlace1: e.target.value}})} placeholder="e.g. Barangay Plaza" className="rounded-2xl border-slate-200 h-11 text-xs" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Pangalawang Tagpuan", "Secondary Meeting Place")}</Label>
                  <Input value={plan.evacuation.meetingPlace2} onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, meetingPlace2: e.target.value}})} placeholder="e.g. Relative's House" className="rounded-2xl border-slate-200 h-11 text-xs" />
                </div>
                <div className="space-y-1 pt-2">
                  <Label className="text-[10px] font-bold text-red-500 uppercase ml-1">{t("Evacuation Center 1", "Evac Center 1")}</Label>
                  <Input value={plan.evacuation.evacCenter1} onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, evacCenter1: e.target.value}})} placeholder="e.g. Covered Court" className="rounded-2xl border-red-100 h-11 text-xs bg-red-50/30" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-red-500 uppercase ml-1">{t("Evacuation Center 2", "Evac Center 2")}</Label>
                  <Input value={plan.evacuation.evacCenter2} onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, evacCenter2: e.target.value}})} placeholder="e.g. School" className="rounded-2xl border-red-100 h-11 text-xs bg-red-50/30" />
                </div>
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Tala sa Bahay / Exit", "House Layout Notes")}</Label>
                  <Textarea value={plan.evacuation.houseLayoutNotes} onChange={(e) => onChange({...plan, evacuation: {...plan.evacuation, houseLayoutNotes: e.target.value}})} placeholder="e.g. Exit through kitchen door" className="rounded-2xl border-slate-200 text-xs min-h-[80px]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Full Checklist */}
        {activeTab === "checklist" && (
          <div className="space-y-4 animate-fadeIn">
             <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-4">
              <div className="border-b pb-4 mb-2 text-center">
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight flex items-center justify-center gap-2">
                  <CheckSquare className="w-5 h-5 text-amber-500" />
                  {t("Paghahanda ng Emergency Kit", "Emergency Kit Preparation")}
                </h2>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed mt-2 italic px-2">
                  {t(
                    "Ang Isang family emergency kit o 'Go Bag' ay nilayong magbigay ng personal na ginhawa at pangangalaga sa iyo at sa iyong pamilya sa mga oras na wala kang access sa ginhawa ng iyong tahanan o pamilyar na kapaligiran. Hangga't maaari, ang iyong emergency kit ay dapat na idisenyo upang suportahan ang iyong pamilya sa loob ng hindi bababa sa 3 araw (72 oras).",
                    "A family emergency kit or 'Go Bag' is intended to provide personal comfort and care to you and your family at times when you do not have access to the comfort of your home or familiar surroundings. As much as possible, your emergency kit should be designed to support your family for at least 3 days (72 hours)."
                  )}
                </p>
              </div>

              <div className="space-y-6">
                {/* Documents & Cash */}
                <div>
                  <p className="text-[10px] font-black text-amber-600 uppercase mb-2 tracking-widest">{t("Dokumento at Pera", "Documents & Cash")}</p>
                  <div className="space-y-1">
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.documentsCash.emergencyMoney} onCheckedChange={() => toggleChecklistItem("documentsCash", "emergencyMoney")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Pera at ATM Card", "Emergency Cash/ATM")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.documentsCash.govIds} onCheckedChange={() => toggleChecklistItem("documentsCash", "govIds")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Government IDs", "Gov IDs")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.documentsCash.importantDocs} onCheckedChange={() => toggleChecklistItem("documentsCash", "importantDocs")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Importanteng Dokumento", "Important Documents")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.documentsCash.familyPhotos} onCheckedChange={() => toggleChecklistItem("documentsCash", "familyPhotos")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Larawan ng Pamilya", "Family Photos")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.documentsCash.notebookPencil} onCheckedChange={() => toggleChecklistItem("documentsCash", "notebookPencil")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Notebook at Lapis", "Notebook & Pencil")}</span>
                    </label>
                  </div>
                </div>

                {/* Food & Meds */}
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-widest">{t("Pagkain at Gamot", "Food & Medicines")}</p>
                  <div className="space-y-1">
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.foodMeds.drinkingWater} onCheckedChange={() => toggleChecklistItem("foodMeds", "drinkingWater")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Tubig na Inumin", "Drinking Water")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.foodMeds.readyToEatFood} onCheckedChange={() => toggleChecklistItem("foodMeds", "readyToEatFood")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Ready-to-eat Food", "Ready-to-eat Food")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.foodMeds.firstAidMeds} onCheckedChange={() => toggleChecklistItem("foodMeds", "firstAidMeds")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("First Aid Kit at Gamot", "First Aid & Meds")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.foodMeds.canOpenerUtensils} onCheckedChange={() => toggleChecklistItem("foodMeds", "canOpenerUtensils")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Can Opener/Kubyertos", "Opener & Utensils")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.foodMeds.maintenanceMeds} onCheckedChange={() => toggleChecklistItem("foodMeds", "maintenanceMeds")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Maintenance Meds", "Maintenance Meds")}</span>
                    </label>
                  </div>
                </div>

                {/* Toiletries */}
                <div>
                  <p className="text-[10px] font-black text-pink-600 uppercase mb-2 tracking-widest">{t("Kalinisan at Damit", "Toiletries & Clothes")}</p>
                  <div className="space-y-1">
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.toiletries.covidKit} onCheckedChange={() => toggleChecklistItem("toiletries", "covidKit")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("COVID Kit (Mask/Alcohol)", "COVID Kit")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.toiletries.soapToothbrush} onCheckedChange={() => toggleChecklistItem("toiletries", "soapToothbrush")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Sabon at Toothbrush", "Soap & Toothbrush")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.toiletries.clothes} onCheckedChange={() => toggleChecklistItem("toiletries", "clothes")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Ekstrang Damit", "Extra Clothes")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.toiletries.mosquitoRepellant} onCheckedChange={() => toggleChecklistItem("toiletries", "mosquitoRepellant")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Mosquito Repellant", "Repellant")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.toiletries.menstrualPads} onCheckedChange={() => toggleChecklistItem("toiletries", "menstrualPads")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Sanitary Pads", "Sanitary Pads")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.toiletries.babyDiapers} onCheckedChange={() => toggleChecklistItem("toiletries", "babyDiapers")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Diapers", "Diapers")}</span>
                    </label>
                  </div>
                </div>

                {/* Tools & Gear */}
                <div>
                  <p className="text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">{t("Mga Kasangkapan", "Tools & Gear")}</p>
                  <div className="space-y-1">
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.tools.flashlight} onCheckedChange={() => toggleChecklistItem("tools", "flashlight")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Flashlight", "Flashlight")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.tools.powerbank} onCheckedChange={() => toggleChecklistItem("tools", "powerbank")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Powerbank", "Powerbank")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.tools.whistle} onCheckedChange={() => toggleChecklistItem("tools", "whistle")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Pito (Whistle)", "Whistle")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.tools.candleMatches} onCheckedChange={() => toggleChecklistItem("tools", "candleMatches")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Kandila at Posporo", "Candles & Matches")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.tools.ropeRaincoat} onCheckedChange={() => toggleChecklistItem("tools", "ropeRaincoat")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Tali at Kapote", "Rope & Raincoat")}</span>
                    </label>
                    <label className="flex items-center gap-3 py-2 px-1 rounded-xl transition-colors cursor-pointer">
                      <Checkbox checked={plan.checklist.tools.multiToolKnife} onCheckedChange={() => toggleChecklistItem("tools", "multiToolKnife")} className="rounded-lg h-5 w-5" />
                      <span className="text-xs text-slate-700 font-medium">{t("Swiss Knife/Multi-tool", "Multi-tool")}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Meeting Schedule */}
        {activeTab === "schedule" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-5">
              <h2 className="text-sm font-black text-slate-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                {t("Iskedyul ng Pag-uusap", "Meeting Schedule")}
              </h2>

              <p className="text-xs text-slate-500 leading-relaxed italic border-l-2 border-amber-200 pl-3">
                {t("Mahalaga ang regular na pag-uusap upang manatiling handa ang buong pamilya.", "Regular family discussions are key to staying disaster-ready.")}
              </p>

              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Araw ng Pagpupulong", "Preferred Day")}</Label>
                  <Select value={plan.schedule.day} onValueChange={(val) => onChange({...plan, schedule: {...plan.schedule, day: val}})}>
                    <SelectTrigger className="rounded-2xl border-slate-200 h-11 text-xs px-4 shadow-sm"><SelectValue /></SelectTrigger>
                    <SelectContent className="rounded-xl">
                      {["Lunes", "Martes", "Miyerkules", "Huwebes", "Biyernes", "Sabado", "Linggo"].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Oras", "Time")}</Label>
                  <Input value={plan.schedule.time} onChange={(e) => onChange({...plan, schedule: {...plan.schedule, time: e.target.value}})} placeholder="e.g. 4:00 PM" className="rounded-2xl border-slate-200 h-11 text-xs px-4" />
                </div>

                <div className="space-y-1">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase ml-1">{t("Dalas", "Frequency")}</Label>
                  <Input value={plan.schedule.frequency} onChange={(e) => onChange({...plan, schedule: {...plan.schedule, frequency: e.target.value}})} placeholder={t("e.g. Isang beses sa isang buwan", "e.g. Once a month")} className="rounded-2xl border-slate-200 h-11 text-xs px-4" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile App Bottom Navigation Bar - Optimized for 6 tabs */}
      <div className="fixed sm:absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 py-3 px-2 flex justify-between items-center shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] shrink-0 z-50 rounded-t-[32px] overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveTab("profile")} className={`flex flex-col items-center gap-1 min-w-[62px] transition-all ${activeTab === "profile" ? "text-amber-500 scale-110" : "text-slate-300"}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === "profile" ? "bg-amber-50" : ""}`}><MapPin className="w-5 h-5" /></div>
          <span className="text-[8px] font-black uppercase tracking-tighter">{t("Profil", "Profile")}</span>
        </button>

        <button onClick={() => setActiveTab("members")} className={`flex flex-col items-center gap-1 min-w-[62px] transition-all ${activeTab === "members" ? "text-amber-500 scale-110" : "text-slate-300"}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === "members" ? "bg-amber-50" : ""}`}><Users className="w-5 h-5" /></div>
          <span className="text-[8px] font-black uppercase tracking-tighter">{t("Pamilya", "Family")}</span>
        </button>

        <button onClick={() => setActiveTab("roles")} className={`flex flex-col items-center gap-1 min-w-[62px] transition-all ${activeTab === "roles" ? "text-amber-500 scale-110" : "text-slate-300"}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === "roles" ? "bg-amber-50" : ""}`}><Briefcase className="w-5 h-5" /></div>
          <span className="text-[8px] font-black uppercase tracking-tighter">{t("Gawain", "Roles")}</span>
        </button>

        <button onClick={() => setActiveTab("evac")} className={`flex flex-col items-center gap-1 min-w-[62px] transition-all ${activeTab === "evac" ? "text-amber-500 scale-110" : "text-slate-300"}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === "evac" ? "bg-amber-50" : ""}`}><Home className="w-5 h-5" /></div>
          <span className="text-[8px] font-black uppercase tracking-tighter">{t("Likas", "Evac")}</span>
        </button>

        <button onClick={() => setActiveTab("checklist")} className={`flex flex-col items-center gap-1 min-w-[62px] transition-all ${activeTab === "checklist" ? "text-amber-500 scale-110" : "text-slate-300"}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === "checklist" ? "bg-amber-50" : ""}`}><CheckSquare className="w-5 h-5" /></div>
          <span className="text-[8px] font-black uppercase tracking-tighter">{t("Gamit", "Kit")}</span>
        </button>

        <button onClick={() => setActiveTab("schedule")} className={`flex flex-col items-center gap-1 min-w-[62px] transition-all ${activeTab === "schedule" ? "text-amber-500 scale-110" : "text-slate-300"}`}>
          <div className={`p-1.5 rounded-xl ${activeTab === "schedule" ? "bg-amber-50" : ""}`}><Calendar className="w-5 h-5" /></div>
          <span className="text-[8px] font-black uppercase tracking-tighter">{t("Araw", "Sched")}</span>
        </button>
      </div>
    </div>
  );
};
