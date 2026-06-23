import { notFound } from "next/navigation";
import { LayoutShell } from "../../../components/layout-shell";
import { prisma, withDbFallback } from "../../../lib/db";

export default async function JournalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journal = await withDbFallback(() => prisma.journal.findUnique({ where: { slug } }), null);

  if (!journal) notFound();

  return (
    <LayoutShell>
      <article className="mx-auto flex max-w-3xl flex-col px-6 py-16 lg:px-8">
        <p className="text-sm uppercase tracking-[0.35em] text-stone-500">{journal.mood}</p>
        <h1 className="mt-4 font-serif text-4xl text-stone-100 sm:text-5xl">{journal.title}</h1>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-500">
          {journal.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 px-3 py-1">{tag}</span>
          ))}
        </div>
        <div className="prose prose-invert mt-10 max-w-none text-stone-300">
          <p className="whitespace-pre-line leading-8">{journal.content}</p>
        </div>
      </article>
    </LayoutShell>
  );
}
