import { PlanRepository } from "@/repository/plan";
import { PlanUncheckedCreateInput } from "../../../generated/prisma/models";

export class PlanModel {
  planRepository: PlanRepository;

  constructor() {
    this.planRepository = new PlanRepository();
  }

  async getPlans() {
    const plans = await this.planRepository.getPlans();
    if (plans.length === 0) {
      return [await this.planRepository.createPlan({})];
    }

    return plans;
  }

  async createPlan(planData: PlanUncheckedCreateInput) {
    const currentPlans = await this.planRepository.getPlanTypes();

    if (currentPlans.some((plan) => plan.plantype === planData.plantype)) {
      throw Error("Plan Already Exists");
    }

    return await this.planRepository.createPlan(planData);
  }
}
