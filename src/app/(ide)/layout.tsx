// Full-screen IDE layout — no nav/footer, takes over the entire viewport
export default function IdeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950 text-white antialiased">
      {children}
    </div>
  );
}
