"use client";
import { useEffect, useState } from "react";

export default function GenerarQR({ params }) {
  const { id } = params;
  const [qr, setQr] = useState(null);

  useEffect(() => {
    async function fetchQR() {
      const res = await fetch(`/api/qr?id=${id}`);
      const data = await res.json();
      setQr(data.qr);
    }
    fetchQR();
  }, [id]);

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-xl font-bold mb-4">Código QR de la persona</h1>
      {qr ? (
        <img
          src={qr}
          alt="Código QR"
          className="w-60 h-60"
        />
      ) : (
        <p>Generando QR...</p>
      )}
    </div>
  );
}
