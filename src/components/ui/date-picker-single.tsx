"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import id from "date-fns/locale/id";
import moment from "moment";
import "moment/locale/id";

moment.locale("id");

interface DatePickerProps {
  value: Date | undefined;
  setValue: (date: Date | undefined) => void;
}

export function DatePickerSingle({ setValue, value }: DatePickerProps) {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    setValue(date);
  }, [date, setValue]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "max-w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? moment(date).format("LL") : <span>Pilih tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          today={value || new Date()}
          selected={value}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
