import { MongoClient } from "mongodb";
import type { ProviderResult, MongoInfo } from "@/lib/dashboard/types";

// Cached across requests in the same server process — standard pattern for
// long-lived drivers in a Next.js server runtime.
let clientPromise: Promise<MongoClient> | null = null;

function getClient(uri: string): Promise<MongoClient> {
  if (!clientPromise) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
    clientPromise = client.connect().catch((err) => {
      clientPromise = null; // let the next call retry rather than sticking on a failed connection
      throw err;
    });
  }
  return clientPromise;
}

export async function getMongoStats(dbName: string): Promise<ProviderResult<MongoInfo>> {
  const uri = process.env.MONGODB_URI;
  if (!uri) return { status: "unavailable", reason: "MONGODB_URI not set" };

  try {
    const client = await getClient(uri);
    const db = client.db(dbName);

    const [stats, collectionInfos] = await Promise.all([db.stats(), db.listCollections().toArray()]);

    const collections = await Promise.all(
      collectionInfos.map(async (info) => ({
        name: info.name,
        count: await db.collection(info.name).estimatedDocumentCount(),
      }))
    );

    return { status: "ok", data: { storageBytes: stats.storageSize, collections } };
  } catch (err) {
    return { status: "unavailable", reason: err instanceof Error ? err.message : "Unknown error" };
  }
}
