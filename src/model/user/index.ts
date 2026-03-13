import { getUser } from "@/lib/auth/session";
import { ProjectService } from "../project";
import { FeatureRepository } from "@/repository/feature";
import { Role } from "../../../generated/prisma/enums";
import { UserRepository } from "@/repository/user";

export interface UserFeatureByProject {
  featureId: number;
  featureName: string;
  featureDeadline: Date;
  projectId: string;
  projectName: string;
}

export class UserService {
  projectService: ProjectService;
  featureRepository: FeatureRepository;
  userRepository: UserRepository;

  constructor() {
    this.projectService = new ProjectService();
    this.featureRepository = new FeatureRepository();
    this.userRepository = new UserRepository();
  }

  private async getUser() {
    return await getUser();
  }

  async getUserRole() {
    const user = await this.getUser();
    if (!user) {
      return;
    }

    return user.role as Role;
  }

  async setUserPlan(planId: string) {
    const user = await this.getUser();
    if (!user) {
      return;
    }

    return await this.userRepository.setUserPlan(user.id, planId);
  }

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async getUserFeatures() {
    const user = await this.getUser();
    if (!user) {
      return [];
    }

    const totalFeatures = await this.projectService.getTotalFeatures(user.id);
    const currenDate = new Date();

    return totalFeatures.reduce<Record<string, UserFeatureByProject[]>>(
      (currentDict, obj) => {
        const featuresObject = obj.features
          .filter((feature) => feature.deadline > currenDate)
          .map((feature) => {
            const featureDeadline = feature.deadline;
            const featureId = feature.id;
            const featureName = feature.description;
            const projectId = obj.id;
            const projectName = obj.name;

            return {
              featureId,
              featureName,
              featureDeadline,
              projectId,
              projectName,
            };
          });

        currentDict[obj.id] = featuresObject;
        return currentDict;
      },
      {},
    );
  }
}
