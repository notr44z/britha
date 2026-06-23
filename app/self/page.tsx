import Link from "next/link";
import { LayoutShell } from "../../components/layout-shell";
import { prisma, withDbFallback } from "../../lib/db";

export default async function SelfPage() {
  const photos = await withDbFallback(() => prisma.photo.findMany({ take: 4, orderBy: { id: "asc" } }), [
  {
    id: "1",
    url: "/images/placeholder.jpg",
    caption: "A suspended memory",
    featured: false,
    albumId: null,
  },
]);
  return (
    <LayoutShell>
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-stone-500">The Self</p>
          <h1 className="mt-4 font-serif text-4xl text-stone-100 sm:text-5xl">A quiet identity space.</h1>
          <p className="mt-4 text-lg text-stone-400">Soft portraits, remembered objects, and a philosophy of living in fragments.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="font-serif text-2xl text-stone-100">About</h2>
            <p className="mt-4 text-stone-400">Britha is a living interior, held together by memory, language, and atmosphere.</p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8 backdrop-blur-xl">
            <h2 className="font-serif text-2xl text-stone-100">Identity philosophy</h2>
            <p className="mt-4 text-stone-400">Nothing is forced. Everything arrives slowly, like fog over a lake.</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {photos.map((photo) => (
            <div key={photo.id} className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
              <div className="h-48 rounded-[1.2rem] bg-gradient-to-br from-stone-700 to-stone-950" />
              <p className="mt-3 text-sm text-stone-400">{photo.caption || "A quiet moment"}</p>
            </div>
          ))}
        </div>
        <Link href="/admin/dashboard" className="text-sm uppercase tracking-[0.3em] text-stone-500 transition hover:text-stone-100">Enter the inner chamber</Link>
      </section>
    </LayoutShell>
  );
}
