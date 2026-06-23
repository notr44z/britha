import Link from "next/link";
import { LayoutShell } from "../../components/layout-shell";
import { prisma, withDbFallback } from "../../lib/db";

export default async function ArchivePage() {
  const journals = await withDbFallback(() => prisma.journal.findMany({ where: { status: "PUBLISHED" }, orderBy: { createdAt: "desc" } }), 
  [{
  id: "1",
  status: "PUBLISHED",
  title: "First Light",
  slug: "first-light",
  content: "An opening note from the archive.",
  excerpt: "An opening note from the archive.",
  mood: "quiet",
  tags: ["memory"],
  coverImage: null,
  createdAt: new Date()
  }]);
  return (
    <LayoutShell>
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-stone-500">The Archive</p>
          <h1 className="mt-4 font-serif text-4xl text-stone-100 sm:text-5xl">A living journal system.</h1>
          <p className="mt-4 text-lg text-stone-400">Reflections arranged by mood, searched by memory, and read as intimate essays.</p>
        </div>
        <div className="mt-10 grid gap-6">
          {journals.map((journal) => (
            <Link key={journal.id} href={`/archive/${journal.slug}`} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition hover:bg-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm uppercase tracking-[0.35em] text-stone-500">{journal.mood}</p>
                <p className="text-sm text-stone-500">{new Date(journal.createdAt).toLocaleDateString()}</p>
              </div>
              <h2 className="mt-4 font-serif text-3xl text-stone-100">{journal.title}</h2>
              <p className="mt-3 max-w-3xl text-stone-400">{journal.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {journal.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-stone-500">{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </LayoutShell>
  );
}
