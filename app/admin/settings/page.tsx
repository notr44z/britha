import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma, withDbFallback } from "../../../lib/db";
import { updateSettings } from "../../../lib/actions";

export default async function AdminSettingsPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("britha-admin")?.value === "authenticated";
  if (!isAuthenticated) redirect("/admin/login");

  const settings = await withDbFallback(() => prisma.settings.findFirst(), null);

  return (
    <div className="min-h-screen bg-[#06070a] p-6 text-stone-200 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <h1 className="font-serif text-3xl text-stone-100">Site settings</h1>
        <form action={updateSettings} className="mt-8 grid gap-4">
          <input defaultValue={settings?.siteName ?? "Britha"} name="siteName" placeholder="Site name" className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <textarea defaultValue={settings?.heroText ?? "a personal digital universe"} name="heroText" placeholder="Hero text" className="min-h-24 rounded-2xl border border-white/10 bg-black/20 px-4 py-3" />
          <button type="submit" className="w-fit rounded-2xl bg-stone-100 px-5 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-stone-900">Save</button>
        </form>
      </div>
    </div>
  );
}
