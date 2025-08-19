// app/persona/[id]/page.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function PersonaPage({ params }) {
  const id = params.id;

  // Construir query que soporte _id como ObjectId o como string
  const query = ObjectId.isValid(id) ? { _id: new ObjectId(id) } : { _id: id };

  try {
    const client = await clientPromise; // clientPromise devuelve el MongoClient conectado
    const db = client.db(process.env.MONGODB_DB ?? "personasdb");
    const persona = await db.collection("personas").findOne(query);

    if (!persona) {
      return <p className="text-red-500">Persona no encontrada</p>;
    }

    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold">{persona.nombre}</h1>
        <p>🩸 Tipo de sangre: {persona.tipo_sangre}</p>
        <p>📞 Contacto tutor: {persona.contacto_tutor}</p>
      </div>
    );
  } catch (err) {
    console.error("Error al obtener persona:", err);
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">
          Ocurrió un error al cargar la persona. Revisa logs.
        </p>
      </div>
    );
  }
}
