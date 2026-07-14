import React, { useState } from "react";
import { Shield, ChevronLeft, Trash, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
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

const Privacy = () => {
  const navigate = useNavigate();
  const { user, deleteAccount } = useAuth();
  const [lang, setLang] = useState<"tl" | "en">("tl");
  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      navigate("/login");
    } catch (error: any) {
      toast.error(t("May error sa pagbura ng account.", "Error deleting account."));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 md:p-12">
      <div className="max-w-3xl w-full bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
        <header className="p-8 bg-slate-900 text-white relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="absolute left-4 top-8 text-white hover:bg-white/10 rounded-xl"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            {t("Bumalik", "Back")}
          </Button>

          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-3 bg-amber-500 rounded-2xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight">
                {t("Patakaran sa Privacy", "Privacy Policy")}
              </h1>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">
                Tahanang Handa &bull; 2026
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl flex">
              <button
                onClick={() => setLang("tl")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  lang === "tl" ? "bg-white text-amber-600 shadow-sm" : "text-white/70 hover:bg-white/10"
                }`}
              >
                Tagalog
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                  lang === "en" ? "bg-white text-amber-600 shadow-sm" : "text-white/70 hover:bg-white/10"
                }`}
              >
                English
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 md:p-12 space-y-8 text-slate-600 leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-black text-slate-900 uppercase text-sm tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
              {t("1. Ang Aming Pangako", "1. Our Commitment")}
            </h2>
            <p>
              {t(
                "Ang Tahanang Handa ay isang application para sa pagpaplano sa sakuna. Nakatuon kami sa pagprotekta sa iyong privacy at pagtiyak na ang iyong personal na impormasyon ay pinangangalagaan nang may pinakamataas na antas ng seguridad.",
                "Tahanang Handa is a disaster preparedness application. We are committed to protecting your privacy and ensuring that your personal information is handled with the highest level of security."
              )}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-black text-slate-900 uppercase text-sm tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
              {t("2. Impormasyong Kinokolekta Namin", "2. Information We Collect")}
            </h2>
            <p>
              {t(
                "Kinokolekta namin ang impormasyon na boluntaryo mong ibinibigay upang makabuo ng iyong Family Preparedness Plan:",
                "We collect information that you voluntarily provide to generate your Family Preparedness Plan:"
              )}
            </p>
            <ul className="list-disc list-inside ml-2 space-y-2">
              <li>{t("Personal na impormasyon (Pangalan, Edad, Kasarian, Blood Type).", "Personal information (Name, Age, Gender, Blood Type).")}</li>
              <li>{t("Impormasyon ng kontak (Numero ng Telepono, Address).", "Contact information (Phone Number, Address).")}</li>
              <li>{t("Lokasyon ng sambahayan (Barangay at Sitio sa Camarines Norte).", "Household location (Barangay and Sitio in Camarines Norte).")}</li>
              <li>{t("Mga detalye ng bahay at kagamitang pang-emergency.", "House details and emergency equipment.")}</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-black text-slate-900 uppercase text-sm tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
              {t("3. Paggamit ng Impormasyon", "3. Use of Information")}
            </h2>
            <p>
              {t(
                "Ang iyong impormasyon ay ginagamit para sa mga sumusunod na layunin:",
                "Your information is used for the following purposes:"
              )}
            </p>
            <ul className="list-disc list-inside ml-2 space-y-2">
              <li>{t("Upang i-save ang iyong plano sa cloud para sa madaling pag-access.", "To save your plan in the cloud for easy access.")}</li>
              <li>{t("Upang magbigay ng mga lokal na babala at gabay batay sa iyong lokasyon.", "To provide local alerts and guidance based on your location.")}</li>
              <li>{t("Upang mapabuti ang mga serbisyo ng application.", "To improve application services.")}</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-black text-slate-900 uppercase text-sm tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
              {t("4. Seguridad ng Data", "4. Data Security")}
            </h2>
            <p>
              {t(
                "Gumagamit kami ng standard na teknolohiya sa seguridad gaya ng Firebase Authentication at encrypted database (Cloud Firestore) upang matiyak na ang iyong data ay hindi maa-access ng mga hindi awtorisadong tao.",
                "We use industry-standard security technologies such as Firebase Authentication and encrypted databases (Cloud Firestore) to ensure that your data is not accessed by unauthorized individuals."
              )}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-black text-slate-900 uppercase text-sm tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
              {t("5. Pagbabahagi sa Iba", "5. Data Sharing")}
            </h2>
            <p>
              {t(
                "Hindi namin ibinebenta, ipinagpapalit, o ibinabahagi ang iyong personal na impormasyon sa mga third-party advertiser o iba pang kumpanya.",
                "We do not sell, trade, or share your personal information with third-party advertisers or other companies."
              )}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-black text-slate-900 uppercase text-sm tracking-wider flex items-center gap-2">
              <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
              {t("6. Iyong mga Karapatan", "6. Your Rights")}
            </h2>
            <p>
              {t(
                "Maaari mong i-edit o burahin ang iyong profile at ang iyong buong preparedness plan anumang oras sa loob ng app. Maaari mo ring i-request ang tuluyang pagbubura ng iyong account.",
                "You can edit or delete your profile and your entire preparedness plan at any time within the app. You can also request the permanent deletion of your account."
              )}
            </p>

            {user && (
              <div className="pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-600 border-red-100 hover:bg-red-50 rounded-2xl gap-2 font-bold px-6">
                      <Trash className="w-4 h-4" />
                      {t("Burahin ang aking Account Ngayon", "Delete my Account Now")}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-3xl border-none">
                    <AlertDialogHeader>
                      <div className="mx-auto bg-red-100 p-3 rounded-2xl mb-2">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <AlertDialogTitle className="text-center">{t("Kumpirmahin ang Pagbura", "Confirm Deletion")}</AlertDialogTitle>
                      <AlertDialogDescription className="text-center">
                        {t(
                          "Ang aksyong ito ay hindi na maaaring bawiin. Lahat ng iyong data, kabilang ang iyong Family Preparedness Plan, ay permanenteng mawawala.",
                          "This action cannot be undone. All your data, including your Family Preparedness Plan, will be permanently lost."
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="sm:justify-center gap-3 mt-4">
                      <AlertDialogCancel className="rounded-xl flex-1">{t("Bumalik", "Cancel")}</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-red-600 hover:bg-red-700 text-white rounded-xl flex-1">
                        {t("Oo, Burahin", "Yes, Delete")}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </section>

          <footer className="pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Tahanang Handa &copy; 2026
            </p>
            <p className="text-[10px] text-slate-400 mt-1 uppercase">
              {t("Probinsya ng Camarines Norte, Pilipinas", "Province of Camarines Norte, Philippines")}
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
