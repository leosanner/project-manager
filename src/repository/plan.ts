import { prisma } from "@/lib/prisma/index";
import { PlanUncheckedCreateInput } from "../../generated/prisma/models";

export class PlanRepository {
  async getPlans() {
    return await prisma.plan.findMany();
  }

  async createPlan(planData: PlanUncheckedCreateInput) {
    return await prisma.plan.create({
      data: planData,
    });
  }
}
