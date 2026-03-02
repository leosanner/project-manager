"use client";

import * as React from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
  SearchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface Event {
  id: number;
  name: string;
  time: string;
  datetime: string;
  color?: string;
  featureId?: number | string;
  featureName?: string;
}

export interface CalendarData {
  day: Date;
  events: Event[];
}

interface FullScreenCalendarProps {
  data: CalendarData[];
}

type FeatureGroup = {
  id: string;
  name: string;
  color?: string;
  events: Event[];
};

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export function FullScreenCalendar({ data }: FullScreenCalendarProps) {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = React.useState(today);
  const [currentMonth, setCurrentMonth] = React.useState(format(today, "MMM-yyyy"));
  const [expandedFeatureByDay, setExpandedFeatureByDay] = React.useState<
    Record<string, string | null>
  >({});
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function goToToday() {
    setCurrentMonth(format(today, "MMM-yyyy"));
  }

  function groupEventsByFeature(events: Event[]): FeatureGroup[] {
    const grouped = events.reduce<Record<string, FeatureGroup>>((acc, event) => {
      const groupId = String(event.featureId ?? event.id);

      if (!acc[groupId]) {
        acc[groupId] = {
          id: groupId,
          name: event.featureName ?? event.name,
          color: event.color,
          events: [],
        };
      }

      acc[groupId].events.push(event);
      return acc;
    }, {});

    return Object.values(grouped);
  }

  function toggleFeatureEvents(day: Date, featureId: string) {
    const dayKey = format(day, "yyyy-MM-dd");
    setExpandedFeatureByDay((current) => ({
      ...current,
      [dayKey]: current[dayKey] === featureId ? null : featureId,
    }));
  }

  function getDayFeatureGroups(day: Date) {
    const dayData = data.find((eventDate) => isSameDay(eventDate.day, day));
    return dayData ? groupEventsByFeature(dayData.events) : [];
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col space-y-4 p-4 md:flex-row md:items-center md:justify-between md:space-y-0 lg:flex-none">
        <div className="flex flex-auto">
          <div className="flex items-center gap-4">
            <div className="hidden w-20 flex-col items-center justify-center rounded-lg border bg-muted p-0.5 md:flex">
              <h1 className="p-1 text-xs text-muted-foreground uppercase">
                {format(today, "MMM")}
              </h1>
              <div className="flex w-full items-center justify-center rounded-lg border bg-background p-0.5 text-lg font-bold">
                <span>{format(today, "d")}</span>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-foreground">
                {format(firstDayCurrentMonth, "MMMM, yyyy")}
              </h2>
              <p className="text-sm text-muted-foreground">
                {format(firstDayCurrentMonth, "MMM d, yyyy")} -{" "}
                {format(endOfMonth(firstDayCurrentMonth), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <Button variant="outline" size="icon" className="hidden lg:flex">
            <SearchIcon size={16} strokeWidth={2} aria-hidden="true" />
          </Button>

          <Separator orientation="vertical" className="hidden h-6 lg:block" />

          <div className="inline-flex w-full -space-x-px rounded-lg shadow-sm shadow-black/5 md:w-auto rtl:space-x-reverse">
            <Button
              onClick={previousMonth}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Navigate to previous month"
            >
              <ChevronLeftIcon size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
            <Button
              onClick={goToToday}
              className="w-full rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 md:w-auto"
              variant="outline"
            >
              Today
            </Button>
            <Button
              onClick={nextMonth}
              className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Navigate to next month"
            >
              <ChevronRightIcon size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>

          <Separator orientation="vertical" className="hidden h-6 md:block" />
          <Separator orientation="horizontal" className="block w-full md:hidden" />

          <Button className="w-full gap-2 md:w-auto">
            <PlusCircleIcon size={16} strokeWidth={2} aria-hidden="true" />
            <span>New Event</span>
          </Button>
        </div>
      </div>

      <div className="lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 border text-center text-xs leading-6 font-semibold">
          <div className="border-r py-2.5">Sun</div>
          <div className="border-r py-2.5">Mon</div>
          <div className="border-r py-2.5">Tue</div>
          <div className="border-r py-2.5">Wed</div>
          <div className="border-r py-2.5">Thu</div>
          <div className="border-r py-2.5">Fri</div>
          <div className="py-2.5">Sat</div>
        </div>

        <div className="flex text-xs leading-6 lg:flex-auto">
          <div className="hidden w-full border-x lg:grid lg:grid-cols-7 lg:grid-rows-5">
            {days.map((day, dayIdx) => {
              const featureGroups = getDayFeatureGroups(day);
              const dayKey = format(day, "yyyy-MM-dd");
              const expandedFeatureId = expandedFeatureByDay[dayKey];
              const expandedFeature = featureGroups.find(
                (group) => group.id === expandedFeatureId,
              );

              return (
                <div
                  key={dayIdx}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "bg-accent/50 text-muted-foreground",
                    "relative flex flex-col border-r border-b hover:bg-muted focus:z-10",
                    !isEqual(day, selectedDay) && "hover:bg-accent/75",
                  )}
                >
                  <header className="flex items-center justify-between p-2.5">
                    <button
                      type="button"
                      className={cn(
                        isEqual(day, selectedDay) && "text-primary-foreground",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth) &&
                          "text-foreground",
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          "text-muted-foreground",
                        isEqual(day, selectedDay) && isToday(day) && "border-none bg-primary",
                        isEqual(day, selectedDay) && !isToday(day) && "bg-foreground",
                        (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                        "flex h-7 w-7 items-center justify-center rounded-full text-xs hover:border",
                      )}
                    >
                      <time dateTime={format(day, "yyyy-MM-dd")}>{format(day, "d")}</time>
                    </button>
                  </header>
                  <div className="flex-1 space-y-2.5 p-2.5">
                    {featureGroups.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {featureGroups.map((featureGroup) => (
                          <button
                            key={featureGroup.id}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleFeatureEvents(day, featureGroup.id);
                            }}
                            className={cn(
                              "flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/20 transition-transform hover:scale-110",
                              expandedFeatureId === featureGroup.id && "scale-110 border-white/50",
                            )}
                            style={
                              featureGroup.color
                                ? { backgroundColor: featureGroup.color }
                                : undefined
                            }
                            aria-label={`Expandir eventos da feature ${featureGroup.name}`}
                            title={`${featureGroup.name} (${featureGroup.events.length})`}
                          />
                        ))}
                      </div>
                    )}
                    {expandedFeature && (
                      <div
                        className="space-y-1 rounded-lg border bg-muted/50 p-2"
                        style={
                          expandedFeature.color
                            ? {
                                borderColor: expandedFeature.color,
                                backgroundColor: `${expandedFeature.color}1A`,
                              }
                            : undefined
                        }
                      >
                        <p className="truncate text-xs font-semibold">{expandedFeature.name}</p>
                        {expandedFeature.events.map((event) => (
                          <div key={event.id} className="text-xs leading-tight">
                            <p className="truncate font-medium">{event.name}</p>
                            <p className="text-muted-foreground">{event.time}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="isolate grid w-full grid-cols-7 grid-rows-5 border-x lg:hidden">
            {days.map((day, dayIdx) => {
              const featureGroups = getDayFeatureGroups(day);
              const dayKey = format(day, "yyyy-MM-dd");
              const expandedFeatureId = expandedFeatureByDay[dayKey];
              const expandedFeature = featureGroups.find(
                (group) => group.id === expandedFeatureId,
              );

              return (
                <div
                  onClick={() => setSelectedDay(day)}
                  key={dayIdx}
                  className={cn(
                    isEqual(day, selectedDay) && "text-primary-foreground",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      isSameMonth(day, firstDayCurrentMonth) &&
                      "text-foreground",
                    !isEqual(day, selectedDay) &&
                      !isToday(day) &&
                      !isSameMonth(day, firstDayCurrentMonth) &&
                      "text-muted-foreground",
                    (isEqual(day, selectedDay) || isToday(day)) && "font-semibold",
                    "flex min-h-14 flex-col border-r border-b px-3 py-2 hover:bg-muted focus:z-10",
                  )}
                >
                  <time
                    dateTime={format(day, "yyyy-MM-dd")}
                    className={cn(
                      "ml-auto flex size-6 items-center justify-center rounded-full",
                      isEqual(day, selectedDay) &&
                        isToday(day) &&
                        "bg-primary text-primary-foreground",
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        "bg-primary text-primary-foreground",
                    )}
                  >
                    {format(day, "d")}
                  </time>
                  {featureGroups.length > 0 && (
                    <div className="mt-auto space-y-1">
                      <div className="-mx-0.5 flex flex-wrap-reverse gap-1">
                        {featureGroups.map((featureGroup) => (
                          <button
                            key={featureGroup.id}
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleFeatureEvents(day, featureGroup.id);
                            }}
                            className={cn(
                              "h-2.5 w-2.5 rounded-full border border-white/20 transition-transform",
                              expandedFeatureId === featureGroup.id &&
                                "scale-110 border-white/50",
                            )}
                            style={
                              featureGroup.color
                                ? { backgroundColor: featureGroup.color }
                                : undefined
                            }
                            aria-label={`Expandir eventos da feature ${featureGroup.name}`}
                          />
                        ))}
                      </div>
                      {expandedFeature && (
                        <div className="space-y-0.5 rounded border border-white/20 bg-muted/70 p-1">
                          <p className="truncate text-[10px] font-semibold">
                            {expandedFeature.name}
                          </p>
                          {expandedFeature.events.slice(0, 2).map((event) => (
                            <p
                              key={event.id}
                              className="truncate text-[10px] text-muted-foreground"
                            >
                              {event.name}
                            </p>
                          ))}
                          {expandedFeature.events.length > 2 && (
                            <p className="text-[10px] text-muted-foreground">
                              +{expandedFeature.events.length - 2} more
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
