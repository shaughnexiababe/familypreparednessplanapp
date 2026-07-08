import React from "react";
import { FamilyPlanState } from "@/types/plan";
import { CAMARINES_NORTE_HOTLINES } from "@/data/camNorteData";
import { Button } from "@/components/ui/button";
import { Printer, Download, FileText, Shield, Phone, Users, Calendar, MapPin, CheckSquare } from "lucide-react";
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
          <Shield className="w-12 h-12 text-amber-600" />
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase">
              {t("PLANO SA PAGHAHANDA NG PAMILYA", "FAMILY PREPAREDNESS PLAN")}
            </h1>
            <p className="text-sm font-bold text-amber-600 tracking-wider uppercase">
              {t("PROBINSYA NG CAMARINES NORTE", "PROVINCE OF CAMARINES NORTE")}
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic mt-2">
          {t(
            "Ang planong ito ay binuo upang masiguro ang kaligtasan ng pamilya sa panahon ng kalamidad.",
            "This plan was created to ensure family safety and preparedness during disasters."
          )}
        </p>
      </div>

      {/* Grid Layout for Sections */}
      <div className="space-y-8">
        {/* 1. Household Profile */}
        <section className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            {t("I. PROFIL NG SAMBAHAYAN", "I. HOUSEHOLD PROFILE")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-semibold text-slate-500 block">{t("Munisipyo (Municipality):", "Municipality:")}</span>
              <span className="font-bold text-slate-800 text-base">{plan.profile.municipality}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Barangay:", "Barangay:")}</span>
              <span className="font-bold text-slate-800 text-base">{plan.profile.barangay || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Sitio / Purok:", "Sitio / Purok:")}</span>
              <span className="font-bold text-slate-800 text-base">{plan.profile.sitio || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Pagmamay-ari (Ownership):", "Ownership:")}</span>
              <span className="font-bold text-slate-800">{plan.profile.houseOwnership || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Estruktura (Structure):", "Structure:")}</span>
              <span className="font-bold text-slate-800">{plan.profile.houseStructure}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Tubig (Water Source):", "Water Source:")}</span>
              <span className="font-bold text-slate-800">{plan.profile.waterSource || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Palikuran (Toilet):", "Toilet Facility:")}</span>
              <span className="font-bold text-slate-800">{plan.profile.toiletFacility || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Kuryente (Electricity):", "Electricity:")}</span>
              <span className="font-bold text-slate-800">{plan.profile.electricitySource || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Pagluluto (Cooking):", "Cooking Facility:")}</span>
              <span className="font-bold text-slate-800">{plan.profile.cookingFacility || "---"}</span>
            </div>
            <div className="md:col-span-3">
              <span className="font-semibold text-slate-500 block">{t("Mga Bantang Panganib sa Lokasyon (Hazards):", "Hazards in Location:")}</span>
              <span className="font-bold text-slate-800">
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
                  <th className="p-2 border">{t("Kasarian (Gender)", "Gender")}</th>
                  <th className="p-2 border">{t("Edad (Age)", "Age")}</th>
                  <th className="p-2 border">{t("Telepono (Phone)", "Phone")}</th>
                  <th className="p-2 border">{t("Blood Type", "Blood Type")}</th>
                  <th className="p-2 border">{t("Karaniwang Lugar (Usual Location)", "Usual Location")}</th>
                  <th className="p-2 border">{t("Kondisyon (Vulnerability)", "Vulnerability")}</th>
                </tr>
              </thead>
              <tbody>
                {plan.members.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="p-2 border font-semibold">{m.name}</td>
                    <td className="p-2 border">{m.gender}</td>
                    <td className="p-2 border">{m.age}</td>
                    <td className="p-2 border">{m.phone}</td>
                    <td className="p-2 border font-mono">{m.bloodType}</td>
                    <td className="p-2 border text-xs">{m.usualLocation}</td>
                    <td className="p-2 border">
                      {m.vulnerability !== "None" ? (
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs font-bold">
                          {m.vulnerability}
                        </span>
                      ) : (
                        <span className="text-slate-400">--</span>
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
              {t("III. DIREKTORYO NG KAMAG-ANAK O KAIBIGAN NA MAARING TAWAGAN", "III. EMERGENCY CONTACTS (RELATIVES/FRIENDS)")}
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
            {t("IV. MGA GAWAIN NG BAWAT MIYEMBRO NG PAMILYA", "IV. FAMILY ROLES & TASKS")}
          </h2>
          <div className="space-y-4">
            {plan.roles.map((role, idx) => (
              <div key={idx} className="border-l-4 border-amber-500 pl-4 py-1">
                <h3 className="font-bold text-slate-800 text-base">
                  {role.memberName} <span className="text-xs font-normal text-slate-500">({role.roleType})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="font-bold text-amber-700 block">{t("BAGO (BEFORE):", "BEFORE:")}</span>
                    <p className="text-slate-700">{role.tasksBefore || "---"}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="font-bold text-red-700 block">{t("HABANG (DURING):", "DURING:")}</span>
                    <p className="text-slate-700">{role.tasksDuring || "---"}</p>
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <span className="font-bold text-emerald-700 block">{t("PAGKATAPOS (AFTER):", "AFTER:")}</span>
                    <p className="text-slate-700">{role.tasksAfter || "---"}</p>
                  </div>
                </div>
                {role.otherNotes && (
                  <p className="text-xs text-slate-500 mt-1 italic">
                    {t("Iba pang tala: ", "Other notes: ")} {role.otherNotes}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Evacuation & Meeting Places */}
        <section className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            {t("V. PLANO NG PAG-EVACUATE AT TAGPUAN", "V. EVACUATION & MEETING PLACES")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-bold text-slate-700 mb-2">{t("Dalawang Lugar ng Tagpuan (Meeting Places):", "Two Meeting Places:")}</h3>
              <ol className="list-decimal list-inside space-y-1 text-slate-800 font-semibold">
                <li>{plan.evacuation.meetingPlace1 || "---"}</li>
                <li>{plan.evacuation.meetingPlace2 || "---"}</li>
              </ol>
            </div>
            <div>
              <h3 className="font-bold text-slate-700 mb-2">{t("Itinalagang Evacuation Centers:", "Designated Evacuation Centers:")}</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-800 font-semibold">
                {plan.evacuation.evacCenter1 && <li>{plan.evacuation.evacCenter1}</li>}
                {plan.evacuation.evacCenter2 && <li>{plan.evacuation.evacCenter2}</li>}
                {plan.evacuation.evacCenter3 && <li>{plan.evacuation.evacCenter3}</li>}
                {plan.evacuation.evacCenter4 && <li>{plan.evacuation.evacCenter4}</li>}
              </ul>
            </div>
            {plan.evacuation.houseLayoutNotes && (
              <div className="md:col-span-2">
                <h3 className="font-bold text-slate-700 mb-1">{t("Layout / Diagram ng Bahay at Exit Points:", "House Layout & Exit Points:")}</h3>
                <p className="text-slate-700 bg-white p-3 rounded border text-xs italic">
                  {plan.evacuation.houseLayoutNotes}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 6. Meeting Schedule */}
        <section className="border border-slate-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-600" />
            {t("VI. ISKEDYUL NG PAGUUSAP AT PAGHAHANDA NG PAMILYA", "VI. FAMILY MEETING SCHEDULE")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="font-semibold text-slate-500 block">{t("Petsa (Date):", "Date:")}</span>
              <span className="font-bold text-slate-800">{plan.schedule.date || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Araw (Day):", "Day:")}</span>
              <span className="font-bold text-slate-800">{plan.schedule.day || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Oras (Time):", "Time:")}</span>
              <span className="font-bold text-slate-800">{plan.schedule.time || "---"}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500 block">{t("Dalas (Frequency):", "Frequency:")}</span>
              <span className="font-bold text-slate-800">{plan.schedule.frequency || "---"}</span>
            </div>
          </div>
        </section>

        {/* 7. Go Bag & E-Balde Checklist */}
        <section className="border border-slate-200 rounded-xl p-5">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-600" />
            {t("VII. CHECKLIST NG GO BAG AT E-BALDE", "VII. GO BAG & E-BUCKET CHECKLIST")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
            <div>
              <h3 className="font-bold text-amber-700 uppercase mb-2">{t("DOKUMENTO & PERA", "DOCUMENTS & CASH")}</h3>
              <ul className="space-y-1">
                {Object.entries(plan.checklist.documentsCash).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-1">
                    <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${val ? 'bg-amber-500 border-amber-500' : 'bg-white border-slate-300'}`}>
                      {val && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={val ? 'font-bold text-slate-800' : 'text-slate-400 italic line-through'}>
                      {key === "emergencyMoney" ? t("Pera/ATM", "Cash/ATM") : key === "govIds" ? t("IDs", "IDs") : key === "importantDocs" ? t("Docs", "Docs") : key === "familyPhotos" ? t("Larawan", "Photos") : t("Notebook", "Notebook")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-pink-700 uppercase mb-2">{t("KALINISAN & DAMIT", "TOILETRIES & CLOTHES")}</h3>
              <ul className="space-y-1">
                {Object.entries(plan.checklist.toiletries).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-1">
                    <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${val ? 'bg-pink-500 border-pink-500' : 'bg-white border-slate-300'}`}>
                      {val && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={val ? 'font-bold text-slate-800' : 'text-slate-400 italic line-through'}>
                      {key === "covidKit" ? t("COVID Kit", "COVID Kit") : key === "soapToothbrush" ? t("Soap/Brush", "Soap/Brush") : key === "clothes" ? t("Damit", "Clothes") : key === "mosquitoRepellant" ? t("Mosquito Rep.", "Repellant") : key === "menstrualPads" ? t("Pads", "Pads") : key === "babyDiapers" ? t("Diapers", "Diapers") : key === "wetWipesTissue" ? t("Wipes", "Wipes") : t("Kumot", "Blanket")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-emerald-700 uppercase mb-2">{t("PAGKAIN & GAMOT", "FOOD & MEDICINES")}</h3>
              <ul className="space-y-1">
                {Object.entries(plan.checklist.foodMeds).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-1">
                    <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${val ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300'}`}>
                      {val && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={val ? 'font-bold text-slate-800' : 'text-slate-400 italic line-through'}>
                      {key === "drinkingWater" ? t("Tubig", "Water") : key === "readyToEatFood" ? t("Pagkain", "Food") : key === "firstAidMeds" ? t("First Aid", "First Aid") : key === "babyMeds" ? t("Baby Meds", "Baby Meds") : key === "canOpenerUtensils" ? t("Can Opener", "Opener") : t("Maintenance", "Maintenance")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-700 uppercase mb-2">{t("KASANGKAPAN", "TOOLS & GEAR")}</h3>
              <ul className="space-y-1">
                {Object.entries(plan.checklist.tools).map(([key, val]) => (
                  <li key={key} className="flex items-center gap-1">
                    <div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${val ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300'}`}>
                      {val && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                    <span className={val ? 'font-bold text-slate-800' : 'text-slate-400 italic line-through'}>
                      {key === "flashlight" ? t("Flashlight", "Flashlight") : key === "whistle" ? t("Pito", "Whistle") : key === "candleMatches" ? t("Posporo", "Matches") : key === "ropeRaincoat" ? t("Tali/Kapote", "Rope/Rain") : key === "radioBlanket" ? t("Radio", "Radio") : key === "multiToolKnife" ? t("Swiss Knife", "Knife") : key === "extraBatteries" ? t("Baterya", "Battery") : t("Laruan", "Toy")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Emergency Hotlines */}
        <section className="border border-slate-200 rounded-xl p-5 bg-amber-50/30">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-600" />
            {t("VIII. MGA EMERGENCY HOTLINE NG CAMARINES NORTE", "VIII. CAMARINES NORTE EMERGENCY HOTLINES")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-white p-3 rounded border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2 uppercase">{t("Provincial Hotlines (PDRRMO)", "Provincial Hotlines (PDRRMO)")}</h3>
              <ul className="space-y-1 text-slate-700">
                <li><strong>Opcen:</strong> {CAMARINES_NORTE_HOTLINES.pdrrmo.opcen}</li>
                <li><strong>Smart:</strong> {CAMARINES_NORTE_HOTLINES.pdrrmo.smart}</li>
                <li><strong>Globe:</strong> {CAMARINES_NORTE_HOTLINES.pdrrmo.globe}</li>
                <li><strong>PNP:</strong> {CAMARINES_NORTE_HOTLINES.pdrrmo.pnp}</li>
                <li><strong>BFP:</strong> {CAMARINES_NORTE_HOTLINES.pdrrmo.bfp}</li>
              </ul>
            </div>
            <div className="bg-white p-3 rounded border border-amber-200">
              <h3 className="font-bold text-amber-800 mb-2 uppercase">
                {t(`MDRRMO ${selectedMuni.name} Hotlines`, `MDRRMO ${selectedMuni.name} Hotlines`)}
              </h3>
              <ul className="space-y-1 text-slate-700">
                <li><strong>MDRRMO:</strong> {selectedMuni.mdrrmo.join(" / ")}</li>
                <li><strong>PNP Hotline:</strong> {selectedMuni.pnp}</li>
                <li><strong>BFP Hotline:</strong> {selectedMuni.bfp}</li>
              </ul>
            </div>
            <div className="md:col-span-2 bg-white p-3 rounded border border-amber-200 grid grid-cols-2 md:grid-cols-4 gap-2">
              <div>
                <span className="font-bold text-slate-500 block">{t("Barangay Hotline:", "Barangay Hotline:")}</span>
                <span className="font-semibold text-slate-800">{plan.profile.brgyHotline || "---"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">{t("BPSO Hotline:", "BPSO Hotline:")}</span>
                <span className="font-semibold text-slate-800">{plan.profile.bpsoHotline || "---"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">{t("BHW Hotline:", "BHW Hotline:")}</span>
                <span className="font-semibold text-slate-800">{plan.profile.bhwHotline || "---"}</span>
              </div>
              <div>
                <span className="font-bold text-slate-500 block">{t("Iba pa (Other):", "Other:")}</span>
                <span className="font-semibold text-slate-800">{plan.profile.otherHotline || "---"}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Signatures Section */}
      <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-center text-sm">
        <div>
          <div className="border-b border-slate-400 h-10 w-48 mx-auto"></div>
          <p className="font-bold text-slate-800 mt-2">{t("Lagda ng Puno ng Pamilya", "Signature of Family Head")}</p>
          <p className="text-xs text-slate-500">{t("Petsa ng Paglagda", "Date Signed")}</p>
        </div>
        <div>
          <div className="border-b border-slate-400 h-10 w-48 mx-auto"></div>
          <p className="font-bold text-slate-800 mt-2">{t("Lagda ng mga Miyembro", "Signature of Family Members")}</p>
          <p className="text-xs text-slate-500">{t("Petsa ng Paglagda", "Date Signed")}</p>
        </div>
      </div>
    </div>
  );
};