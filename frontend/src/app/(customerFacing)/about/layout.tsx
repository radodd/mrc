import { Metadata } from "next";

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
      <div className="">{children}</div>
    </>
  );
}
