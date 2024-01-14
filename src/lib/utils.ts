import { Subreddit, Events } from "@prisma/client";
import { ExtendedPost } from "@/types/db";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict, intervalToDuration } from "date-fns";
import locale from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";
moment.locale("id");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const formatDistanceLocale = {
  lessThanXSeconds: "baru saja",
  xSeconds: "baru saja",
  halfAMinute: "baru saja",
  lessThanXMinutes: "{{count}} beberapa menit yang lalu",
  xMinutes: "{{count}} menit yang lalu",
  aboutXHours: "{{count}} beberapa jam yang lalu",
  xHours: "{{count}} jam yang lalu",
  xDays: "{{count}} hari yang lalu",
  aboutXWeeks: "{{count}} minggu yang lalu",
  xWeeks: "{{count}} minggu yang lalu",
  aboutXMonths: "{{count}} bulan yang lalu",
  xMonths: "{{count}} bulan yang lalu",
  aboutXYears: "{{count}} tahun yang lalu",
  xYears: "{{count}} tahun yang lalu",
  overXYears: "{{count}} tahun yang lalu",
  almostXYears: "{{count}} tahun yang lalu",
};

function formatDistance(token: string, count: number, options?: any): string {
  options = options || {};

  const result = formatDistanceLocale[
    token as keyof typeof formatDistanceLocale
  ].replace("{{count}}", count.toString());

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return "in " + result;
    } else {
      if (result === "just now") return result;
      return result;
    }
  }

  return result;
}

export function capitalizeFirstCharacter(text: any) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatDescription(description: string, trim: number) {
  if (description.length > trim) {
    const trimmedDescription = description.slice(0, trim).trimEnd();
    return trimmedDescription + "...";
  }

  return description;
}

export function formatTimeToNow(date: Date): string {
  return formatDistanceToNowStrict(date, {
    addSuffix: true,
    locale: {
      ...locale,
      formatDistance,
    },
  });
}

export function formatCamel(text: string) {
  const arr = text.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  const str2 = arr.join(" ");

  return str2;
}

export function formatMapel(name: string, reverse?: boolean) {
  const Str = name.toUpperCase();

  if (reverse) {
    return decodeURIComponent(Str.split("-").join(" "));
  }

  return Str.split(" ").join("-");
}

export function formatUrl(name: string, reverse?: boolean) {
  if (reverse) {
    return decodeURIComponent(name.split("-").join(" "));
  }

  return name.split(" ").join("-");
}

export function formatTime(createdAt: string) {
  return moment(createdAt).format("LL");
}

export function indoFormatTime(props: Date) {
  return moment(props).format("LL");
}

export function convertToSingleDecimalPlace(
  number: number,
  decimalPlaces: number
) {
  const roundedNumber = number.toFixed(decimalPlaces);
  const singleDecimalPlace = parseFloat(roundedNumber).toFixed(1);

  return parseFloat(singleDecimalPlace);
}

export function formatTimeLeft(expiryDate: Date) {
  const currentDate = new Date();

  const duration = intervalToDuration({ start: currentDate, end: expiryDate });

  if (!duration) return "Expired";

  const years = duration?.years ?? 0;
  const months = duration?.months ?? 0;
  const days = duration?.days ?? 0;
  const hours = duration?.hours ?? 0;
  const minutes = duration?.minutes ?? 0;
  const seconds = duration?.seconds ?? 0;

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""}`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""}`;
  }
}

export interface User {
  createdAt: Date;
  email: string;
  id: string;
  imageUrl: string;
  name: string;
  password: string | null;
  updatedAt: Date;
  tag: string;
  bgImage: string | null;
  about: string;
  posts?: [];
  followers?: [];
  following?: [];
  savedPosts?: [];
  likedPosts?: [];
  chatRooms?: [];
  isVerified: boolean;
}

export interface ForumType {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  imageUrl: string | null;
  bgImg: string | null;
  category: string | null;
  creatorId: string | null;
  posts: ExtendedPost[];
}

export type ExtendedEvent = Events;
