"use client";

import * as React from "react";
import Link from "next/link";

export interface Feature {
  id: number | string;
  name: string;
  completed: boolean;
  updatedAt: string;
  deadline: string;
  href?: string;
}

export interface TaskListProps {
  title?: string;
  features: Feature[];
}

const CompletedBadge = ({ completed }: { completed: boolean }) => {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        completed
          ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400"
          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400"
      }`}
    >
      {completed ? "Completed" : "In Progress"}
    </span>
  );
};

export const TaskList = ({ title = "Feature List", features }: TaskListProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="mb-4 text-lg font-semibold">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="w-12 p-4 font-medium text-muted-foreground">
                No
              </th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">
                Name
              </th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">
                Completed
              </th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">
                Updated At
              </th>
              <th
                scope="col"
                className="p-4 text-right font-medium text-muted-foreground"
              >
                Deadline
              </th>
            </tr>
          </thead>

          <tbody>
            {features.map((feature, index) => (
              <tr
                key={feature.id}
                className="border-b border-border last:border-none hover:bg-muted/50"
              >
                <td className="p-4 text-muted-foreground">{index + 1}</td>
                <td className="p-4 font-medium">
                  {feature.href ? (
                    <Link
                      href={feature.href}
                      className="underline-offset-4 hover:underline hover:text-cyan-400 transition-colors"
                    >
                      {feature.name}
                    </Link>
                  ) : (
                    feature.name
                  )}
                </td>
                <td className="p-4">
                  <CompletedBadge completed={feature.completed} />
                </td>
                <td className="p-4 text-muted-foreground">{feature.updatedAt}</td>
                <td className="p-4 text-right text-muted-foreground">
                  {feature.deadline}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
