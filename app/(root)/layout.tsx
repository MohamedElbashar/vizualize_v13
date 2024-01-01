import NavBarServer from "./_components/_navBar/navBar-server";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      <NavBarServer />
      <main className="h-full pt-40">{children}</main>
    </div>
  );
}
