"use client";
import { FC, useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

import { Events } from "@prisma/client";
import { capitalizeFirstCharacter, formatUrl } from "@/lib/utils";
import { DataTable } from "@/components/ui/Custom-UI/data-table";
import { columns } from "../../admin/Events/Columns";
import { INFINITE_SCROLLING_PAGINATION_EVENTS } from "@/config";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/Custom-UI/Icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventColumn } from "../../admin/Events/Columns";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

interface EventTableProps {
  initiaDataEvent: Events[];
}

const EventTable: FC<EventTableProps> = ({ initiaDataEvent }) => {
  const [EventTable, setEventTable] = useState(initiaDataEvent);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [`event-table-query`],
    async ({ pageParam = 1 }) => {
      const queryUrl = `/api/get/events?limit=${INFINITE_SCROLLING_PAGINATION_EVENTS}&page=${pageParam}`;
      const { data } = await axios(queryUrl);

      return data as Events[];
    },
    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initiaDataEvent], pageParams: [1] },
    }
  );

  let structuredEvent: EventColumn[] = [];

  const nowDate = new Date();

  EventTable.forEach((item, index, array) => {
    if (index === 0) {
      structuredEvent.push({
        id: item.id,
        description: item.description!,
        createdAt: moment(item.createdAt).format("LL"),
        title: item.title,
        start: moment(item.start).format("LL"),
        end: moment(item.end).format("LL"),
        status:
          item.end > nowDate && item.start <= nowDate
            ? "still"
            : item.start > nowDate
            ? "soon"
            : item.end < nowDate
            ? "ended"
            : "done",
      });
    } else {
      structuredEvent.push({
        id: item.id,
        description: item.description!,
        createdAt: moment(item.createdAt).format("LL"),
        title: item.title,
        start: moment(item.start).format("LL"),
        end: moment(item.end).format("LL"),
        status:
          item.end > nowDate && item.start <= nowDate
            ? "still"
            : item.start > nowDate
            ? "soon"
            : item.end < nowDate
            ? "ended"
            : "done",
      });
    }
  });

  useEffect(() => {
    setEventTable(data?.pages.flatMap((page) => page) ?? initiaDataEvent);
  }, [data, initiaDataEvent]);

  return (
    <>
      <ScrollArea className="w-full" orientation="horizontal">
        <div className="w-full">
          <DataTable
            columns={columns}
            data={structuredEvent}
            searchKey="title"
          />
        </div>
      </ScrollArea>
      <div className="w-full flex justify-end -mt-4">
        <Button
          onClick={() => fetchNextPage()}
          size="sm"
          variant="outline"
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage && (
            <Icons.spinner className="h-4 w-4 mr-2 animate-spin" />
          )}
          Show more
        </Button>
      </div>
    </>
  );
};

export default EventTable;
