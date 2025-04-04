import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ABOUT | stonesuppliers.net",
  description: "This is a test",
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
