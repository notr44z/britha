import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma, withDbFallback } from "../../../lib/db";
import { createPhoto } from "../../../lib/actions";

export default async function AdminPhotosPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("britha-admin")?.value === "authenticated";
  if (!isAuthenticated) redirect("/admin/login");

  const photos = await withDbFallback(() => prisma.photo.findMany({ orderBy: { id: "asc" } }), []);

  return (
    <div className="min-h-screen bg-[#06070a] p-6 text-stone-200 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="font-serif text-3xl text-stone-100">Photo library</h1>
        <form action={createPhoto} className="mt-8 grid gap-4">
          <input name="url" placeholder="Image URL" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <input name="caption" placeholder="Caption" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <input type="file" name="file" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <label className="flex items-center gap-3 text-sm text-stone-400">
            <input name="featured" type="checkbox" className="h-4 w-4" />
            Featured on the home portal
          </label>
          <button type="submit" className="w-fit rounded-2xl bg-stone-100 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-stone-900">Upload</button>
        </form>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {photos.map((photo) => (
            <div key={photo.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <div className="h-40 rounded-[1.2rem] bg-gradient-to-br from-stone-800 to-stone-950" />
              <p className="mt-3 text-sm text-stone-400">{photo.caption || "No caption"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
