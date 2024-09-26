import ContactUs from "../../../components/sections/ContactUs";

import styles from "../../../components/scss/Container.module.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.container}>{children}</div>
      <ContactUs renderButton={false} />
    </>
  );
}
