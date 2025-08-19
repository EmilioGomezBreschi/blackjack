import clientPromise from "@/lib/mongodb";

export default async function PersonaPage({ params }) {
  const client = (await clientPromise).db("personasdb");
  const persona = await client
    .collection("personas")
    .findOne({ _id: params.id });

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
}
