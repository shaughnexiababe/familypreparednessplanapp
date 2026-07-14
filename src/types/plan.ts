export interface FamilyMember {
  id: string;
  name: string;
  gender: string;
  age: string;
  phone: string;
  bloodType: string;
  usualLocation: string;
  vulnerability: string; // e.g., Senior, Infant, Pregnant, PWD, None
  status?: "Ligtas" | "Nasa Panganib" | "Hindi Pa Alam"; // Safety status
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
  headOfHousehold: string;
  municipality: string;
  barangay: string;
  sitio: string;
  houseStructure: string; // e.g., Concrete, Wood, Light materials
  houseOwnership: string; // e.g., Owned, Rented, Informal Settler
  waterSource: string; // e.g., Shared, Faucet, Well
  toiletFacility: string; // e.g., Water-sealed, Open pit, None
  electricitySource: string; // e.g., CANORECO, Solar, Generator
  cookingFacility: string; // e.g., Gas, Charcoal, Electric
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
    headOfHousehold: "",
    municipality: "Daet",
    barangay: "",
    sitio: "",
    houseStructure: "Concrete",
    houseOwnership: "Owned",
    waterSource: "Faucet",
    toiletFacility: "Water-sealed",
    electricitySource: "CANORECO",
    cookingFacility: "Gas",
    hazardVulnerability: [],
    brgyHotline: "",
    bpsoHotline: "",
    bhwHotline: "",
    otherHotline: ""
  },
  members: [],
  relatives: [],
  roles: [],
  schedule: {
    date: "",
    day: "Sabado (Saturday)",
    time: "4:00 PM",
    frequency: ""
  },
  evacuation: {
    meetingPlace1: "",
    meetingPlace2: "",
    evacCenter1: "",
    evacCenter2: "",
    evacCenter3: "",
    evacCenter4: "",
    houseLayoutNotes: "",
    barangayMapNotes: ""
  },
  checklist: {
    documentsCash: {
      emergencyMoney: false,
      govIds: false,
      importantDocs: false,
      familyPhotos: false,
      notebookPencil: false
    },
    toiletries: {
      covidKit: false,
      soapToothbrush: false,
      clothes: false,
      mosquitoRepellant: false,
      menstrualPads: false,
      babyDiapers: false,
      wetWipesTissue: false,
      blanketRaincoat: false
    },
    foodMeds: {
      drinkingWater: false,
      readyToEatFood: false,
      firstAidMeds: false,
      babyMeds: false,
      canOpenerUtensils: false,
      maintenanceMeds: false
    },
    tools: {
      flashlight: false,
      powerbank: false,
      whistle: false,
      candleMatches: false,
      ropeRaincoat: false,
      radioBlanket: false,
      multiToolKnife: false,
      extraBatteries: false,
      comfortToy: false
    },
    eBalde: {
      waterFood3Days: false,
      medicalSupplies: false,
      clothingGear: false,
      gadgetsInfo: false,
      importantDocsWaterproof: false,
      otherTools: false
    }
  }
};