import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

interface PrivacyNoticeProps {
  lang: "tl" | "en";
  trigger?: React.ReactNode;
}

export const PrivacyNotice: React.FC<PrivacyNoticeProps> = ({ lang, trigger }) => {
  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <button className="text-[10px] text-slate-400 font-bold hover:text-amber-600 transition-colors uppercase tracking-widest">
            {t("Privacy Notice", "Privacy Notice")}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col p-0 overflow-hidden rounded-3xl border-none shadow-2xl">
        <DialogHeader className="p-6 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black uppercase tracking-tight">
                {t("Patakaran sa Privacy", "Privacy Notice")}
              </DialogTitle>
              <DialogDescription className="text-slate-400 text-xs font-medium">
                {t("Huling update: Mayo 2026", "Last updated: May 2026")}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6 bg-white">
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed pb-8">
            <section className="space-y-2">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-wider">
                {t("1. Ang Aming Pangako", "1. Our Commitment")}
              </h3>
              <p>
                {t(
                  "Ang Tahanang Handa ay nakatuon sa pagprotekta sa iyong privacy. Ang notice na ito ay nagpapaliwanag kung paano namin kinokolekta at pinangangalagaan ang iyong impormasyon.",
                  "Tahanang Handa is committed to protecting your privacy. This notice explains how we collect and safeguard your information."
                )}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-wider">
                {t("2. Impormasyong Kinokolekta Namin", "2. Information We Collect")}
              </h3>
              <p>
                {t(
                  "Upang makagawa ng isang epektibong plano sa kahandaan, kinokolekta namin ang mga sumusunod:",
                  "To create an effective preparedness plan, we collect the following:"
                )}
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>{t("Pangalan at impormasyon ng kontak ng mga miyembro ng pamilya.", "Names and contact information of family members.")}</li>
                <li>{t("Lokasyon ng inyong tahanan (Barangay/Sitio).", "Location of your home (Barangay/Sitio).")}</li>
                <li>{t("Mga detalye tungkol sa inyong bahay at mga kagamitang pang-emergency.", "Details about your house and emergency supplies.")}</li>
                <li>{t("Mga tungkulin at gampanin ng bawat miyembro sa oras ng sakuna.", "Roles and tasks of each member during disasters.")}</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-wider">
                {t("3. Paano Namin Ginagamit ang Iyong Impormasyon", "3. How We Use Your Information")}
              </h3>
              <p>
                {t(
                  "Ang iyong data ay ginagamit lamang para sa:",
                  "Your data is used solely for:"
                )}
              </p>
              <ul className="list-disc list-inside ml-2 space-y-1">
                <li>{t("Pagbuo at pag-save ng inyong Family Preparedness Plan.", "Generating and saving your Family Preparedness Plan.")}</li>
                <li>{t("Pagpapakita ng mga lokal na babala at panganib sa inyong lugar.", "Displaying local alerts and hazards in your area.")}</li>
                <li>{t("Pagpapadala ng mga paalala para sa inyong iskedyul ng pag-uusap.", "Sending reminders for your family meeting schedule.")}</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-wider">
                {t("4. Pag-iimbak at Seguridad ng Data", "4. Data Storage & Security")}
              </h3>
              <p>
                {t(
                  "Ang inyong impormasyon ay ligtas na naka-store sa Firebase (Google Cloud). Hindi namin ibinebenta o ibinabahagi ang inyong personal na impormasyon sa mga third-party advertiser.",
                  "Your information is securely stored in Firebase (Google Cloud). We do not sell or share your personal information with third-party advertisers."
                )}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="font-black text-slate-900 uppercase text-xs tracking-wider">
                {t("5. Iyong mga Karapatan", "5. Your Rights")}
              </h3>
              <p>
                {t(
                  "Mayroon kang karapatan na tingnan, i-update, o burahin ang iyong impormasyon anumang oras sa pamamagitan ng app.",
                  "You have the right to access, update, or delete your information at any time through the app."
                )}
              </p>
            </section>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 italic">
                {t(
                  "Sa paggamit ng app na ito, sumasang-ayon ka sa pagkolekta at paggamit ng impormasyon ayon sa notice na ito.",
                  "By using this app, you agree to the collection and use of information as outlined in this notice."
                )}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
