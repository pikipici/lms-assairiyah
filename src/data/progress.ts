import { ZodCategoryType } from "@/types/item-type";

export const courselists: { value: ZodCategoryType; label: string }[] = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "watching",
    label: "Watching",
  },
  {
    value: "finished",
    label: "Finished",
  },
];
