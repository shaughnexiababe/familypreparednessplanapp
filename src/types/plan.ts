export interface FamilyMember {
  id: string;
  name: string;
  gender: string;
  age: string;
  phone: string;
  bloodType: string;
  usualLocation: string;
  vulnerability: string; // e.g., Senior, Infant, Pregnant, PWD, None
}

export interface RelativeContact {
  id: string;
  name: string;
  gender: string;
  age: string;
  phone: string;
  bloodType: string;
  address: string;
}

export interface FamilyRole {
  memberId: string;
  memberName: string;
  roleType: "Nanay" | "Tatay" | "Anak" | "Iba pa";
  tasksBefore: string;
  tasksDuring: string;
  tasksAfter: string;
  otherNotes: string;
}

export interface MeetingSchedule {
  date: string;
  day: string;
  time: string;
  frequency: string; // times per month
}

export interface EvacuationPlan {
  meetingPlace1: string;
  meetingPlace2: string;
  evacCenter1: string;
  evacCenter2: string;
  evacCenter3: string;
  evacCenter4: string;
  houseLayoutNotes: string;
  barangayMapNotes: string;
}

export interface GoBagChecklist {
  documentsCash: {
    emergencyMoney: boolean;
    govIds: boolean;
    importantDocs: boolean;
    familyPhotos: boolean;
    notebookPencil: boolean;
  };
  toiletries: {
    covidKit: boolean;
    soapToothbrush: boolean;
    clothes: boolean;
    mosquitoRepellant: boolean;
    menstrualPads: boolean;
    babyDiapers: boolean;
    wetWipesTissue: boolean;
    blanketRaincoat: boolean;
  };
  foodMeds: {
    drinkingWater: boolean;
    readyToEatFood: boolean;
    firstAidMeds: boolean;
    babyMeds: boolean;
    canOpenerUtensils: boolean;
    maintenanceMeds: boolean;
  };
  tools: {
    flashlight: boolean;
    powerbank: boolean;
    whistle: boolean;
    candleMatches: boolean;
    ropeRaincoat: boolean;
    radioBlanket: boolean;
    multiToolKnife: boolean;
    extraBatteries: boolean;
    comfortToy: boolean;
  };
  eBalde: {
    waterFood3Days: boolean;
    medicalSupplies: boolean;
    clothingGear: boolean;
    gadgetsInfo: boolean;
    importantDocsWaterproof: boolean;
    otherTools: boolean;
  };
}

export interface HouseholdProfile {
  municipality: string;
  barangay: string;
  sitio: string;
  houseStructure: string; // e.g., Concrete, Wood, Light materials
  hazardVulnerability: string[]; // e.g., Flood-prone, Landslide-prone, Coastal
  brgyHotline: string;
  bpsoHotline: string;
  bhwHotline: string;
  otherHotline: string;
}

export interface FamilyPlanState {
  profile: HouseholdProfile;
  members: FamilyMember[];
  relatives: RelativeContact[];
  roles: FamilyRole[];
  schedule: MeetingSchedule;
  evacuation: EvacuationPlan;
  checklist: GoBagChecklist;
}

export const DEFAULT_PLAN_STATE: FamilyPlanState = {
  profile: {
    municipality: "Daet",
    barangay: "",
    sitio: "",
    houseStructure: "Concrete",
    hazardVulnerability: [],
    brgyHotline: "",
    bpsoHotline: "",
    bhwHotline: "",
    otherHotline: ""
  },
  members: [
    {
      id: "1",
      name: "Juan Dela Cruz",
      gender: "Lalaki (Male)",
      age: "42",
      phone: "09171234567",
      bloodType: "O+",
      usualLocation: "Trabaho sa Daet Town Center",
      vulnerability: "None"
    },
    {
      id: "2",
      name: "Maria Dela Cruz",
      gender: "Babae (Female)",
      age: "39",
      phone: "09187654321",
      bloodType: "A+",
      usualLocation: "Bahay / Tindahan",
      vulnerability: "None"
    },
    {
      id: "3",
      name: "Pedro Dela Cruz",
      gender: "Lalaki (Male)",
      age: "8",
      phone: "N/A",
      bloodType: "O+",
      usualLocation: "Daet Elementary School",
      vulnerability: "None"
    }
  ],
  relatives: [
    {
      id: "r1",
      name: "Lola Elena Dela Cruz",
      gender: "Babae (Female)",
      age: "72",
      phone: "09201112222",
      bloodType: "O+",
      address: "Brgy. Gubat, Daet, Camarines Norte"
    }
  ],
  roles: [
    {
      memberId: "1",
      memberName: "Juan Dela Cruz",
      roleType: "Tatay",
      tasksBefore: "I-secure ang bubong at bintana, i-charge ang powerbanks.",
      tasksDuring: "Patayin ang main switch ng kuryente, gabayan ang pamilya sa paglikas.",
      tasksAfter: "Suriin ang pinsala sa bahay bago pumasok muli.",
      otherNotes: "Lider ng paglikas."
    },
    {
      memberId: "2",
      memberName: "Maria Dela Cruz",
      roleType: "Nanay",
      tasksBefore: "Ihanda ang Go-Bag, E-Balde, at mga importanteng dokumento.",
      tasksDuring: "Bitbitin ang Go-Bag, siguraduhing kasama ang mga bata.",
      tasksAfter: "I-check ang kalusugan ng bawat miyembro ng pamilya.",
      otherNotes: "Tagapamahala ng emergency supplies."
    }
  ],
  schedule: {
    date: "Unang Sabado ng Buwan",
    day: "Sabado (Saturday)",
    time: "4:00 PM",
    frequency: "Isang beses sa isang buwan (Once a month)"
  },
  evacuation: {
    meetingPlace1: "Plaza ng Barangay",
    meetingPlace2: "Tapat ng Simbahan",
    evacCenter1: "Barangay Hall / Covered Court",
    evacCenter2: "Daet Elementary School",
    evacCenter3: "Provincial Capitol Gym",
    evacCenter4: "",
    houseLayoutNotes: "May dalawang exit points: Main door sa harap at kitchen door sa likod. Ang bintana sa kwarto ay pwedeng labasan kung emergency.",
    barangayMapNotes: "Ang ruta ay dadaan sa Main Highway patungo sa Barangay Covered Court."
  },
  checklist: {
    documentsCash: {
      emergencyMoney: true,
      govIds: true,
      importantDocs: true,
      familyPhotos: true,
      notebookPencil: true
    },
    toiletries: {
      covidKit: true,
      soapToothbrush: true,
      clothes: true,
      mosquitoRepellant: false,
      menstrualPads: true,
      babyDiapers: false,
      wetWipesTissue: true,
      blanketRaincoat: true
    },
    foodMeds: {
      drinkingWater: true,
      readyToEatFood: true,
      firstAidMeds: true,
      babyMeds: false,
      canOpenerUtensils: true,
      maintenanceMeds: false
    },
    tools: {
      flashlight: true,
      powerbank: true,
      whistle: true,
      candleMatches: true,
      ropeRaincoat: true,
      radioBlanket: false,
      multiToolKnife: true,
      extraBatteries: true,
      comfortToy: false
    },
    eBalde: {
      waterFood3Days: true,
      medicalSupplies: true,
      clothingGear: true,
      gadgetsInfo: true,
      importantDocsWaterproof: true,
      otherTools: true
    }
  }
};