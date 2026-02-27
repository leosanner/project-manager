"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type TaskStatus = "Completed" | "In Progress" | "Pending";

export interface Task {
  id: number | string;
  task: string;
  category: string;
  status: TaskStatus;
  dueDate: string;
  href?: string;
}

export interface TaskListProps {
  title?: string;
  tasks: Task[];
}

const StatusBadge = ({ status }: { status: TaskStatus }) => {
  const baseClasses = "px-2.5 py-0.5 text-xs font-semibold rounded-full";
  const statusClasses = {
    Completed:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
    "In Progress":
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400",
    Pending: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  };
  return <span className={cn(baseClasses, statusClasses[status])}>{status}</span>;
};

export const TaskList = ({ title = "Task List", tasks }: TaskListProps) => {
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
                Task
              </th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">
                Category
              </th>
              <th scope="col" className="p-4 font-medium text-muted-foreground">
                Status
              </th>
              <th
                scope="col"
                className="p-4 text-right font-medium text-muted-foreground"
              >
                Due Date
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className="border-b border-border last:border-none hover:bg-muted/50"
              >
                <td className="p-4 text-muted-foreground">{index + 1}</td>
                <td className="p-4 font-medium">
                  {task.href ? (
                    <Link
                      href={task.href}
                      className="underline-offset-4 hover:underline hover:text-cyan-400 transition-colors"
                    >
                      {task.task}
                    </Link>
                  ) : (
                    task.task
                  )}
                </td>
                <td className="p-4 text-muted-foreground">{task.category}</td>
                <td className="p-4">
                  <StatusBadge status={task.status} />
                </td>
                <td className="p-4 text-right text-muted-foreground">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
