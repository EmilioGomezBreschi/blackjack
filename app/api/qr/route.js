import QRCode from "qrcode";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ error: "Falta el id" }), {
      status: 400,
    });
  }

  const url = `https://blackjack-nine-indol.vercel.app/persona/${id}`;
  const qr = await QRCode.toDataURL(url);

  return new Response(JSON.stringify({ qr }), {
    headers: { "Content-Type": "application/json" },
  });
}
