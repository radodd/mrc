import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | MRC Rock & Sand & SPM Santa Paula Materials",
  description:
    "Get in touch with MRC Rock & Sand and SPM Santa Paula Materials for pricing, delivery, and material inquiries.",
};

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};

export default layout;
