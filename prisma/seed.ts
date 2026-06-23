import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.settings.create({
    data: {
      siteName: "Britha",
      heroText: "a personal digital universe",
    },
  });

  await prisma.journal.create({
    data: {
      title: "First Light",
      slug: "first-light",
      excerpt: "An opening note from the archive.",
      content: "The room was quiet. The air held a soft amber glow. This is the beginning of the archive.",
      mood: "quiet",
      tags: ["memory", "beginning"],
      status: "PUBLISHED",
    },
  });

  await prisma.novel.create({
    data: {
      title: "The House of Glass",
      description: "A nocturnal tale of rooms, memory, and thresholds.",
      status: "DRAFT",
      chapters: {
        create: [
          {
            title: "The Threshold",
            content: "The first chapter opens in a house made of mirrors and rain.",
            chapterNumber: 1,
          },
        ],
      },
    },
  });

  await prisma.photo.create({
    data: {
      url: "/placeholder.jpg",
      caption: "A suspended memory",
      featured: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
