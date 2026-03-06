import { TaskList, type Feature } from "@/components/ui/task-list";

const Demo = () => {
  const sampleFeatures: Feature[] = [
    {
      id: 1,
      name: "Schedule initial client meeting",
      completed: true,
      updatedAt: "June 1, 2025",
      deadline: "June 3, 2025",
    },
    {
      id: 2,
      name: "Gather business goals and user needs",
      completed: true,
      updatedAt: "June 2, 2025",
      deadline: "June 4, 2025",
    },
    {
      id: 3,
      name: "Review current website performance",
      completed: false,
      updatedAt: "June 3, 2025",
      deadline: "June 5, 2025",
    },
    {
      id: 4,
      name: "Create wireframes for key pages",
      completed: false,
      updatedAt: "June 4, 2025",
      deadline: "June 10, 2025",
    },
    {
      id: 5,
      name: "Develop high-fidelity mockups",
      completed: false,
      updatedAt: "June 5, 2025",
      deadline: "June 15, 2025",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-4 md:p-8">
      <TaskList features={sampleFeatures} />
    </div>
  );
};

export default Demo;
