import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor agrega MONGODB_URI a tu .env.local");
}

if (process.env.NODE_ENV === "development") {
  // Reutilizar conexión en dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Nueva conexión en producción
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
