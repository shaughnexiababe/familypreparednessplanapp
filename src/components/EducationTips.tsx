import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wind,
  Waves,
  CloudLightning,
  Droplets,
  Mountain,
  Flame,
  Activity,
  Backpack,
  Hash,
  ShieldCheck,
  Info
} from "lucide-react";
import { DISASTER_TOPICS, SOCIAL_MEDIA_HASHTAGS, GO_BAG_ESSENTIALS } from "@/data/disasterEducation";

interface EducationTipsProps {
  lang: "tl" | "en";
}

const iconMap: Record<string, React.ReactNode> = {
  Wind: <Wind className="w-5 h-5" />,
  Waves: <Waves className="w-5 h-5" />,
  CloudLightning: <CloudLightning className="w-5 h-5" />,
  Droplets: <Droplets className="w-5 h-5" />,
  Mountain: <Mountain className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
};

export const EducationTips: React.FC<EducationTipsProps> = ({ lang }) => {
  const t = (tl: string, en: string) => (lang === "tl" ? tl : en);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Introduction */}
      <Card className="border-none shadow-none bg-amber-50 rounded-3xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-black text-amber-800 flex items-center gap-2 uppercase tracking-tight">
            <ShieldCheck className="w-6 h-6" />
            {t("Gabay sa Kahandaan (OCD)", "Preparedness Guide (OCD)")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700 leading-relaxed italic">
            {t(
              "Ang mga sumusunod na impormasyon ay hango sa OCD Broadcaster's Manual upang magbigay ng wasto at mabilis na gabay bago, habang, at pagkatapos ng sakuna.",
              "The following information is based on the OCD Broadcaster's Manual to provide accurate and rapid guidance before, during, and after a disaster."
            )}
          </p>
        </CardContent>
      </Card>

      {/* Disaster Topics Accordion */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider px-1">
          {t("Mga Uri ng Sakuna", "Disaster Categories")}
        </h3>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {DISASTER_TOPICS.map((topic) => (
            <AccordionItem
              key={topic.id}
              value={topic.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm px-4 overflow-hidden border-b-0"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 text-left">
                  <div className="p-2 bg-slate-50 rounded-xl text-amber-600">
                    {iconMap[topic.iconName] || <Info className="w-5 h-5" />}
                  </div>
                  <span className="font-bold text-slate-800">{t(topic.title.tl, topic.title.en)}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Bago */}
                  <div className="space-y-3">
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none font-black uppercase text-[10px] px-2 py-0.5 rounded-lg">
                      {t("Bago", "Before")}
                    </Badge>
                    <ul className="space-y-2">
                      {topic.before.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{t(item.tl, item.en)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Habang */}
                  <div className="space-y-3">
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-black uppercase text-[10px] px-2 py-0.5 rounded-lg">
                      {t("Habang", "During")}
                    </Badge>
                    <ul className="space-y-2">
                      {topic.during.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-red-500 font-bold">•</span>
                          <span>{t(item.tl, item.en)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Pagkatapos */}
                  <div className="space-y-3">
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none font-black uppercase text-[10px] px-2 py-0.5 rounded-lg">
                      {t("Pagkatapos", "After")}
                    </Badge>
                    <ul className="space-y-2">
                      {topic.after.map((item, idx) => (
                        <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-emerald-500 font-bold">•</span>
                          <span>{t(item.tl, item.en)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Go Bag Essentials */}
      <Card className="bg-slate-900 text-white rounded-[32px] border-none shadow-xl overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-black flex items-center gap-2 uppercase tracking-tight">
            <Backpack className="w-5 h-5 text-amber-500" />
            {t("Go Bag Checklist (OCD)", "Go Bag Checklist (OCD)")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {GO_BAG_ESSENTIALS.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0" />
                {t(item.tl, item.en)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hashtags Guide */}
      <div className="space-y-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 px-1">
          <Hash className="w-5 h-5 text-blue-500" />
          {t("Gabay sa Social Media Hashtags", "Social Media Hashtag Guide")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {SOCIAL_MEDIA_HASHTAGS.map((h) => (
            <div key={h.tag} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-1 transition-all hover:shadow-md">
              <span className="font-black text-blue-600 text-sm">{h.tag}</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{t(h.description.tl, h.description.en)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
