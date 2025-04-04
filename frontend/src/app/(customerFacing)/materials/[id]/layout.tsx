import { Metadata } from "next";
import ContactUs from "../../../../components/sections/ContactUs";
import { getMaterialById } from "src/lib/getMaterialById";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const material = await getMaterialById(params.id);

  return {
    title: `${material.name} | MRC Rock & Sand`,
    description:
      material.description ||
      "Explore our range of premium materials for your project",
    alternates: {
      canonical: `https://www.stonesuppliers.net/materials/${params.id}`,
    },
  };
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="">{children}</div>
      <ContactUs />
    </>
  );
}
