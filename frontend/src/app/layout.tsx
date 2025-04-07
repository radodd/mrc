import type { Metadata } from "next";
import { Inter, Open_Sans, Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";

import { Providers } from "../components/Providers";
import { Toaster } from "../components/ui/toaster";
import { FilterProvider } from "../context/FilterContext";
import { CartProvider } from "../context/CartContext";
import Footer from "../components/Footer";
import LocalBusinessSchema from "@/components/SEO/LocalBusinessSchema";
import OrganizationSchema from "@/components/SEO/OrganizationSchema";
import WebsiteSchema from "@/components/SEO/WebsiteSchema";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-openSans" });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});
const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: "400",
});

export const metadata: Metadata = {
  title: "MRC Rock & Sand | SPM Santa Paula Materials | Stone Suppliers",
  description:
    "Premium natural stone, aggregates, and recycled materials from MRC Rock & Sand and SPM Santa Paula Materials. Serving all your construction and landscaping needs.",
  alternates: {
    canonical: "https://www.stonesuppliers.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* LocalBusiness */}
        <LocalBusinessSchema />
        {/* Organization */}
        <OrganizationSchema />
        {/* WebSite */}
        <WebsiteSchema />
      </head>

      <body
        className={cn(
          "bg-whitebase min-h-screen  antialiased",
          inter.variable,
          openSans.variable,
          montserrat.variable,
          roboto.variable,
        )}
      >
        <div className="flex-grow min-h-screen">
          <Providers>
            <FilterProvider>
              <CartProvider>{children}</CartProvider>
            </FilterProvider>
          </Providers>
        </div>
        <Toaster />
        <Footer />
      </body>
      {/* </div> */}
    </html>
  );
}
