import React from "react";
import { FamilyPlanState, FamilyMember, RelativeContact, FamilyRole } from "@/types/plan";
import { CAMARINES_NORTE_HOTLINES } from "@/data/camNorteData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Shield, Users, Calendar, MapPin, CheckSquare, Phone, BookOpen, Zap, Droplets } from "lucide-react";
import { toast } from "sonner";

interface WebPlanWizardProps {
  plan: FamilyPlanState;
  onChange: (updated: FamilyPlanState) => void;
  lang: "tl" | "en";
}

export const WebPlanWizard: React.FC<WebPlanWizardProps> = ({ plan, onChange, lang }) => {
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
    toast.success(t("Bagong miyembro ay naidagdag!", "New member added!"));
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
    toast.success(t("Bagong kamag-anak ay naidagdag!", "New relative added!"));
  };

  const removeRelative = (id: string) => {
    onChange({
      ...plan,
      relatives: plan.relatives.filter((r) => r.id !== id)
    });
    toast.error(t("Kamag-anak ay tinanggal.", "Relative removed."));
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
    toast.success(t("Bagong tungkulin ay naidagdag!", "New role added!"));
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

  const updateSchedule = (fields: Partial<typeof plan.schedule>) => {
    onChange({
      ...plan,
      schedule: { ...plan.schedule, ...fields }
    });
  };

  const updateEvacuation = (fields: Partial<typeof plan.evacuation>) => {
    onChange({
      ...plan,
      evacuation: { ...plan.evacuation, ...fields }
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
    <div className="space-y-8">
      {/* Step 1: Household Profile */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{t("Profil ng Sambahayan", "Household Profile")}</h2>
            <p className="text-sm text-slate-500">{t("Tukuyin ang lokasyon at estruktura ng inyong tahanan", "Specify your home location and structure")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Munisipyo (Municipality)", "Municipality")}</Label>
            <Select
              value={plan.profile.municipality}
              onValueChange={(val) => updateProfile({ municipality: val })}
            >
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue placeholder={t("Pumili ng Munisipyo", "Select Municipality")} />
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
            <Label className="text-slate-700 font-semibold">{t("Barangay", "Barangay")}</Label>
            <Input
              value={plan.profile.barangay}
              onChange={(e) => updateProfile({ barangay: e.target.value })}
              placeholder={t("Ipasok ang Barangay", "Enter Barangay")}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Sitio / Purok", "Sitio / Purok")}</Label>
            <Input
              value={plan.profile.sitio}
              onChange={(e) => updateProfile({ sitio: e.target.value })}
              placeholder={t("Ipasok ang Sitio o Purok", "Enter Sitio or Purok")}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Pagmamay-ari ng Bahay", "House Ownership")}</Label>
            <Select
              value={plan.profile.houseOwnership}
              onValueChange={(val) => updateProfile({ houseOwnership: val })}
            >
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue placeholder={t("Pumili ng Pagmamay-ari", "Select Ownership")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Owned">{t("May-ari (Owned)", "Owned")}</SelectItem>
                <SelectItem value="Rented">{t("Nangungupahan (Rented)", "Rented")}</SelectItem>
                <SelectItem value="Shared">{t("Nakikitira (Shared)", "Shared")}</SelectItem>
                <SelectItem value="Informal Settler">{t("Informal Settler", "Informal Settler")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Estruktura ng Bahay", "House Structure")}</Label>
            <Select
              value={plan.profile.houseStructure}
              onValueChange={(val) => updateProfile({ houseStructure: val })}
            >
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue placeholder={t("Pumili ng Estruktura", "Select Structure")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Concrete">{t("Semento (Concrete)", "Concrete")}</SelectItem>
                <SelectItem value="Wood">{t("Kahoy (Wood)", "Wood")}</SelectItem>
                <SelectItem value="Semi-Concrete">{t("Semi-Concrete", "Semi-Concrete")}</SelectItem>
                <SelectItem value="Light Materials">{t("Magaan na Materyales", "Light Materials")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Pinagkukunan ng Tubig", "Water Source")}</Label>
            <Select
              value={plan.profile.waterSource}
              onValueChange={(val) => updateProfile({ waterSource: val })}
            >
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Faucet">{t("Gripo (Faucet)", "Faucet")}</SelectItem>
                <SelectItem value="Well">{t("Balon (Well)", "Well")}</SelectItem>
                <SelectItem value="Shared">{t("Nakikihati (Shared)", "Shared")}</SelectItem>
                <SelectItem value="Spring">{t("Bukal (Spring)", "Spring")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Uri ng Palikuran", "Toilet Facility")}</Label>
            <Select
              value={plan.profile.toiletFacility}
              onValueChange={(val) => updateProfile({ toiletFacility: val })}
            >
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Water-sealed">{t("Water-sealed", "Water-sealed")}</SelectItem>
                <SelectItem value="Open pit">{t("Open pit", "Open pit")}</SelectItem>
                <SelectItem value="None">{t("Walang sariling CR", "None")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Kuryente", "Electricity")}</Label>
            <Select
              value={plan.profile.electricitySource}
              onValueChange={(val) => updateProfile({ electricitySource: val })}
            >
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CANORECO">CANORECO</SelectItem>
                <SelectItem value="Solar">{t("Solar", "Solar")}</SelectItem>
                <SelectItem value="Generator">{t("Generator", "Generator")}</SelectItem>
                <SelectItem value="None">{t("Wala", "None")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Gamit sa Pagluluto", "Cooking")}</Label>
            <Select
              value={plan.profile.cookingFacility}
              onValueChange={(val) => updateProfile({ cookingFacility: val })}
            >
              <SelectTrigger className="rounded-xl border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gas">LPG / Gas</SelectItem>
                <SelectItem value="Charcoal">{t("Uling (Charcoal)", "Charcoal")}</SelectItem>
                <SelectItem value="Electric">{t("Kuryente (Electric)", "Electric")}</SelectItem>
                <SelectItem value="Wood">{t("Kahoy (Wood)", "Wood")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-3 space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Mga Bantang Panganib sa Lokasyon", "Hazards in Location")}</Label>
            <div className="flex flex-wrap gap-3 pt-1">
              {["Baha (Flood)", "Lindol (Earthquake)", "Landslide", "Bagyo (Typhoon)", "Tsunami", "Storm Surge"].map((hazard) => {
                const isChecked = plan.profile.hazardVulnerability.includes(hazard);
                return (
                  <label key={hazard} className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => {
                        const updated = isChecked
                          ? plan.profile.hazardVulnerability.filter((h) => h !== hazard)
                          : [...plan.profile.hazardVulnerability, hazard];
                        updateProfile({ hazardVulnerability: updated });
                      }}
                    />
                    <span className="text-sm text-slate-700 font-medium">{hazard}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Family Directory */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{t("Direktoryo ng Pamilya", "Family Directory")}</h2>
              <p className="text-sm text-slate-500">{t("Ilista ang lahat ng miyembro ng pamilya na kasama sa bahay", "List all family members living in the household")}</p>
            </div>
          </div>
          <Button onClick={addMember} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center">
            <Plus className="w-4 h-4" />
            {t("Magdagdag", "Add Member")}
          </Button>
        </div>

        <div className="space-y-4">
          {plan.members.map((member, idx) => (
            <div key={member.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-4 relative">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Pangalan", "Name")}</Label>
                  <Input
                    value={member.name}
                    onChange={(e) => updateMember(member.id, { name: e.target.value })}
                    placeholder={t("Buong Pangalan", "Full Name")}
                    className="rounded-xl border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Kasarian", "Gender")}</Label>
                  <Select
                    value={member.gender}
                    onValueChange={(val) => updateMember(member.id, { gender: val })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lalaki (Male)">{t("Lalaki (Male)", "Male")}</SelectItem>
                      <SelectItem value="Babae (Female)">{t("Babae (Female)", "Female")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Edad", "Age")}</Label>
                  <Input
                    value={member.age}
                    onChange={(e) => updateMember(member.id, { age: e.target.value })}
                    placeholder={t("Edad", "Age")}
                    type="number"
                    className="rounded-xl border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Telepono", "Phone")}</Label>
                  <Input
                    value={member.phone}
                    onChange={(e) => updateMember(member.id, { phone: e.target.value })}
                    placeholder={t("Numero ng Telepono", "Phone Number")}
                    className="rounded-xl border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Blood Type", "Blood Type")}</Label>
                  <Select
                    value={member.bloodType}
                    onValueChange={(val) => updateMember(member.id, { bloodType: val })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"].map((bt) => (
                        <SelectItem key={bt} value={bt}>
                          {bt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <Label className="text-xs font-bold text-slate-500">{t("Karaniwang Lugar na Pinupuntahan", "Usual Location")}</Label>
                  <Input
                    value={member.usualLocation}
                    onChange={(e) => updateMember(member.id, { usualLocation: e.target.value })}
                    placeholder={t("Hal. Paaralan, Trabaho, Bahay", "e.g. School, Work, Home")}
                    className="rounded-xl border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Kondisyon / Vulnerability", "Vulnerability")}</Label>
                  <Select
                    value={member.vulnerability}
                    onValueChange={(val) => updateMember(member.id, { vulnerability: val })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
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

      {/* Step 3: Family Roles & Tasks */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">{t("Mga Tungkulin at Gawain", "Roles & Tasks")}</h2>
              <p className="text-sm text-slate-500">{t("Italaga ang mga responsibilities bago, habang, at pagkatapos ng kalamidad", "Assign responsibilities before, during, and after disasters")}</p>
            </div>
          </div>
          <Button onClick={addRole} className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl flex items-center gap-2 w-full sm:w-auto justify-center">
            <Plus className="w-4 h-4" />
            {t("Magdagdag ng Tungkulin", "Add Role")}
          </Button>
        </div>

        <div className="space-y-4">
          {plan.roles.map((role, idx) => (
            <div key={idx} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 space-y-4 relative">
              <div className="absolute top-4 right-4">
                <Button variant="ghost" size="icon" onClick={() => removeRole(idx)} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Miyembro ng Pamilya", "Family Member")}</Label>
                  <Select
                    value={role.memberId}
                    onValueChange={(val) => {
                      const selected = plan.members.find((m) => m.id === val);
                      updateRole(idx, { memberId: val, memberName: selected?.name || "" });
                    }}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue placeholder={t("Pumili ng Miyembro", "Select Member")} />
                    </SelectTrigger>
                    <SelectContent>
                      {plan.members.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name || t("Walang Pangalan", "Unnamed Member")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Tungkulin (Role Type)", "Role Type")}</Label>
                  <Select
                    value={role.roleType}
                    onValueChange={(val: any) => updateRole(idx, { roleType: val })}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nanay">{t("Nanay (Mother)", "Mother")}</SelectItem>
                      <SelectItem value="Tatay">{t("Tatay (Father)", "Father")}</SelectItem>
                      <SelectItem value="Anak">{t("Anak (Child)", "Child")}</SelectItem>
                      <SelectItem value="Iba pa">{t("Iba pa (Other)", "Other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Iba pang Tala", "Other Notes")}</Label>
                  <Input
                    value={role.otherNotes}
                    onChange={(e) => updateRole(idx, { otherNotes: e.target.value })}
                    placeholder={t("Hal. Lider ng paglikas", "e.g. Evacuation leader")}
                    className="rounded-xl border-slate-200 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Mga Gawain BAGO ang Kalamidad", "Tasks BEFORE Disaster")}</Label>
                  <Textarea
                    value={role.tasksBefore}
                    onChange={(e) => updateRole(idx, { tasksBefore: e.target.value })}
                    placeholder={t("Hal. Ihanda ang Go-Bag, i-secure ang bahay", "e.g. Prepare Go-Bag, secure house")}
                    className="rounded-xl border-slate-200 bg-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Mga Gawain HABANG may Kalamidad", "Tasks DURING Disaster")}</Label>
                  <Textarea
                    value={role.tasksDuring}
                    onChange={(e) => updateRole(idx, { tasksDuring: e.target.value })}
                    placeholder={t("Hal. Patayin ang kuryente, gabayan ang mga bata", "e.g. Turn off power, guide children")}
                    className="rounded-xl border-slate-200 bg-white text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs font-bold text-slate-500">{t("Mga Gawain PAGKATAPOS ng Kalamidad", "Tasks AFTER Disaster")}</Label>
                  <Textarea
                    value={role.tasksAfter}
                    onChange={(e) => updateRole(idx, { tasksAfter: e.target.value })}
                    placeholder={t("Hal. Suriin ang pinsala, i-check ang pamilya", "e.g. Inspect damage, check family")}
                    className="rounded-xl border-slate-200 bg-white text-xs"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 4: Evacuation Plan */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{t("Plano ng Pag-evacuate at Tagpuan", "Evacuation & Meeting Places")}</h2>
            <p className="text-sm text-slate-500">{t("Tukuyin ang mga ligtas na lugar at evacuation centers", "Identify safe meeting spots and evacuation centers")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">{t("Dalawang Lugar ng Tagpuan", "Two Meeting Places")}</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-500">{t("Unang Tagpuan (Primary Meeting Place)", "Primary Meeting Place")}</Label>
                <Input
                  value={plan.evacuation.meetingPlace1}
                  onChange={(e) => updateEvacuation({ meetingPlace1: e.target.value })}
                  placeholder={t("Hal. Plaza ng Barangay", "e.g. Barangay Plaza")}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-500">{t("Pangalawang Tagpuan (Secondary Meeting Place)", "Secondary Meeting Place")}</Label>
                <Input
                  value={plan.evacuation.meetingPlace2}
                  onChange={(e) => updateEvacuation({ meetingPlace2: e.target.value })}
                  placeholder={t("Hal. Tapat ng Simbahan", "e.g. In front of Church")}
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">{t("Itinalagang Evacuation Centers", "Designated Evacuation Centers")}</h3>
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-500">{t("Evacuation Center 1", "Evacuation Center 1")}</Label>
                <Input
                  value={plan.evacuation.evacCenter1}
                  onChange={(e) => updateEvacuation({ evacCenter1: e.target.value })}
                  placeholder={t("Hal. Barangay Covered Court", "e.g. Barangay Covered Court")}
                  className="rounded-xl border-slate-200"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-500">{t("Evacuation Center 2", "Evacuation Center 2")}</Label>
                <Input
                  value={plan.evacuation.evacCenter2}
                  onChange={(e) => updateEvacuation({ evacCenter2: e.target.value })}
                  placeholder={t("Hal. Daet Elementary School", "e.g. Daet Elementary School")}
                  className="rounded-xl border-slate-200"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Layout / Diagram ng Bahay at Exit Points (Tala)", "House Layout & Exit Points Notes")}</Label>
            <Textarea
              value={plan.evacuation.houseLayoutNotes}
              onChange={(e) => updateEvacuation({ houseLayoutNotes: e.target.value })}
              placeholder={t("Ilarawan ang mga labasan, bintana, at ligtas na daan sa inyong bahay...", "Describe exit points, windows, and safe paths in your house...")}
              className="rounded-xl border-slate-200 min-h-[100px]"
            />
          </div>
        </div>
      </div>

      {/* Step 5: Go Bag & E-Balde Checklist */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{t("Checklist ng Go Bag at E-Balde", "Go Bag & E-Bucket Checklist")}</h2>
            <p className="text-sm text-slate-500">{t("Suriin ang mga kailangang gamit para sa 72-oras na emergency kit", "Check the items needed for a 72-hour emergency kit")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Documents & Cash */}
          <div className="space-y-3 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm border-b pb-1">{t("Importanteng Dokumento at Pera", "Important Documents & Cash")}</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.documentsCash.emergencyMoney}
                  onCheckedChange={() => toggleChecklistItem("documentsCash", "emergencyMoney")}
                />
                <span className="text-sm text-slate-700">{t("Emergency money, ATM Card o Passbook", "Emergency money, ATM Card or Passbook")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.documentsCash.govIds}
                  onCheckedChange={() => toggleChecklistItem("documentsCash", "govIds")}
                />
                <span className="text-sm text-slate-700">{t("Government-issued IDs o ID na may blood type", "Government-issued IDs or ID with blood type")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.documentsCash.importantDocs}
                  onCheckedChange={() => toggleChecklistItem("documentsCash", "importantDocs")}
                />
                <span className="text-sm text-slate-700">{t("Importanteng dokumento (passports, birth certificates, atbp.)", "Important documents (passports, birth certificates, etc.)")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.documentsCash.familyPhotos}
                  onCheckedChange={() => toggleChecklistItem("documentsCash", "familyPhotos")}
                />
                <span className="text-sm text-slate-700">{t("Larawan ng Pamilya (para sa pagkakakilanlan)", "Family Photos (for identification)")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.documentsCash.notebookPencil}
                  onCheckedChange={() => toggleChecklistItem("documentsCash", "notebookPencil")}
                />
                <span className="text-sm text-slate-700">{t("Notebook at Lapis/Ballpen", "Notebook and Pencil/Pen")}</span>
              </label>
            </div>
          </div>

          {/* Toiletries */}
          <div className="space-y-3 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm border-b pb-1">{t("Kalinisan at Damit (Toiletries & Clothes)", "Toiletries & Clothes")}</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.toiletries.covidKit}
                  onCheckedChange={() => toggleChecklistItem("toiletries", "covidKit")}
                />
                <span className="text-sm text-slate-700">{t("Alcohol at Face Masks", "Alcohol & Face Masks")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.toiletries.soapToothbrush}
                  onCheckedChange={() => toggleChecklistItem("toiletries", "soapToothbrush")}
                />
                <span className="text-sm text-slate-700">{t("Sabon, Toothbrush at Toothpaste", "Soap, Toothbrush and Toothpaste")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.toiletries.clothes}
                  onCheckedChange={() => toggleChecklistItem("toiletries", "clothes")}
                />
                <span className="text-sm text-slate-700">{t("Ekstrang damit at kumot", "Extra clothes and blankets")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.toiletries.mosquitoRepellant}
                  onCheckedChange={() => toggleChecklistItem("toiletries", "mosquitoRepellant")}
                />
                <span className="text-sm text-slate-700">{t("Mosquito Repellant", "Mosquito Repellant")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.toiletries.menstrualPads}
                  onCheckedChange={() => toggleChecklistItem("toiletries", "menstrualPads")}
                />
                <span className="text-sm text-slate-700">{t("Sanitary Pads / Menstrual Hygiene items", "Sanitary Pads / Menstrual Hygiene items")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.toiletries.babyDiapers}
                  onCheckedChange={() => toggleChecklistItem("toiletries", "babyDiapers")}
                />
                <span className="text-sm text-slate-700">{t("Diapers para sa sanggol (kung mayroon)", "Baby Diapers (if applicable)")}</span>
              </label>
            </div>
          </div>

          {/* Food & Medicines */}
          <div className="space-y-3 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm border-b pb-1">{t("Pagkain at Gamot (Food & Medicines)", "Food & Medicines")}</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.foodMeds.drinkingWater}
                  onCheckedChange={() => toggleChecklistItem("foodMeds", "drinkingWater")}
                />
                <span className="text-sm text-slate-700">{t("Tubig na inumin (Drinking water)", "Drinking water")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.foodMeds.readyToEatFood}
                  onCheckedChange={() => toggleChecklistItem("foodMeds", "readyToEatFood")}
                />
                <span className="text-sm text-slate-700">{t("Ready-to-eat food na hindi napapanis", "Ready-to-eat food (non-perishable)")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.foodMeds.firstAidMeds}
                  onCheckedChange={() => toggleChecklistItem("foodMeds", "firstAidMeds")}
                />
                <span className="text-sm text-slate-700">{t("First aid kit (gamot sa lagnat, ubo, sipon, atbp.)", "First aid kit (medicines for fever, cough, cold, etc.)")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.foodMeds.canOpenerUtensils}
                  onCheckedChange={() => toggleChecklistItem("foodMeds", "canOpenerUtensils")}
                />
                <span className="text-sm text-slate-700">{t("Can Opener at mga kubyertos", "Can Opener and utensils")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.foodMeds.maintenanceMeds}
                  onCheckedChange={() => toggleChecklistItem("foodMeds", "maintenanceMeds")}
                />
                <span className="text-sm text-slate-700">{t("Maintenance medicines (para sa may sakit)", "Maintenance medicines (if applicable)")}</span>
              </label>
            </div>
          </div>

          {/* Emergency Tools */}
          <div className="space-y-3 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
            <h3 className="font-bold text-slate-800 text-sm border-b pb-1">{t("Mga Kasangkapan (Emergency Tools)", "Emergency Tools")}</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.tools.flashlight}
                  onCheckedChange={() => toggleChecklistItem("tools", "flashlight")}
                />
                <span className="text-sm text-slate-700">{t("Flashlight (crank-type o de-baterya)", "Flashlight (crank-type or battery-operated)")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.tools.powerbank}
                  onCheckedChange={() => toggleChecklistItem("tools", "powerbank")}
                />
                <span className="text-sm text-slate-700">{t("Fully-charged Power bank", "Fully-charged Power bank")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.tools.whistle}
                  onCheckedChange={() => toggleChecklistItem("tools", "whistle")}
                />
                <span className="text-sm text-slate-700">{t("Pito / Whistle (isa bawat miyembro)", "Whistle (one for each member)")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.tools.candleMatches}
                  onCheckedChange={() => toggleChecklistItem("tools", "candleMatches")}
                />
                <span className="text-sm text-slate-700">{t("Kandila at Posporo / Lighter", "Candles and Matches / Lighter")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.tools.ropeRaincoat}
                  onCheckedChange={() => toggleChecklistItem("tools", "ropeRaincoat")}
                />
                <span className="text-sm text-slate-700">{t("Tali at Kapote", "Rope and Raincoat")}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={plan.checklist.tools.multiToolKnife}
                  onCheckedChange={() => toggleChecklistItem("tools", "multiToolKnife")}
                />
                <span className="text-sm text-slate-700">{t("Multi-tool o Swiss Army Knife", "Multi-tool or Swiss Army Knife")}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Step 6: Personal Hotlines */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-blue-100 text-blue-700 rounded-xl">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{t("Personalize Hotlines ng Barangay", "Personalize Barangay Hotlines")}</h2>
            <p className="text-sm text-slate-500">{t("Ilagay ang mga numero ng inyong barangay para sa mabilis na pagtawag", "Enter your barangay contact numbers for quick access")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Hotline ng Brgy.", "Barangay Hotline")}</Label>
            <Input
              value={plan.profile.brgyHotline}
              onChange={(e) => updateProfile({ brgyHotline: e.target.value })}
              placeholder="09XX-XXX-XXXX"
              className="rounded-xl border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">BPSO</Label>
            <Input
              value={plan.profile.bpsoHotline}
              onChange={(e) => updateProfile({ bpsoHotline: e.target.value })}
              placeholder="Hotline"
              className="rounded-xl border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">BHW</Label>
            <Input
              value={plan.profile.bhwHotline}
              onChange={(e) => updateProfile({ bhwHotline: e.target.value })}
              placeholder="Hotline"
              className="rounded-xl border-slate-200"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("At Iba pa", "Others")}</Label>
            <Input
              value={plan.profile.otherHotline}
              onChange={(e) => updateProfile({ otherHotline: e.target.value })}
              placeholder="Other contact"
              className="rounded-xl border-slate-200"
            />
          </div>
        </div>

        {/* Display Reference Hotlines */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-600" />
            {t("Reference: Mga Emergency Hotline ng Probinsya", "Reference: Provincial Emergency Hotlines")}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <p className="font-black text-amber-800 uppercase text-xs border-b pb-2">PDRRMO CamNorte</p>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <span className="font-bold text-slate-500">OPCEN:</span> <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.pdrrmo.opcen}</span>
                <span className="font-bold text-slate-500">SMART:</span> <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.pdrrmo.smart}</span>
                <span className="font-bold text-slate-500">GLOBE:</span> <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.pdrrmo.globe}</span>
                <span className="font-bold text-slate-500">PNP:</span> <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.pdrrmo.pnp}</span>
                <span className="font-bold text-slate-500">BFP:</span> <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.pdrrmo.bfp}</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <p className="font-black text-emerald-800 uppercase text-xs border-b pb-2">MDRRMO {selectedMuni.name}</p>
              <div className="grid grid-cols-1 gap-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">{t("MDRRMO Hotline:", "MDRRMO Hotline:")}</span>
                  <span className="font-black text-slate-800">{selectedMuni.mdrrmo.join(" / ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">PNP {selectedMuni.name}:</span>
                  <span className="font-black text-slate-800">{selectedMuni.pnp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">BFP {selectedMuni.name}:</span>
                  <span className="font-black text-slate-800">{selectedMuni.bfp}</span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <p className="font-black text-blue-800 uppercase text-xs border-b pb-2">{t("Mga Utility Hotline", "Utility Hotlines")}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-500 flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" /> CANORECO</span>
                  <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.utilities.canoreco}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-500 flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-400" /> Prime Water</span>
                  <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.utilities.primeWater}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-500 flex items-center gap-1"><Droplets className="w-3 h-3 text-blue-600" /> CN Water District</span>
                  <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.utilities.waterDistrict}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-500 flex items-center gap-1"><Shield className="w-3 h-3 text-red-500" /> BFP Provincial</span>
                  <span className="font-black text-slate-800">{CAMARINES_NORTE_HOTLINES.utilities.bfpProvincial}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 7: Meeting Schedule */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">{t("Iskedyul ng Pag-uusap", "Meeting Schedule")}</h2>
            <p className="text-sm text-slate-500">{t("Magtakda ng regular na oras para pag-usapan ang kahandaan", "Set a regular time to discuss family preparedness")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Petsa (Date)", "Date")}</Label>
            <Input
              value={plan.schedule.date}
              onChange={(e) => updateSchedule({ date: e.target.value })}
              placeholder={t("Hal. Unang Sabado ng Buwan", "e.g. First Saturday of Month")}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Araw (Day)", "Day")}</Label>
            <Input
              value={plan.schedule.day}
              onChange={(e) => updateSchedule({ day: e.target.value })}
              placeholder={t("Hal. Sabado", "e.g. Saturday")}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Oras (Time)", "Time")}</Label>
            <Input
              value={plan.schedule.time}
              onChange={(e) => updateSchedule({ time: e.target.value })}
              placeholder={t("Hal. 4:00 PM", "e.g. 4:00 PM")}
              className="rounded-xl border-slate-200"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">{t("Dalas (Frequency)", "Frequency")}</Label>
            <Input
              value={plan.schedule.frequency}
              onChange={(e) => updateSchedule({ frequency: e.target.value })}
              placeholder={t("Hal. Isang beses sa isang buwan", "e.g. Once a month")}
              className="rounded-xl border-slate-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};