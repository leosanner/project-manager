type SummUserProjects =
  | {
      projectName: string;
      updatedAt: Date;
      totalTasks: number;
      totalFeatures: number;
    }[]
  | null;

export function summUserProjects(userProjects: SummUserProjects) {
  const projectsSummary = {
    totalProjects: 0,
    totalFeatures: 0,
    totalTasks: 0,
  };

  if (userProjects == null) {
    return projectsSummary;
  }

  for (const summ of userProjects) {
    projectsSummary.totalFeatures += summ.totalFeatures;
    projectsSummary.totalProjects += 1;
    projectsSummary.totalTasks += summ.totalTasks;
  }

  return projectsSummary;
}
