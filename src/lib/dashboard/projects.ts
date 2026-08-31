export interface ProjectConfig {
  key: string;
  name: string;
  vercelProjectId?: string;
  render?: { url: string; healthPath: string };
  db?: { kind: "mongo"; dbName: string } | { kind: "supabase"; ref: string };
}

export const VERCEL_TEAM_ID = "team_dZVFQQ4xzX6LvNm18nhjW824";

export const PROJECTS: ProjectConfig[] = [
  {
    key: "spjrsd",
    name: "SPJRSD",
    vercelProjectId: "prj_X5Pq0SLV1Ndq4VjuDKh6nXJWEtrB",
    render: {
      url: "https://spjrsd-backend.onrender.com",
      healthPath: "/api/health",
    },
    db: { kind: "mongo", dbName: "spjrsd" },
  },
  {
    key: "sohum-website",
    name: "SoHum Website",
    vercelProjectId: "prj_aIxpRGm2sBJe9A9n7M36zUeziUAZ",
  },
  {
    key: "gativani",
    name: "Gativani",
    vercelProjectId: "prj_OVe7Rumqf36AntBAxHZSrUl6X6vB",
    db: { kind: "supabase", ref: "jjoxowdvzmlchtfarpbs" },
  },
  {
    key: "chanttracker",
    name: "ChantTracker",
    vercelProjectId: "prj_Nl9HglfZYq42S4g8B2lhlJiD6138",
    db: { kind: "supabase", ref: "neqnfukluaxwgtjjgrfu" },
  },
  {
    key: "peetham_web",
    name: "Peetham Web",
    vercelProjectId: "prj_oiRer3efE9toVlpqW91Xq4aZAikK",
    render: {
      url: "https://peetham-auth-backend.onrender.com",
      healthPath: "/",
    },
  },
];
