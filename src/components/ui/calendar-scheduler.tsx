"use client";

import * as React from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CalendarSchedulerProps {
  timeSlots?: string[];
  onConfirm?: (value: { date?: Date; time?: string }) => void;
}

function CalendarScheduler({
  timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
  ],
  onConfirm,
}: CalendarSchedulerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [time, setTime] = React.useState<string | undefined>();

  return (
    <div>
      <Card className="w-full border-[rgba(255,255,255,0.18)] bg-black shadow-none">
        <CardHeader>
          <CardTitle className="text-base text-white">Feature Deadline</CardTitle>
          <p className="text-sm text-[#C7CCD6]">
            {date ? `Selected: ${format(date, "PPP")}` : "Select a date"}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1 rounded-md border border-[rgba(255,255,255,0.18)] p-2">
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md" />
          </div>

          <div className="max-h-[320px] flex-1 overflow-y-auto rounded-md border border-[rgba(255,255,255,0.18)] p-2">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Pick a time (optional)</p>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <Button
                  key={slot}
                  variant={time === slot ? "default" : "outline"}
                  size="sm"
                  className={cn("w-full", time === slot && "ring-2 ring-primary")}
                  onClick={() => setTime(slot)}
                  type="button"
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              setDate(undefined);
              setTime(undefined);
            }}
          >
            Reset
          </Button>
          <Button size="sm" type="button" onClick={() => onConfirm?.({ date, time })} disabled={!date}>
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export { CalendarScheduler };
