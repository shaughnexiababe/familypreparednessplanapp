import React from "react";
import { FamilyPlanState } from "@/types/plan";
import { CAMARINES_NORTE_HOTLINES } from "@/data/camNorteData";
import { Button } from "@/components/ui/button";
import { Printer, Download, FileText, Shield, Phone, Users, Calendar, MapPin, CheckSquare, Zap, Droplets, Flame, Home } from "lucide-react";
import { toast } from "sonner";

interface PlanPreviewProps {
  plan: FamilyPlanState;
  lang: "tl" | "en";
}

export const PlanPreview: React.FC<PlanPreviewProps> = ({ plan, lang }) => {
  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  const handlePrint = () => {
    window.print();
    toast.success(t("Nai-print o na-save bilang PDF ang plano!", "Plan printed or saved as PDF successfully!"));
  };

  const handleDownloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(plan, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Family_Preparedness_Plan_${plan.profile.barangay || "famprepplan"}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success(t("Na-download ang plan data file!", "Plan data file downloaded successfully!"));
  };

  const selectedMuni = CAMARINES_NORTE_HOTLINES.municipalities.find(
    (m) => m.name.toLowerCase() === plan.profile.municipality.toLowerCase()
  ) || CAMARINES_NORTE_HOTLINES.municipalities[2]; // Default to Daet

  return (
    <div className="bg-white text-slate-900 p-6 md:p-10 rounded-2xl border border-slate-200 shadow-xl max-w-4xl mx-auto print:shadow-none print:border-none print:p-0">
      {/* Action Buttons - Hidden in Print */}
      <div className="flex flex-wrap gap-3 justify-end mb-8 print:hidden">
        <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl flex items-center gap-2">
          <Printer className="w-4 h-4" />
          {t("I-print / I-save bilang PDF", "Print / Save as PDF")}
        </Button>
        <Button onClick={handleDownloadJSON} variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2">
          <Download className="w-4 h-4" />
          {t("I-download ang Plan Data", "Download Plan Data")}
        </Button>
      </div>

      {/* Printable Document Header */}
      <div className="text-center border-b-4 border-amber-500 pb-6 mb-8">
        <div className="flex justify-center items-center gap-3 mb-2">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md border-2 border-amber-100 bg-white">
            <img src="/app-logo.png" alt="Ligtas CamNorte Logo" className="w-full h-full object-cover" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase">
              {t("PLANO SA PAGHAHANDA NG PAMILYA", "FAMILY PREPAREDNESS PLAN")}
            </h1>
            <p className="text-sm font-bold text-amber-600 tracking-wider uppercase">
              {t("PROBINSYA NG CAMARINES NORTE", "PROVINCE OF CAMARINES NORTE")}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic mt-2 px-4 max-w-2xl mx-auto leading-relaxed">
          {t(
            "Sa paglalaan ng oras para magkaroon ng isang mahusay na nakahandang plano sa sakuna para sa pamilya o personal, ang iyong pagkabalisa tungkol sa iyong sarili at kapakanan ng iyong pamilya sa panahon ng agarang banta mula sa isang peligro ay lubos na mababawasan.",
            "By dedicating time to having a well-prepared disaster plan for the family or personally, your anxiety about your own and your family's welfare during an immediate threat from a hazard will be significantly reduced."
          )}
        </p>
      </div>

      {/* Grid Layout for Sections */}
      <div className="space-y-8">
        {/* 1. Household Profile */}
        <section className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            {t("I. PROFIL NG SAMBAHAYAN AT MGA UTILITIES", "I. HOUSEHOLD PROFILE & UTILITIES")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="md:col-span-3 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
              <span className="font-semibold text-slate-500 block uppercase text-[10px] tracking-wider mb-1">{t("Puno ng Pamilya (Head of Household):", "Head of Household:")}</span>
              <span className="font-black text-slate-800 text-lg">{plan.profile.headOfHousehold || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block uppercase text-[10px] tracking-wider mb-1">{t("Lokasyon:", "Location:")}</span>
              <p className="font-bold text-slate-800">
                {plan.profile.sitio && `${plan.profile.sitio}, `}
                {plan.profile.barangay && `Brgy. ${plan.profile.barangay}, `}
                {plan.profile.municipality}
              </p>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block uppercase text-[10px] tracking-wider mb-1">{t("Estruktura at Pagmamay-ari:", "Structure & Ownership:")}</span>
              <p className="font-bold text-slate-800">{plan.profile.houseStructure} ({plan.profile.houseOwnership})</p>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block uppercase text-[10px] tracking-wider mb-1">{t("Kuryente (Electricity):", "Electricity Source:")}</span>
              <p className="font-bold text-slate-800 flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-amber-500" /> {plan.profile.electricitySource}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block uppercase text-[10px] tracking-wider mb-1">{t("Tubig at Palikuran:", "Water & Toilet:")}</span>
              <p className="font-bold text-slate-800 flex items-center gap-1.5"><Droplets className="w-3.5 h-3.5 text-blue-500" /> {plan.profile.waterSource} / {plan.profile.toiletFacility}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block uppercase text-[10px] tracking-wider mb-1">{t("Lutuan (Cooking):", "Cooking Facility:")}</span>
              <p className="font-bold text-slate-800 flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 text-orange-500" /> {plan.profile.cookingFacility}</p>
            </div>
            <div className="md:col-span-1">
              <span className="font-semibold text-slate-500 block uppercase text-[10px] tracking-wider mb-1">{t("Mga Panganib (Hazards):", "Hazards in Location:")}</span>
              <span className="font-bold text-red-600">
                {plan.profile.hazardVulnerability.length > 0
                  ? plan.profile.hazardVulnerability.join(", ")
                  : t("Walang tinukoy", "None specified")}
              </span>
            </div>
          </div>
        </section>

        {/* 2. Family Directory */}
        <section className="border border-slate-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-600" />
            {t("II. DIREKTORYO NG MIYEMBRO NG PAMILYA", "II. FAMILY MEMBER DIRECTORY")}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold">
                  <th className="p-2 border">{t("Pangalan (Name)", "Name")}</th>
                  <th className="p-2 border">{t("Kasarian", "Gender")}</th>
                  <th className="p-2 border">{t("Edad", "Age")}</th>
                  <th className="p-2 border">{t("Telepono", "Phone")}</th>
                  <th className="p-2 border">{t("Blood Type", "Blood")}</th>
                  <th className="p-2 border">{t("Karaniwang Lugar", "Location")}</th>
                  <th className="p-2 border">{t("Kondisyon", "Vulnerability")}</th>
                </tr>
              </thead>
              <tbody>
                {plan.members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-2 border font-semibold">{m.name}</td>
                    <td className="p-2 border text-xs">{m.gender}</td>
                    <td className="p-2 border">{m.age}</td>
                    <td className="p-2 border">{m.phone}</td>
                    <td className="p-2 border font-mono">{m.bloodType}</td>
                    <td className="p-2 border text-xs">{m.usualLocation}</td>
                    <td className="p-2 border">
                      {m.vulnerability !== "None" ? (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-[10px] font-bold">
                          {m.vulnerability}
                        </span>
                      ) : (
                        <span className="text-slate-400">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Relatives / Friends Directory */}
        {plan.relatives.length > 0 && (
          <section className="border border-slate-200 rounded-xl p-5">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              {t("III. DIREKTORYO NG KAMAG-ANAK O KAIBIGAN", "III. EMERGENCY CONTACTS (RELATIVES/FRIENDS)")}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold">
                    <th className="p-2 border">{t("Pangalan (Name)", "Name")}</th>
                    <th className="p-2 border">{t("Telepono (Phone)", "Phone")}</th>
                    <th className="p-2 border">{t("Blood Type", "Blood Type")}</th>
                    <th className="p-2 border">{t("Address", "Address")}</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.relatives.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50">
                      <td className="p-2 border font-semibold">{r.name}</td>
                      <td className="p-2 border">{r.phone}</td>
                      <td className="p-2 border font-mono">{r.bloodType}</td>
                      <td className="p-2 border text-xs">{r.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* 4. Family Roles & Tasks */}
        <section className="border border-slate-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            {t("IV. MGA TUNGKULIN NG BAWAT MIYEMBRO", "IV. FAMILY ROLES & TASKS")}
          </h2>
          <div className="space-y-4">
            {plan.roles.map((role, idx) => (
              <div key={idx} className="border-l-4 border-amber-500 pl-4 py-1">
                <h3 className="font-bold text-slate-800 text-base">
                  {role.memberName} <span className="text-xs font-normal text-slate-500">({role.roleType})</span>
                  {role.otherNotes && <span className="text-xs font-normal text-slate-400 ml-2 italic"> - {role.otherNotes}</span>}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="font-bold text-amber-700 block text-[9px] uppercase tracking-tighter">{t("BAGO (BEFORE):", "BEFORE:")}</span>
                    <p className="text-slate-700">{role.tasksBefore || "---"}</p>
                  </div>
                  <div className="bg-red-50 p-2 rounded">
                    <span className="font-bold text-red-700 block text-[9px] uppercase tracking-tighter">{t("HABANG (DURING):", "DURING:")}</span>
                    <p className="text-slate-700 font-bold">{role.tasksDuring || "---"}</p>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded">
                    <span className="font-bold text-emerald-700 block text-[9px] uppercase tracking-tighter">{t("PAGKATAPOS (AFTER):", "AFTER:")}</span>
                    <p className="text-slate-700">{role.tasksAfter || "---"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Evacuation & Meeting Places */}
        <section className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Home className="w-5 h-5 text-amber-600" />
            {t("V. PLANO NG PAG-EVACUATE AT TAGPUAN", "V. EVACUATION & MEETING PLACES")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                {t("Mga Lugar ng Tagpuan:", "Meeting Places:")}
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-bold">{t("Pangunahin (Primary):", "Primary:")}</span>
                  <span className="font-bold text-slate-800">{plan.evacuation.meetingPlace1 || "---"}</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-bold">{t("Pangalawa (Secondary):", "Secondary:")}</span>
                  <span className="font-bold text-slate-800">{plan.evacuation.meetingPlace2 || "---"}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-4 bg-red-500 rounded-full"></div>
                {t("Evacuation Centers:", "Evacuation Centers:")}
              </h3>
              <div className="space-y-2">
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-bold">{t("Unang Sentro:", "Center 1:")}</span>
                  <span className="font-bold text-slate-800">{plan.evacuation.evacCenter1 || "---"}</span>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-400 block font-bold">{t("Pangalawang Sentro:", "Center 2:")}</span>
                  <span className="font-bold text-slate-800">{plan.evacuation.evacCenter2 || "---"}</span>
                </div>
              </div>
            </div>
            {plan.evacuation.houseLayoutNotes && (
              <div className="md:col-span-2">
                <h3 className="font-bold text-slate-700 uppercase text-[10px] tracking-widest mb-2">{t("Tala sa Bahay at Exit Points:", "House Layout & Exit Points:")}</h3>
                <p className="text-slate-700 bg-white p-4 rounded-xl border text-xs italic leading-relaxed">
                  {plan.evacuation.houseLayoutNotes}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 6. Meeting Schedule */}
        <section className="border border-slate-200 rounded-xl p-5 bg-amber-50/20">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            {t("VI. ISKEDYUL NG PAGUUSAP NG PAMILYA", "VI. FAMILY MEETING SCHEDULE")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
             <div className="bg-white p-3 rounded-xl border border-amber-100">
              <span className="font-semibold text-slate-400 block text-[9px] uppercase tracking-wider">{t("Petsa (Date):", "Date:")}</span>
              <span className="font-black text-slate-800">{plan.schedule.date || "---"}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-100">
              <span className="font-semibold text-slate-400 block text-[9px] uppercase tracking-wider">{t("Araw (Day):", "Day:")}</span>
              <span className="font-black text-slate-800">{plan.schedule.day || "---"}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-100">
              <span className="font-semibold text-slate-400 block text-[9px] uppercase tracking-wider">{t("Oras (Time):", "Time:")}</span>
              <span className="font-black text-slate-800">{plan.schedule.time || "---"}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-amber-100">
              <span className="font-semibold text-slate-400 block text-[9px] uppercase tracking-wider">{t("Dalas (Frequency):", "Frequency:")}</span>
              <span className="font-black text-slate-800">{plan.schedule.frequency || "---"}</span>
            </div>
          </div>
        </section>

        {/* 7. Checklist Summary */}
        <section className="border border-slate-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-600" />
            {t("VII. CHECKLIST NG MGA GAMIT (GO BAG)", "VII. GO BAG CHECKLIST")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[10px]">
            <div>
              <h3 className="font-bold text-amber-700 uppercase mb-2 border-b border-amber-100">{t("DOKUMENTO & PERA", "DOCS & CASH")}</h3>
              <ul className="space-y-1">
                {Object.entries(plan.checklist.documentsCash).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-1">
                    <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${val ? 'bg-amber-500 border-amber-500' : 'bg-white border-slate-300'}`}>
                      {val && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={val ? 'font-bold text-slate-800' : 'text-slate-400 italic line-through'}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-emerald-700 uppercase mb-2 border-b border-emerald-100">{t("PAGKAIN & GAMOT", "FOOD & MEDS")}</h3>
              <ul className="space-y-1">
                {Object.entries(plan.checklist.foodMeds).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-1">
                    <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${val ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'}`}>
                      {val && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={val ? 'font-bold text-slate-800' : 'text-slate-400 italic line-through'}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 uppercase mb-2 border-b border-blue-100">{t("KASANGKAPAN", "TOOLS")}</h3>
              <ul className="space-y-1">
                {Object.entries(plan.checklist.tools).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-1">
                    <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${val ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300'}`}>
                      {val && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={val ? 'font-bold text-slate-800' : 'text-slate-400 italic line-through'}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Emergency Hotlines */}
        <section className="border border-slate-200 rounded-xl p-5 bg-blue-50/10">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            {t("VIII. MGA EMERGENCY HOTLINE NG BARANGAY", "VIII. BARANGAY EMERGENCY HOTLINES")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-400 block uppercase text-[8px] tracking-widest">Barangay</span>
              <span className="font-black text-slate-800 text-sm">{plan.profile.brgyHotline || "---"}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-400 block uppercase text-[8px] tracking-widest">BPSO</span>
              <span className="font-black text-slate-800 text-sm">{plan.profile.bpsoHotline || "---"}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-400 block uppercase text-[8px] tracking-widest">BHW</span>
              <span className="font-black text-slate-800 text-sm">{plan.profile.bhwHotline || "---"}</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-400 block uppercase text-[8px] tracking-widest">Iba pa</span>
              <span className="font-black text-slate-800 text-sm">{plan.profile.otherHotline || "---"}</span>
            </div>
          </div>
        </section>
      </div>

      {/* Signatures Section */}
      <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 gap-12 text-center text-sm">
        <div>
          <div className="border-b-2 border-slate-800 h-10 w-full max-w-[250px] mx-auto"></div>
          <p className="font-black text-slate-800 mt-2 uppercase tracking-tighter">{t("Lagda ng Puno ng Pamilya", "Signature of Family Head")}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">{t("Petsa ng Paglagda", "Date Signed")}</p>
        </div>
        <div>
          <div className="border-b-2 border-slate-800 h-10 w-full max-w-[250px] mx-auto"></div>
          <p className="font-black text-slate-800 mt-2 uppercase tracking-tighter">{t("Lagda ng mga Miyembro", "Signature of Family Members")}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase">{t("Petsa ng Paglagda", "Date Signed")}</p>
        </div>
      </div>
    </div>
  );
};