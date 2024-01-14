import AsideMateri from "@/components/item/materi/AsideMateri";
import { db } from "@/lib/db";

export default async function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mapel = await db.mapel.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const tingkat = await db.tingkat.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <>
      <section className="grid grid-cols-12 overflow-hidden h-full">
        <AsideMateri
          optionsMapel={mapel.map((m) => ({
            label: m.name,
            value: m.id,
          }))}
          optionsTingkat={tingkat.map((m) => ({
            label: m.name,
            value: m.id,
          }))}
        />
        <section className="md:col-span-9 lg:col-span-10 col-span-12 overflow-y-auto relative h-[84vh] md:h-auto">
          {children}
        </section>
      </section>
    </>
  );
}
