import FAQSchema from "@/components/SEO/FAQSchema";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
  title: "About Us | MRC Rock & Sand & SPM Santa Paula Materials",
  description:
    "Learn about MRC Rock & Sand and SPM Santa Paula Materials—Southern California’s trusted providers of premium stone, aggregates, and recycled materials.",
  alternates: {
    canonical: "https://www.stonesuppliers.net/about",
  },
};

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Head>
        <FAQSchema />
      </Head>

      <div className="">{children}</div>
    </>
  );
}
