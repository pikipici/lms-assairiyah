"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { cn, formatUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDebounce } from "@/hooks/use-debounce";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Icons } from "@/components/ui/Custom-UI/Icon";

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const router = useRouter();
  const debouncedQuery = useDebounce(query, 300);

  const [data, setData] = useState<{ id: string; name: string }[]>([]);

  const {
    data: queryResults,
    refetch,
    isFetching,
  } = useQuery({
    queryFn: async () => {
      if (!query) return [];

      const trimmedQuery = query.trimEnd();

      const { data } = await axios(`/api/anime/search?q=${trimmedQuery}`);

      return data as { id: string; name: string }[];
    },
    queryKey: ["search-query"],
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((isOpen) => !isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      refetch();
    }
  }, [debouncedQuery, refetch]);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setIsOpen(true)}
      >
        <Icons.search className="h-4 w-4 xl:mr-2" aria-hidden="true" />
        <span className="hidden xl:inline-flex">Cari Forum...</span>
        <span className="sr-only">Cari Forum</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Cari Forum..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isFetching ? "hidden" : "py-6 text-center text-sm")}
          >
            No anime found.
          </CommandEmpty>
          {isFetching ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10 rounded" />
              <Skeleton className="h-8 rounded-sm" />
              <Skeleton className="h-8 rounded-sm" />
            </div>
          ) : (
            data.length > 0 && (
              <CommandGroup heading="Anime">
                {data.map((queryItem) => {
                  const formattedHref = `/anime/${formatUrl(queryItem.name)}`;

                  return (
                    <a href={formattedHref} key={queryItem.id}>
                      <CommandItem
                        className="cursor-pointer"
                        onSelect={() => {
                          setIsOpen(false);
                          setQuery("");
                          router.push(formattedHref);
                        }}
                      >
                        {queryItem.name}
                      </CommandItem>
                    </a>
                  );
                })}
              </CommandGroup>
            )
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Searchbar;
