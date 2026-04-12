import NavigationPublic from "@/components/layout/NavigationPublic";
import FooterPublic from "@/components/layout/FooterPublic";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavigationPublic />
      <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10">{children}</main>
      <FooterPublic />
    </>
  );
}
