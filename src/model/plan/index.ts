import { PlanRepository } from "@/repository/plan";
import { PlanUncheckedCreateInput } from "../../../generated/prisma/models";

export class PlanModel {
  planRepository: PlanRepository;

  constructor() {
    this.planRepository = new PlanRepository();
  }

  async getPlans() {
    return await this.planRepository.getPlans();
  }

  async createPlan(planData: PlanUncheckedCreateInput) {
    return await this.planRepository.createPlan(planData);
  }
}
