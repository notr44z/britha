import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma, withDbFallback } from "../../../lib/db";
import { createNovel, createChapter } from "../../../lib/actions";

export default async function AdminNovelsPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("britha-admin")?.value === "authenticated";
  if (!isAuthenticated) redirect("/admin/login");

  const novels = await withDbFallback(() => prisma.novel.findMany({ include: { chapters: true }, orderBy: { id: "asc" } }), []);

  return (
    <div className="min-h-screen bg-[#06070a] p-6 text-stone-200 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="font-serif text-3xl text-stone-100">Novels & chapters</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form action={createNovel} className="space-y-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
            <h2 className="font-serif text-2xl text-stone-100">Create novel</h2>
            <input name="title" placeholder="Title" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3" />
            <textarea name="description" placeholder="Description" className="min-h-24 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3" />
            <button type="submit" className="rounded-2xl bg-stone-100 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-stone-900">Create</button>
          </form>
          <form action={createChapter} className="space-y-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-6">
            <h2 className="font-serif text-2xl text-stone-100">Add chapter</h2>
            <input name="novelId" placeholder="Novel ID" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3" />
            <input name="title" placeholder="Chapter title" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3" />
            <input name="chapterNumber" type="number" placeholder="Chapter number" className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3" />
            <textarea name="content" placeholder="Chapter content" className="min-h-48 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3" />
            <button type="submit" className="rounded-2xl bg-stone-100 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-stone-900">Add</button>
          </form>
        </div>
        <div className="mt-10 grid gap-4">
          {novels.map((novel) => (
            <div key={novel.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="font-serif text-xl text-stone-100">{novel.title}</p>
              <p className="mt-2 text-sm text-stone-400">{novel.description}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.3em] text-stone-500">ID: {novel.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
