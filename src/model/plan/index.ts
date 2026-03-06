import { PlanRepository } from "@/repository/plan";

export class PlanModel {
  planRepository: PlanRepository;

  constructor() {
    this.planRepository = new PlanRepository();
  }

  async getPlans() {
    return await this.planRepository.getPlans();
  }
}
