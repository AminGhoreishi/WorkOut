import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache =
  global.mongoose || (global.mongoose = { conn: null, promise: null });

export default async function dbConnect() {
  if (cached.conn && cached.conn.connection.readyState === 1) {
    return cached.conn;
  }

  if (
    !cached.promise ||
    (cached.conn &&
      cached.conn.connection.readyState !== 1 &&
      cached.conn.connection.readyState !== 2)
  ) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    mongoose.set("bufferCommands", false);

    cached.promise = mongoose
      .connect(MONGODB_URI as string, opts)
      .then((m) => {
        m.connection.collection("users").dropIndex("email_1").catch(() => {});
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        cached.conn = null;
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    cached.conn = null;
    throw err;
  }

  return cached.conn;
}
