"use client";
import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/hooks/use-debounce";
import { Skeleton } from "../skeleton";
import { AddProgressCourseType } from "@/types/item-type";
import { toast } from "@/hooks/use-toast";

interface CustomCommandProps {
  courseData: AddProgressCourseType[];
  setCourseData: (course: AddProgressCourseType[]) => void;
}

const CustomCommand: FC<CustomCommandProps> = ({
  courseData,
  setCourseData,
}) => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<AddProgressCourseType[]>([]);

  const debouncedQuery = useDebounce(query, 300);

  const {
    data: queryResults,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!query) return [];

      const { data } = await axios(`/api/get/course/search?q=${query}`);

      return data as AddProgressCourseType[];
    },
    queryKey: ["course-progress-search-query"],
    enabled: false, //by default it will not fetch
  });

  useEffect(() => {
    if (!query) {
      setData([]);
      return;
    }

    if (queryResults) {
      setData(queryResults);
    }
  }, [queryResults, query]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      refetch();
    }
  }, [debouncedQuery, refetch]);

  const handleSetCourseData = (queryItem: AddProgressCourseType) => {
    const courseExists = courseData.find(
      (course) => course.id === queryItem.id
    );

    if (courseExists) {
      return toast({
        title: "Error!",
        description: "Anime already exists in the list.",
        variant: "destructive",
      });
    }

    setCourseData([...courseData, queryItem]);
  };

  return (
    <Command>
      <CommandInput
        placeholder="Type a command or search..."
        value={query}
        onValueChange={setQuery}
        autoFocus
      />
      <CommandList>
        {isFetching && (
          <div className="space-y-1 overflow-hidden px-1 py-2">
            <Skeleton className="h-4 w-10 rounded" />
            <Skeleton className="h-8 rounded-sm" />
            <Skeleton className="h-8 rounded-sm" />
          </div>
        )}
        {data.length == 0 && !isFetching && query.length > 0 ? (
          <CommandEmpty>No results found.</CommandEmpty>
        ) : (
          <CommandGroup className="mt-1">
            {data.length > 0 &&
              data.map((queryItem) => {
                return (
                  <CommandItem
                    key={queryItem.id}
                    className="cursor-pointer"
                    onSelect={() => {
                      handleSetCourseData(queryItem);
                      setData([]);
                      setQuery("");
                    }}
                  >
                    {queryItem.name}
                  </CommandItem>
                );
              })}
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
};

export default CustomCommand;
