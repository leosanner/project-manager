import { getUser } from "@/lib/auth/session";
import { ProjectService } from "../project";
import { FeatureService } from "../feature";

export class UserService {
  projectService: ProjectService;
  featureService: FeatureService;

  constructor() {
    this.projectService = new ProjectService();
    this.featureService = new FeatureService();
  }

  private async getUser() {
    return await getUser();
  }

  async getUserFeatures() {
    const user = await this.getUser();
    if (!user) {
      return [];
    }

    const totalFeatures = await this.projectService.getTotalFeatures(user.id);

    return totalFeatures.reduce<Record<string, object[]>>(
      (currentDict, obj) => {
        const featuresObject = obj.features.map((feature) => {
          const featureDeadline = feature.deadline;
          const featureId = feature.id;
          const featureName = feature.description;

          return { featureId, featureName, featureDeadline };
        });

        currentDict[obj.id] = featuresObject;
        return currentDict;
      },
      {},
    );
  }
}
