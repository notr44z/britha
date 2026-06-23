import Link from "next/link";
import { prisma, withDbFallback } from "../lib/db";
import { LayoutShell } from "../components/layout-shell";

export default async function HomePage() {
  const fallbackJournals = [{ id: "1", title: "First Light", slug: "first-light", excerpt: "An opening note from the archive.", mood: "quiet", tags: ["memory"] }];
  const fallbackNovels = [{ id: "1", title: "The House of Glass", description: "A nocturnal tale of rooms, memory, and thresholds." }];
  const fallbackPhotos = [{ id: "1", caption: "A suspended memory" }];

  const [journals, novels, photos, settings] = await Promise.all([
    withDbFallback(() => prisma.journal.findMany({ take: 3, orderBy: { createdAt: "desc" } }), fallbackJournals),
    withDbFallback(() => prisma.novel.findMany({ take: 2, orderBy: { id: "asc" } }), fallbackNovels),
    withDbFallback(() => prisma.photo.findMany({ take: 3, orderBy: { id: "asc" } }), fallbackPhotos),
    withDbFallback(() => prisma.settings.findFirst(), null),
  ]);

  return (
    <LayoutShell>
      <section className="relative isolate overflow-hidden px-6 py-20 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(180,150,95,0.18),_transparent_40%)]" />
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <h1 className="font-serif text-5xl tracking-[0.55em] text-stone-100 sm:text-7xl">
            BRITHA
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-stone-400">
            {settings?.heroText ?? "a personal digital universe"}
          </p>
          <div className="mt-12 grid w-full gap-6 md:grid-cols-3">
            {[
              { title: "The Self", href: "/self", description: "identity, memory, atmosphere" },
              { title: "The Archive", href: "/archive", description: "journals, reflections, musing" },
              { title: "The Fiction House", href: "/fiction", description: "novels, stories, chapters" },
            ].map((realm, index) => (
              <div key={realm.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-[0_20px_80px_rgba(0,0,0,0.2)] backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:scale-[1.02]">
                <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Realm {index + 1}</p>
                <Link href={realm.href} className="mt-4 block font-serif text-2xl text-stone-100">{realm.title}</Link>
                <p className="mt-3 text-sm text-stone-400">{realm.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Featured arrival</p>
            <div className="mt-4 space-y-4">
              {journals[0] ? (
                <Link href={`/archive/${journals[0].slug}`} className="block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <p className="text-sm text-stone-500">Latest journal</p>
                  <h2 className="mt-2 font-serif text-2xl text-stone-100">{journals[0].title}</h2>
                  <p className="mt-2 text-sm text-stone-400">{journals[0].excerpt}</p>
                </Link>
              ) : null}
              {novels[0] ? (
                <Link href={`/fiction`} className="block rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                  <p className="text-sm text-stone-500">Newest fiction</p>
                  <h2 className="mt-2 font-serif text-2xl text-stone-100">{novels[0].title}</h2>
                  <p className="mt-2 text-sm text-stone-400">{novels[0].description}</p>
                </Link>
              ) : null}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Quiet Gallery</p>
            <div className="mt-4 grid gap-3">
              {photos.map((photo) => (
                <div key={photo.id} className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-stone-400">
                  {photo.caption || "A suspended memory"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LayoutShell>
  );
}
