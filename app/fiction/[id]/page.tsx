import { notFound } from "next/navigation";
import { LayoutShell } from "../../../components/layout-shell";
import { prisma, withDbFallback } from "../../../lib/db";

export default async function FictionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const novel = await withDbFallback(() => prisma.novel.findUnique({ where: { id }, include: { chapters: true } }), null);

  if (!novel) notFound();

  return (
    <LayoutShell>
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Novel</p>
          <h1 className="mt-4 font-serif text-4xl text-stone-100 sm:text-5xl">{novel.title}</h1>
          <p className="mt-4 max-w-3xl text-stone-400">{novel.description}</p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-black/30 p-6 backdrop-blur-xl">
            <h2 className="font-serif text-2xl text-stone-100">Contents</h2>
            <div className="mt-4 space-y-3">
              {novel.chapters.map((chapter) => (
                <div key={chapter.id} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-stone-400">
                  Chapter {chapter.chapterNumber}: {chapter.title}
                </div>
              ))}
            </div>
          </aside>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="font-serif text-3xl text-stone-100">First chapter</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-stone-300">{novel.chapters[0]?.content || "No chapter yet."}</p>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
