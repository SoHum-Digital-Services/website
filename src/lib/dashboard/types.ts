export type ProviderResult<T> =
  | { status: "ok"; data: T }
  | { status: "unavailable"; reason: string };

export interface VercelInfo {
  deployState: string;
  deployUrl: string;
  createdAt: number;
  commitSha?: string;
  commitMessage?: string;
  gitLinked: boolean;
}

export interface RenderInfo {
  up: boolean;
  detail?: Record<string, unknown>;
}

export interface SupabaseInfo {
  status: string;
  /** Violation reported by the data plane when status is RESTRICTED. */
  restriction?: string;
}

export interface MongoInfo {
  storageBytes: number;
  collections: { name: string; count: number }[];
}

export interface ProjectMetrics {
  vercel?: ProviderResult<VercelInfo>;
  render?: ProviderResult<RenderInfo>;
  db?: ProviderResult<SupabaseInfo | MongoInfo>;
}
