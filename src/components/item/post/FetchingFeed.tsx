import { EmptyPlaceholder } from "@/components/item/empty-placeholder";

const FetchingFeed = () => {
  return (
    <div className="flex flex-col col-span-2 space-y-6">
      <EmptyPlaceholder>
        <EmptyPlaceholder.Loading />
        <EmptyPlaceholder.Title>Loading Data</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          Mohon Tunggu Data Kamu Sedang Diambil.
        </EmptyPlaceholder.Description>
        {/* <PostCreateButton variant="outline" /> */}
      </EmptyPlaceholder>
    </div>
  );
};

export default FetchingFeed;
