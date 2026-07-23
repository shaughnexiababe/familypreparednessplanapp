export interface ActionItem {
  tl: string;
  en: string;
}

export interface DisasterTopic {
  id: string;
  title: { tl: string; en: string };
  iconName: string;
  before: ActionItem[];
  during: ActionItem[];
  after: ActionItem[];
}

export const DISASTER_TOPICS: DisasterTopic[] = [
  {
    id: "bagyo",
    title: { tl: "Bagyo", en: "Typhoon" },
    iconName: "Wind",
    before: [
      { tl: "Subaybayan ang ulat ng panahon at mga babala mula sa PAGASA.", en: "Monitor weather reports and warnings from PAGASA." },
      { tl: "Mag-imbak ng sapat na pagkain, tubig, at gamot para sa tatlong araw.", en: "Stock up on food, water, and medicine for three days." },
      { tl: "Suriin at patibayin ang mga mahihinang bahagi ng bahay.", en: "Check and reinforce weak parts of the house." }
    ],
    during: [
      { tl: "Manatili sa loob ng bahay at lumayo sa mga bintanang salamin.", en: "Stay indoors and away from glass windows." },
      { tl: "Patayin ang pangunahing switch ng kuryente at valve ng tubig kung kinakailangan.", en: "Turn off the main electrical switch and water valve if necessary." },
      { tl: "Makinig sa radyo o TV para sa mga update at tagubilin.", en: "Listen to the radio or TV for updates and instructions." }
    ],
    after: [
      { tl: "Mag-ingat sa mga natumbang puno, poste, at sirang linya ng kuryente.", en: "Be careful of fallen trees, poles, and damaged power lines." },
      { tl: "Siguraduhing ligtas ang bahay bago pumasok muli.", en: "Ensure the house is safe before re-entering." },
      { tl: "Itapon ang mga pagkaing nabasa ng baha.", en: "Discard food that has been in contact with floodwater." }
    ]
  },
  {
    id: "daluyong",
    title: { tl: "Daluyong ng Bagyo", en: "Storm Surge" },
    iconName: "Waves",
    before: [
      { tl: "Kung nakatira malapit sa dagat, alamin ang panganib ng biglaang pagtaas ng tubig.", en: "If living near the coast, know the risk of sudden water rise." },
      { tl: "Lumikas agad kung may babala; huwag hintayin ang bagyo bago umalis.", en: "Evacuate immediately if warned; don't wait for the storm before leaving." }
    ],
    during: [
      { tl: "Huwag pumunta sa baybayin para manood ng alon.", en: "Do not go to the shore to watch the waves." },
      { tl: "Manatili sa mataas na lugar o sa itaas na palapag ng matibay na gusali.", en: "Stay on high ground or the upper floor of a sturdy building." }
    ],
    after: [
      { tl: "Umuwi lamang kung idineklara nang ligtas ng mga awtoridad.", en: "Return home only when authorities declare it safe." },
      { tl: "Maging maingat sa pagpasok sa mga gusaling nabasa ng tubig-dagat.", en: "Be careful when entering buildings affected by seawater." }
    ]
  },
  {
    id: "sama-panahon",
    title: { tl: "Sama ng Panahon", en: "Severe Weather" },
    iconName: "CloudLightning",
    before: [
      { tl: "Alamin ang mga Rainfall Warning (Yellow, Orange, Red) mula sa PAGASA.", en: "Know the Rainfall Warnings (Yellow, Orange, Red) from PAGASA." },
      { tl: "Ihanda ang mga gamit pang-emergency.", en: "Prepare your emergency supplies." }
    ],
    during: [
      { tl: "Iwasan ang paglabas kung hindi kailangan.", en: "Avoid going out unless necessary." },
      { tl: "Umiwas sa mga lugar na madaling bahain.", en: "Avoid flood-prone areas." }
    ],
    after: [
      { tl: "Subaybayan ang mga update tungkol sa kalagayan ng kalsada.", en: "Monitor road condition updates." }
    ]
  },
  {
    id: "baha",
    title: { tl: "Baha", en: "Flood" },
    iconName: "Droplets",
    before: [
      { tl: "Ilagay ang mga kagamitan at gamot sa mataas na bahagi ng bahay.", en: "Move appliances and medicines to a higher part of the house." },
      { tl: "Ihanda ang mga gamit sa paglikas.", en: "Prepare evacuation supplies." }
    ],
    during: [
      { tl: "Iwasang lumusong sa baha dahil sa panganib ng leptospirosis at kuryente.", en: "Avoid wading in floodwaters due to leptospirosis and electrocution risks." },
      { tl: "Huwag piliting itawid ang sasakyan sa umaagos na tubig.", en: "Do not attempt to drive through flowing water." }
    ],
    after: [
      { tl: "Itapon ang mga pagkaing nabasa ng baha.", en: "Discard food that has been in contact with floodwater." },
      { tl: "Linisin at i-disinfect ang bahay bago muling tirhan.", en: "Clean and disinfect the house before re-occupying." }
    ]
  },
  {
    id: "landslide",
    title: { tl: "Pagguho ng Lupa", en: "Landslide" },
    iconName: "Mountain",
    before: [
      { tl: "Maging alerto sa mga senyales tulad ng pagbitak ng lupa o pagkatagilig ng mga puno.", en: "Be alert for signs like soil cracks or leaning trees." },
      { tl: "Alamin ang mga lugar na prone sa landslide sa inyong komunidad.", en: "Know the landslide-prone areas in your community." }
    ],
    during: [
      { tl: "Kung hindi na makakaalis, mag-curl sa posisyong bilog at protektahan ang ulo.", en: "If trapped, curl into a ball and protect your head." }
    ],
    after: [
      { tl: "Umiwas sa lugar na pinangyarihan dahil posibleng magkaroon ng follow-up landslides.", en: "Avoid the affected area as follow-up landslides are possible." }
    ]
  },
  {
    id: "sunog",
    title: { tl: "Sunog", en: "Fire" },
    iconName: "Flame",
    before: [
      { tl: "Ugaliing i-unplug ang mga appliances na hindi ginagamit.", en: "Always unplug appliances that are not in use." },
      { tl: "Magkaroon ng fire escape plan sa bahay.", en: "Have a fire escape plan at home." }
    ],
    during: [
      { tl: "Kung may usok, gumapang nang mababa (crawl low).", en: "If there is smoke, crawl low." },
      { tl: "Kung masunog ang damit: Stop, Drop, and Roll.", en: "If clothes catch fire: Stop, Drop, and Roll." }
    ],
    after: [
      { tl: "Huwag nang bumalik sa loob ng nasusunog na gusali para kumuha ng kagamitan.", en: "Do not return inside a burning building to retrieve items." }
    ]
  },
  {
    id: "lindol",
    title: { tl: "Lindol", en: "Earthquake" },
    iconName: "Activity",
    before: [
      { tl: "I-secure ang mga mabibigat na gamit na maaaring matumba.", en: "Secure heavy items that might fall over." },
      { tl: "Makilahok sa mga earthquake drills.", en: "Participate in earthquake drills." }
    ],
    during: [
      { tl: "Gawin ang Duck, Cover, and Hold.", en: "Perform Duck, Cover, and Hold." },
      { tl: "Kung nasa labas, lumayo sa mga gusali, poste, at puno.", en: "If outdoors, move away from buildings, poles, and trees." }
    ],
    after: [
      { tl: "Gamitin ang hagdan, huwag ang elevator.", en: "Use the stairs, not the elevator." },
      { tl: "Maghanda para sa mga aftershocks.", en: "Prepare for aftershocks." }
    ]
  },
  {
    id: "tsunami",
    title: { tl: "Tsunami", en: "Tsunami" },
    iconName: "Waves",
    before: [
      { tl: "Alamin ang mga natural na babala: Feel, See, Hear.", en: "Know the natural warnings: Feel, See, Hear." }
    ],
    during: [
      { tl: "Mabilis na pumunta sa mataas na lugar (30m pataas) o malayo sa baybayin (3km pataas).", en: "Quickly move to high ground (30m+) or inland (3km+)." }
    ],
    after: [
      { tl: "Huwag agad bumaba sa pampang; ang tsunami ay binubuo ng serye ng mga alon.", en: "Don't return to the shore immediately; tsunamis consist of multiple waves." }
    ]
  },
  {
    id: "bulkan",
    title: { tl: "Pagputok ng Bulkan", en: "Volcanic Eruption" },
    iconName: "Mountain",
    before: [
      { tl: "Makinig sa PHIVOLCS para sa Alert Levels.", en: "Listen to PHIVOLCS for Alert Levels." },
      { tl: "Maghanda ng N95 masks para sa proteksyon sa ashfall.", en: "Prepare N95 masks for ashfall protection." }
    ],
    during: [
      { tl: "Iwasan ang mga mabababang lugar na maaaring daanan ng lahar.", en: "Avoid low-lying areas that may be affected by lahar." },
      { tl: "Manatili sa loob ng bahay at isara ang mga bintana.", en: "Stay indoors and close windows." }
    ],
    after: [
      { tl: "Linisin ang naipong abo sa bubong upang maiwasan ang pagguho nito.", en: "Clean accumulated ash on the roof to prevent collapse." }
    ]
  }
];

export const SOCIAL_MEDIA_HASHTAGS = [
  { tag: "#BagyoPH", description: { tl: "Updates tungkol sa bagyo", en: "Typhoon updates" } },
  { tag: "#FloodPH", description: { tl: "Ulat tungkol sa pagbaha", en: "Flood reports" } },
  { tag: "#RescuePH", description: { tl: "Panawagan para sa rescue", en: "Rescue requests" } },
  { tag: "#SafeNow", description: { tl: "Pag-uulat na ligtas na ang isang tao", en: "Reporting oneself as safe" } },
  { tag: "#ReliefPH", description: { tl: "Tulong at relief operations", en: "Relief and aid operations" } },
  { tag: "#WalangPasok", description: { tl: "Suspension ng klase o trabaho", en: "Class or work suspensions" } }
];

export const GO_BAG_ESSENTIALS: ActionItem[] = [
  { tl: "Tubig (4 na litro bawat tao kada araw)", en: "Water (4 liters per person per day)" },
  { tl: "Pagkain (Ready-to-eat, hindi madaling mapanis)", en: "Food (Ready-to-eat, non-perishable)" },
  { tl: "First-aid kit at maintenance medicines", en: "First-aid kit and maintenance medicines" },
  { tl: "Flashlight, pito (whistle), at extra batteries", en: "Flashlight, whistle, and extra batteries" },
  { tl: "Radyo at power bank", en: "Radio and power bank" },
  { tl: "Extra na damit at kumot", en: "Extra clothes and blankets" },
  { tl: "Mahahalagang dokumento (waterproof container)", en: "Important documents (waterproof container)" }
];
