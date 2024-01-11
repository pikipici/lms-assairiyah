import { DateRange } from "react-day-picker";
import type { Icon } from "lucide-react";

export type OverviewType = {
  title: string;
  category: OverviewCategory;
  count: number;
};

type OverviewCategory = "Post" | "Forum" | "User" | "Kelas" | "Mapel" | "Mapem";

export type dropdownItemType = {
  id: number;
  label: string;
  Icon: Icon;
  href: string;
};

export type SidebarNavType = {
  id: number;
  href: string;
  label: string;
  Icon: Icon;
};

export type navItemType = {
  id: number;
  label: string;
  href: string;
};

export type ComboBoxItemType = {
  value: string;
  label: string;
};

export type DragItemType = {
  id: string;
  name: string;
  description: string;
  startAt: DateRange | undefined;
  setExpiresAt: DateRange | undefined;
};

export type EventType = {
  id: string;
  title: string;
  description: string | null;
  start: any;
  end: any;
  createdAt: any;
  updatedAt: any;
};

export type ZodCategoryType = "pending" | "watching" | "finished";

export type DragCourseType = {
  id: string;
  name: string;
  courseId: string;
  category: ZodCategoryType;
};

export type AddProgressCourseType = {
  id: string;
  name: string;
};