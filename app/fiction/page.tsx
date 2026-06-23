import { LayoutShell } from "../../components/layout-shell";
import { prisma, withDbFallback } from "../../lib/db";

export default async function FictionPage() {
  const novels = await withDbFallback(() => prisma.novel.findMany({ where: { status: "DRAFT" }, include: { chapters: true }, orderBy: { id: "asc" } }), []);

  return (
    <LayoutShell>
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-stone-500">The Fiction House</p>
          <h1 className="mt-4 font-serif text-4xl text-stone-100 sm:text-5xl">Stories gathered in chapters.</h1>
          <p className="mt-4 text-lg text-stone-400">A book-like reading experience with soft navigation and quiet immersion.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {novels.map((novel) => (
            <div key={novel.id} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="h-48 rounded-[1.5rem] bg-gradient-to-br from-stone-800 to-stone-950" />
              <h2 className="mt-6 font-serif text-3xl text-stone-100">{novel.title}</h2>
              <p className="mt-3 text-stone-400">{novel.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {novel.chapters.map((chapter) => (
                  <span key={chapter.id} className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-stone-500">Ch. {chapter.chapterNumber}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </LayoutShell>
  );
}
