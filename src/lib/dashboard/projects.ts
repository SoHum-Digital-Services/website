export interface ProjectConfig {
  key: string;
  name: string;
  /**
   * Identity colour for this project. Assigned in fixed order and never
   * cycled or reused, so a project keeps its colour as the list grows.
   * Deliberately distinct from the status palette — state is always carried
   * by a dot + label, never by these.
   */
  pigment: string;
  vercelProjectId?: string;
  vercelProjectName?: string;
  render?: { url: string; healthPath: string; serviceName: string };
  db?:
    | { kind: "mongo"; dbName: string; clusterName: string }
    | { kind: "supabase"; ref: string; projectName: string };
}

export const VERCEL_TEAM_ID = "team_dZVFQQ4xzX6LvNm18nhjW824";
const VERCEL_TEAM_SLUG = "siddhartha-sharmas-projects-b26f94ec";

export function vercelDashboardUrl(vercelProjectName: string): string {
  return `https://vercel.com/${VERCEL_TEAM_SLUG}/${vercelProjectName}`;
}

export function supabaseDashboardUrl(ref: string): string {
  return `https://supabase.com/dashboard/project/${ref}`;
}

export const PROJECTS: ProjectConfig[] = [
  {
    key: "spjrsd",
    pigment: "#ff5c3d",
    name: "SPJRSD",
    vercelProjectId: "prj_X5Pq0SLV1Ndq4VjuDKh6nXJWEtrB",
    vercelProjectName: "spjrs-devastanam-mirror",
    render: {
      url: "https://spjrsd-backend.onrender.com",
      healthPath: "/api/health",
      serviceName: "spjrsd-backend",
    },
    db: { kind: "mongo", dbName: "spjrsd", clusterName: "sohum-cluster" },
  },
  {
    key: "sohum-website",
    pigment: "#f0a202",
    name: "SoHum Website",
    vercelProjectId: "prj_aIxpRGm2sBJe9A9n7M36zUeziUAZ",
    vercelProjectName: "sohum-website",
  },
  {
    key: "gativani",
    pigment: "#19b39b",
    name: "Gativani",
    vercelProjectId: "prj_OVe7Rumqf36AntBAxHZSrUl6X6vB",
    vercelProjectName: "gativani",
    db: { kind: "supabase", ref: "jjoxowdvzmlchtfarpbs", projectName: "gativani" },
  },
  {
    key: "chanttracker",
    pigment: "#f0518f",
    name: "ChantTracker",
    vercelProjectId: "prj_Nl9HglfZYq42S4g8B2lhlJiD6138",
    vercelProjectName: "chanttracker",
    db: { kind: "supabase", ref: "neqnfukluaxwgtjjgrfu", projectName: "chanttracker" },
  },
  {
    key: "peetham_web",
    pigment: "#7b8cff",
    name: "Peetham Web",
    vercelProjectId: "prj_oiRer3efE9toVlpqW91Xq4aZAikK",
    vercelProjectName: "peetham_web",
    render: {
      url: "https://peetham-auth-backend.onrender.com",
      healthPath: "/",
      serviceName: "peetham-auth-backend",
    },
  },
];
