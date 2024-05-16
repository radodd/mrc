import db from "@/app/db/db";

export const POST = async () => {
  const products = await db.product.findMany({
    take: 12,
    vector: [0, 0, 0] as never,
    // include: {metadata: true},
  });
  return new Response(JSON.stringify(products));
};
