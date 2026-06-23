import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma, withDbFallback } from "../../../lib/db";
import { createJournal } from "../../../lib/actions";

export default async function AdminJournalsPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("britha-admin")?.value === "authenticated";
  if (!isAuthenticated) redirect("/admin/login");

  const journals = await withDbFallback(() => prisma.journal.findMany({ orderBy: { createdAt: "desc" } }), []);

  return (
    <div className="min-h-screen bg-[#06070a] p-6 text-stone-200 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="font-serif text-3xl text-stone-100">Journal composer</h1>
        <form action={createJournal} className="mt-8 grid gap-4">
          <input name="title" placeholder="Title" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <input name="slug" placeholder="slug" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <input name="mood" placeholder="Mood" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <input name="tags" placeholder="Tags (comma separated)" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <textarea name="excerpt" placeholder="Excerpt" className="min-h-24 rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <textarea name="content" placeholder="Content" className="min-h-56 rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <button type="submit" className="w-fit rounded-2xl bg-stone-100 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-stone-900">Create journal</button>
        </form>
        <div className="mt-10 grid gap-4">
          {journals.map((journal) => (
            <div key={journal.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="font-serif text-xl text-stone-100">{journal.title}</p>
              <p className="mt-2 text-sm text-stone-400">{journal.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
