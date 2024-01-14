import { EmptyPlaceholder } from "@/components/item/empty-placeholder";

const EmptyFeed = () => {
  return (
    <div className="flex flex-col col-span-2 space-y-6">
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>
          Tidak ada yang bisa ditampilkan
        </EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Kamu belum mengikuti forum manapun. Coba cari forum yang kamu minati.
        </EmptyPlaceholder.Description>
        {/* <PostCreateButton variant="outline" /> */}
      </EmptyPlaceholder>
    </div>
  );
};

export default EmptyFeed;
