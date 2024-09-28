import { Footer, FooterLink } from "../../../components/Footer";
import { Nav, NavLink } from "../../../components/Nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="">{children}</div>
    </>
  );
}
