import NavigationApp from "@/components/layout/NavigationApp";
import FooterApp from "@/components/layout/FooterApp";

export default function CommandCenterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationApp />
      <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10">{children}</main>
      <FooterApp />
    </>
  );
}
