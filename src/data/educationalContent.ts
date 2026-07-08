export interface Translation {
  tl: string;
  en: string;
}

export interface AgeGuideline {
  age: string;
  title: Translation;
  desc: Translation;
  icon: string;
  imageUrl: string;
}

export interface PreparednessCharacteristic {
  title: Translation;
  items: Translation[];
  imageUrl: string;
}

export interface DisasterTip {
  hazard: string;
  title: Translation;
  imageUrl: string;
  before: Translation[];
  during: Translation[];
  after: Translation[];
}

export const AGE_GUIDELINES: AgeGuideline[] = [
  {
    age: "3",
    title: {
      tl: "3 Taong Gulang (3 Years Old)",
      en: "3 Years Old Guidelines"
    },
    desc: {
      tl: "Turuan silang gumamit ng pito, tumawag ng tulong, at tandaan ang address ng bahay at pangalan ng mga magulang.",
      en: "Teach them to use a whistle, call for help, and memorize their home address and parents' names."
    },
    icon: "Megaphone",
    imageUrl: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=300&q=80" // Child with whistle/toy
  },
  {
    age: "5",
    title: {
      tl: "5 Taong Gulang (5 Years Old)",
      en: "5 Years Old Guidelines"
    },
    desc: {
      tl: "Turuan silang mag-pack ng kanilang sariling Go-Bags o emergency kits na may paboritong laruan o meryenda.",
      en: "Teach them to pack their own Go-Bags or emergency kits with a favorite toy or snack."
    },
    icon: "Briefcase",
    imageUrl: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=300&q=80" // Child with backpack
  },
  {
    age: "7",
    title: {
      tl: "7 Taong Gulang (7 Years Old)",
      en: "7 Years Old Guidelines"
    },
    desc: {
      tl: "Turuan silang mag 'Drop, Cover, and Hold' kapag may lindol, at alamin ang mga ligtas na lugar sa bahay.",
      en: "Teach them to 'Drop, Cover, and Hold' during an earthquake, and identify safe spots in the house."
    },
    icon: "ShieldAlert",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=300&q=80" // Active kids learning
  },
  {
    age: "15-17",
    title: {
      tl: "15-17 Taong Gulang (15-17 Years Old)",
      en: "15-17 Years Old Guidelines"
    },
    desc: {
      tl: "Bigyan sila ng listahan ng emergency hotlines para i-save sa kanilang mobile phones. Turuan silang mag-monitor ng updates gamit ang social media.",
      en: "Give them a list of emergency hotlines to save on their mobile phones. Teach them to monitor updates using social media."
    },
    icon: "Smartphone",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80" // Teenager with phone
  },
  {
    age: "18+",
    title: {
      tl: "18 Taong Gulang Pataas (18+ Years Old)",
      en: "18+ Years Old Guidelines"
    },
    desc: {
      tl: "Turuan silang tumulong na gawing mas matibay ang bahay sa anumang emergency at maging lider sa paglikas.",
      en: "Teach them to help reinforce the house for any emergency and act as leaders during evacuation."
    },
    icon: "Home",
    imageUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80" // Young adult helping at home
  }
];

export const PREPARED_FAMILY_CHARACTERISTICS: PreparednessCharacteristic[] = [
  {
    title: {
      tl: "Alam ang mga Sumusunod (Knowledgeable of the Following)",
      en: "Knowledgeable of the Following"
    },
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=500&q=80", // Family studying map/info
    items: [
      {
        tl: "Mga bantang panganib na maaring makaapekto sa Barangay at pamilya.",
        en: "Hazards and risks that may affect the Barangay and the family."
      },
      {
        tl: "Barangay Disaster Risk Reduction and Management Plan.",
        en: "Barangay Disaster Risk Reduction and Management Plan."
      },
      {
        tl: "Contingency Plan at Early Warning System ng komunidad.",
        en: "Contingency Plan and Early Warning System of the community."
      },
      {
        tl: "Hazard and Resource Map ng Barangay.",
        en: "Hazard and Resource Map of the Barangay."
      },
      {
        tl: "Designated Evacuation Centers at ligtas na ruta patungo rito.",
        en: "Designated Evacuation Centers and safe routes leading to them."
      },
      {
        tl: "Saan dadalhin ang mga alagang hayop para mailigtas.",
        en: "Where to bring pets and livestock to keep them safe."
      }
    ]
  },
  {
    title: {
      tl: "May mga Praktikal na Gawain o Hakbang (Practical Actions & Steps)",
      en: "Practical Actions & Steps"
    },
    imageUrl: "https://images.unsplash.com/photo-1584263343329-73652ad895a4?auto=format&fit=crop&w=500&q=80", // Emergency supplies / Go Bag
    items: [
      {
        tl: "May sapat na emergency supplies (pagkain, tubig, gamot) para sa 3 araw.",
        en: "Has sufficient emergency supplies (food, water, medicine) for 3 days."
      },
      {
        tl: "Pinapatibay ang kabahayan at mga gamit pang hanap-buhay.",
        en: "Reinforces the house structure and livelihood equipment."
      },
      {
        tl: "May handang emergency evacuation bags o Go Bags / E-Balde.",
        en: "Has prepared emergency evacuation bags or Go Bags / E-Balde."
      },
      {
        tl: "Sinisiguro na may sapat na baterya at load ang mga cellphone.",
        en: "Ensures mobile phones are fully charged and have active prepaid load."
      }
    ]
  },
  {
    title: {
      tl: "May Plano sa Paghahanda (Preparedness Planning)",
      en: "Preparedness Planning"
    },
    imageUrl: "https://images.unsplash.com/photo-1609234656388-0ff363383899?auto=format&fit=crop&w=500&q=80", // Family meeting / discussion
    items: [
      {
        tl: "Regular na nagpupulong ang pamilya tungkol sa kaligtasan.",
        en: "The family regularly meets to discuss safety and emergency plans."
      },
      {
        tl: "May malinaw na communication protocol kung magkahiwalay man.",
        en: "Has a clear communication protocol in case family members get separated."
      },
      {
        tl: "Kabisado ang mga emergency contact numbers ng bawat isa at ng mga ahensya.",
        en: "Memorized emergency contact numbers of each other and local response agencies."
      }
    ]
  }
];

export const DISASTER_TIPS: DisasterTip[] = [
  {
    hazard: "Bagyo at Baha (Typhoon & Flood)",
    title: {
      tl: "Bagyo at Baha (Typhoon & Flood)",
      en: "Typhoon & Flood"
    },
    imageUrl: "https://images.unsplash.com/photo-1545007805-a44ee83438fa?auto=format&fit=crop&w=600&q=80", // Heavy rain / storm
    before: [
      {
        tl: "I-monitor ang ulat ng panahon at mga babala sa radyo o TV.",
        en: "Monitor weather reports and warnings on radio or TV."
      },
      {
        tl: "Ihanda ang Go-Bag at E-Balde na may sapat na pagkain at tubig.",
        en: "Prepare the Go-Bag and E-Bucket with enough food and water."
      },
      {
        tl: "Ayusin o patibayin ang mga mahihinang bahagi ng bahay.",
        en: "Repair or reinforce weak parts of the house."
      }
    ],
    during: [
      {
        tl: "Manatili sa loob ng bahay o lumikas agad kung pinapayuhan ng awtoridad.",
        en: "Stay indoors or evacuate immediately if advised by authorities."
      },
      {
        tl: "Patayin ang pangunahing switch ng kuryente at valve ng tubig.",
        en: "Turn off the main electricity switch and water valve."
      },
      {
        tl: "Iwasang lumusong sa baha upang makaiwas sa leptospirosis at kuryente.",
        en: "Avoid wading in floodwaters to prevent leptospirosis and electrocution."
      }
    ],
    after: [
      {
        tl: "Siguraduhing ligtas ang bahay bago pumasok muli.",
        en: "Ensure the house is structurally safe before re-entering."
      },
      {
        tl: "I-report ang mga natumbang puno o poste ng kuryente.",
        en: "Report fallen trees or electrical posts to authorities."
      },
      {
        tl: "Suriin kung kontaminado ang tubig bago inumin.",
        en: "Check if drinking water is contaminated before consuming."
      }
    ]
  },
  {
    hazard: "Lindol (Earthquake)",
    title: {
      tl: "Lindol (Earthquake)",
      en: "Earthquake"
    },
    imageUrl: "https://images.unsplash.com/photo-1469571486090-7d99c11d5024?auto=format&fit=crop&w=600&q=80", // Ground / structural safety
    before: [
      {
        tl: "I-secure ang mga mabibigat na kasangkapan sa pader.",
        en: "Secure heavy furniture and appliances to the wall."
      },
      {
        tl: "Alamin ang mga ligtas na lugar sa bawat kwarto (sa ilalim ng matibay na mesa).",
        en: "Identify safe spots in each room (under sturdy tables)."
      },
      {
        tl: "Magsagawa ng regular na earthquake drill kasama ang pamilya.",
        en: "Conduct regular earthquake drills with the family."
      }
    ],
    during: [
      {
        tl: "Gawin ang DROP, COVER, and HOLD sa ilalim ng matibay na mesa.",
        en: "Perform DROP, COVER, and HOLD under a sturdy table."
      },
      {
        tl: "Umiwas sa mga bintanang salamin, aparador, at mabibigat na bagay.",
        en: "Stay away from glass windows, cabinets, and heavy objects."
      },
      {
        tl: "Kung nasa labas, pumunta sa bukas na lugar malayo sa mga gusali at linya ng kuryente.",
        en: "If outdoors, move to an open area away from buildings and power lines."
      }
    ],
    after: [
      {
        tl: "Mag-ingat sa mga aftershocks at lumabas nang maayos kapag huminto ang pagyanig.",
        en: "Watch out for aftershocks and exit calmly once the shaking stops."
      },
      {
        tl: "Suriin ang sarili at pamilya kung may sugat o pinsala.",
        en: "Check yourself and family members for injuries."
      },
      {
        tl: "Huwag gumamit ng elevator; gamitin ang hagdanan.",
        en: "Do not use elevators; use the stairs."
      }
    ]
  },
  {
    hazard: "Sunog (Fire)",
    title: {
      tl: "Sunog (Fire)",
      en: "Fire"
    },
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&w=600&q=80", // Fire safety / extinguisher
    before: [
      {
        tl: "Iwasan ang overloading ng mga saksakan ng kuryente.",
        en: "Avoid overloading electrical outlets."
      },
      {
        tl: "Itabi ang mga madaling masunog na likido malayo sa kalan.",
        en: "Store flammable liquids away from the stove."
      },
      {
        tl: "Alamin ang lokasyon ng fire extinguisher at kung paano ito gamitin.",
        en: "Know the location of the fire extinguisher and how to use it."
      }
    ],
    during: [
      {
        tl: "Gumapang sa ilalim ng usok para makahinga ng malinis na hangin.",
        en: "Crawl low under smoke to breathe cleaner air."
      },
      {
        tl: "Kung nasusunog ang damit, gawin ang STOP, DROP, and ROLL.",
        en: "If clothes catch fire, STOP, DROP, and ROLL."
      },
      {
        tl: "Tumawag agad sa BFP o gamitin ang pinakamalapit na fire alarm.",
        en: "Call the BFP immediately or use the nearest fire alarm."
      }
    ],
    after: [
      {
        tl: "Huwag bumalik sa loob ng nasusunog na gusali para kumuha ng gamit.",
        en: "Do not re-enter a burning building to retrieve belongings."
      },
      {
        tl: "Magtipon sa itinalagang ligtas na tagpuan ng pamilya.",
        en: "Assemble at the designated family meeting place."
      },
      {
        tl: "Sumunod sa mga tagubilin ng mga bumbero at medical responders.",
        en: "Follow instructions from firefighters and medical responders."
      }
    ]
  }
];