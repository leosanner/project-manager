"use client";

import * as React from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CalendarSchedulerProps {
  onConfirm?: (value: { date?: Date; time?: string }) => void;
}

function CalendarScheduler({
  onConfirm,
}: CalendarSchedulerProps) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [hour, setHour] = React.useState("12");
  const [minute, setMinute] = React.useState("00");
  const [period, setPeriod] = React.useState<"AM" | "PM">("PM");

  const formattedTime = `${hour}:${minute} ${period}`;

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

          <div className="flex-1 rounded-md border border-[rgba(255,255,255,0.18)] p-3">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Select time</p>
            <div className="grid grid-cols-3 gap-2">
              <select
                aria-label="Hour"
                value={hour}
                onChange={(event) => setHour(event.target.value)}
                className={cn(
                  "h-9 rounded-md border border-[rgba(255,255,255,0.18)] bg-black px-2 text-sm text-white",
                  "focus:outline-none focus:ring-2 focus:ring-primary",
                )}
              >
                {Array.from({ length: 12 }, (_, index) => {
                  const value = String(index + 1).padStart(2, "0");
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              <select
                aria-label="Minute"
                value={minute}
                onChange={(event) => setMinute(event.target.value)}
                className={cn(
                  "h-9 rounded-md border border-[rgba(255,255,255,0.18)] bg-black px-2 text-sm text-white",
                  "focus:outline-none focus:ring-2 focus:ring-primary",
                )}
              >
                {Array.from({ length: 60 }, (_, index) => {
                  const value = String(index).padStart(2, "0");
                  return (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
              <select
                aria-label="Period"
                value={period}
                onChange={(event) => setPeriod(event.target.value as "AM" | "PM")}
                className={cn(
                  "h-9 rounded-md border border-[rgba(255,255,255,0.18)] bg-black px-2 text-sm text-white",
                  "focus:outline-none focus:ring-2 focus:ring-primary",
                )}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <p className="mt-3 text-xs text-[#7E8591]">Selected time: {formattedTime}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            type="button"
            onClick={() => {
              setDate(undefined);
              setHour("12");
              setMinute("00");
              setPeriod("PM");
            }}
          >
            Reset
          </Button>
          <Button
            size="sm"
            type="button"
            onClick={() => onConfirm?.({ date, time: formattedTime })}
            disabled={!date}
          >
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export { CalendarScheduler };
