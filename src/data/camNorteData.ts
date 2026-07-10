export interface MunicipalityHotline {
  name: string;
  pnp: string;
  bfp: string;
  mdrrmo: string[];
  hazardTypes?: ("Flood" | "Landslide" | "Storm Surge" | "Tsunami")[];
}

export const CAMARINES_NORTE_HOTLINES = {
  links: {
    pagasa: "https://www.pagasa.dost.gov.ph/",
    pdrrmoFB: "https://www.facebook.com/pdrrmocamnorte",
    phivolcs: "https://www.phivolcs.dost.gov.ph/"
  },
  pdrrmo: {
    title: "Provincial Disaster Risk Reduction and Management Office (PDRRMO)",
    address: "2nd Floor Provincial Capitol Building, Daet, Camarines Norte",
    fbPage: "@fb.com/pdrrmocamnorte",
    email: "camarinesnortepdrrmo@gmail.com",
    frequency: "167.325 MHz",
    opcen: "054-216-0328 / 0998-561-5388",
    smart: "0998-561-5388",
    globe: "0917-583-9147",
    pnp: "0998 598 5951",
    bfp: "09088812003"
  },
  utilities: {
    canoreco: "0908-186-5100",
    primeWater: "0998-592-9856",
    waterDistrict: "0999-220-5241",
    bfpProvincial: "0998-540-7523"
  },
  municipalities: [
    {
      name: "Basud",
      pnp: "0998 598 5952",
      bfp: "0998 547 0484",
      mdrrmo: ["0999 336 9991", "0931 918 3286"],
      hazardTypes: ["Flood", "Storm Surge"]
    },
    {
      name: "Capalonga",
      pnp: "0998 598 5953",
      bfp: "0948 653 7647",
      mdrrmo: ["0928 150 4446"],
      hazardTypes: ["Storm Surge", "Tsunami"]
    },
    {
      name: "Daet",
      pnp: "0998 598 5954",
      bfp: "0939 933 7795",
      mdrrmo: ["0912 855 5551"],
      hazardTypes: ["Flood", "Storm Surge"]
    },
    {
      name: "Jose Panganiban",
      pnp: "0998 598 5956",
      bfp: "0920 230 2310",
      mdrrmo: ["0961 716 3626", "0936 825 0417"],
      hazardTypes: ["Storm Surge", "Flood"]
    },
    {
      name: "Labo",
      pnp: "0998 598 5957",
      bfp: "0949 812 3708",
      mdrrmo: ["0927 864 1222", "0963 704 1888"],
      hazardTypes: ["Landslide", "Flood"]
    },
    {
      name: "Mercedes",
      pnp: "0998 598 5958",
      bfp: "0998 547 0478",
      mdrrmo: ["0919 098 3190"],
      hazardTypes: ["Storm Surge", "Tsunami"]
    },
    {
      name: "Paracale",
      pnp: "0998 598 5960",
      bfp: "0948 584 9663",
      mdrrmo: ["0946 998 7576"],
      hazardTypes: ["Landslide", "Storm Surge"]
    },
    {
      name: "San Lorenzo Ruiz",
      pnp: "0998 598 5961",
      bfp: "0938 696 1561",
      mdrrmo: ["0910 102 0528", "0950 356 2460"],
      hazardTypes: ["Landslide", "Flood"]
    },
    {
      name: "San Vicente",
      pnp: "0998 598 5962",
      bfp: "N/A",
      mdrrmo: ["0998 577 3706"],
      hazardTypes: ["Landslide", "Flood"]
    },
    {
      name: "Santa Elena",
      pnp: "0998 598 5963",
      bfp: "0998 547 0470",
      mdrrmo: ["0908 355 7659", "0977 473 0923"],
      hazardTypes: ["Flood", "Storm Surge"]
    },
    {
      name: "Talisay",
      pnp: "0998 598 5964",
      bfp: "0930 466 3555",
      mdrrmo: ["0909 063 5567", "0967 330 3136"],
      hazardTypes: ["Storm Surge", "Flood"]
    },
    {
      name: "Vinzons",
      pnp: "0998 598 5965",
      bfp: "0948 773 3605",
      mdrrmo: ["0951 299 4666", "0929 261 3031"],
      hazardTypes: ["Storm Surge", "Flood"]
    }
  ] as MunicipalityHotline[]
};