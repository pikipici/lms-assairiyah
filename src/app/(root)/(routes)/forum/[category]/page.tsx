import Link from "next/link";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { Shell } from "@/components/item/Shell";
import { buttonVariants } from "@/components/ui/button";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { categories } from "@/data/community";
import CommunityClient from "@/components/item/forum/CommunityClient";

interface CommunityCategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = ["umum", "kelas", "ekstrakulikuler"];

  return categories.map((category) => ({
    category,
  }));
}

const CommunityCategoryPage = async ({
  params,
}: CommunityCategoryPageProps) => {
  const { category } = params;
  const formattedCategory = category[0].toUpperCase() + category.slice(1);

  const categoryValidation = categories.find(
    (category) => category.label === formattedCategory
  );

  if (!categoryValidation) {
    notFound();
  }

  const initialCommunities = await db.subreddit.findMany({
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    include: {
      posts: true,
      Creator: true,
    },
    where: {
      category: formattedCategory,
    },
  });

  return (
    <Shell layout="dashboard" className="px-1">
      <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
        Forum {formattedCategory}
      </h1>
      <Link href="/forum/create" className={cn(buttonVariants(), "w-fit")}>
        Buat Forum
      </Link>
      <CommunityClient
        initialCommunities={initialCommunities}
        category={formattedCategory}
      />
    </Shell>
  );
};

export default CommunityCategoryPage;
