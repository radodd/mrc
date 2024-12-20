import styles from "../../../components/scss/Container.module.scss";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className={styles.container}>{children}</div>
    </>
  );
}
