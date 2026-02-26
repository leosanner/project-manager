import { TaskList, Task } from "@/components/ui/task-list";

const Demo = () => {
  const sampleTasks: Task[] = [
    {
      id: 1,
      task: "Schedule initial client meeting",
      category: "Discovery",
      status: "Completed",
      dueDate: "June 3, 2025",
    },
    {
      id: 2,
      task: "Gather business goals and user needs",
      category: "Discovery",
      status: "Completed",
      dueDate: "June 4, 2025",
    },
    {
      id: 3,
      task: "Review current website performance",
      category: "Discovery",
      status: "In Progress",
      dueDate: "June 5, 2025",
    },
    {
      id: 4,
      task: "Create wireframes for key pages",
      category: "Design",
      status: "Pending",
      dueDate: "June 10, 2025",
    },
    {
      id: 5,
      task: "Develop high-fidelity mockups",
      category: "Design",
      status: "Pending",
      dueDate: "June 15, 2025",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4 md:p-8">
      <TaskList tasks={sampleTasks} />
    </div>
  );
};

export default Demo;
