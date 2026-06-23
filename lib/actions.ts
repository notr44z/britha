"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "./db";

export async function createJournal(formData: FormData) {
  const title = formData.get("title")?.toString() || "Untitled";
  const slug = formData.get("slug")?.toString() || title.toLowerCase().replace(/\s+/g, "-");
  const content = formData.get("content")?.toString() || "";
  const excerpt = formData.get("excerpt")?.toString() || content.slice(0, 140);
  const mood = formData.get("mood")?.toString() || "quiet";
  const tags = (formData.get("tags")?.toString() || "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  await prisma.journal.create({
    data: { title, slug, content, excerpt, mood, tags, status: "PUBLISHED" },
  });

  revalidatePath("/archive");
  revalidatePath("/admin/journals");
}

export async function createNovel(formData: FormData) {
  const title = formData.get("title")?.toString() || "Untitled novel";
  const description = formData.get("description")?.toString() || "";

  await prisma.novel.create({
    data: { title, description, status: "DRAFT" },
  });

  revalidatePath("/fiction");
  revalidatePath("/admin/novels");
}

export async function createChapter(formData: FormData) {
  const novelId = formData.get("novelId")?.toString() || "";
  const title = formData.get("title")?.toString() || "Untitled chapter";
  const content = formData.get("content")?.toString() || "";
  const chapterNumber = Number(formData.get("chapterNumber") || 1);

  await prisma.chapter.create({
    data: { novelId, title, content, chapterNumber },
  });

  revalidatePath("/fiction");
  revalidatePath("/admin/novels");
}

export async function createPhoto(formData: FormData) {
  const url = formData.get("url")?.toString() || "";
  const caption = formData.get("caption")?.toString() || "";
  const featured = formData.get("featured") === "on";

  await prisma.photo.create({
    data: { url, caption, featured },
  });

  revalidatePath("/self");
  revalidatePath("/admin/photos");
}

export async function updateSettings(formData: FormData) {
  const siteName = formData.get("siteName")?.toString() || "Britha";
  const heroText = formData.get("heroText")?.toString() || "a personal digital universe";

  const settings = await prisma.settings.findFirst();
  if (settings) {
    await prisma.settings.update({
      where: { id: settings.id },
      data: { siteName, heroText },
    });
  } else {
    await prisma.settings.create({ data: { siteName, heroText } });
  }

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
