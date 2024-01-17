"use client";
import dynamic from "next/dynamic";

import { OverviewType } from "@/types/item-type";
import OverviewSkeleton from "./OverviewSkeleton";

const OverviewDisplay = dynamic(() => import("./OverviewDisplayUp"), {
  ssr: false,
  loading: () => <OverviewSkeleton />,
});

const OverviewClient = ({ data }: { data: OverviewType[] }) => {
  return <OverviewDisplay data={data} />;
};

export default OverviewClient;
