import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma, withDbFallback } from "../../../lib/db";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("britha-admin")?.value === "authenticated";
  if (!isAuthenticated) redirect("/admin/login");

  const [journalCount, novelCount, photoCount, settings] = await Promise.all([
    withDbFallback(() => prisma.journal.count(), 0),
    withDbFallback(() => prisma.novel.count(), 0),
    withDbFallback(() => prisma.photo.count(), 0),
    withDbFallback(() => prisma.settings.findFirst(), null),
  ]);

  return (
    <div className="min-h-screen bg-[#06070a] p-6 text-stone-200 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-stone-500">Britha CMS</p>
              <h1 className="mt-2 font-serif text-3xl text-stone-100">Dashboard overview</h1>
            </div>
            <Link href="/" className="text-sm uppercase tracking-[0.3em] text-stone-500 transition hover:text-stone-100">View site</Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              { label: "Journals", value: journalCount },
              { label: "Novels", value: novelCount },
              { label: "Photos", value: photoCount },
              { label: "Site", value: settings?.siteName ?? "Britha" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-sm text-stone-500">{item.label}</p>
                <p className="mt-2 font-serif text-2xl text-stone-100">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8 backdrop-blur-xl">
            <h2 className="font-serif text-2xl text-stone-100">Content management</h2>
            <div className="mt-6 space-y-3">
              <Link href="/admin/journals" className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">Journal composer</Link>
              <Link href="/admin/novels" className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">Novel & chapters</Link>
              <Link href="/admin/photos" className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">Photo library</Link>
              <Link href="/admin/settings" className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">Site settings</Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <h2 className="font-serif text-2xl text-stone-100">Quick create</h2>
            <p className="mt-3 text-stone-400">Manage the atmosphere of the universe from one calm control surface.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
