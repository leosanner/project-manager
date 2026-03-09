import { prisma } from "@/lib/prisma/index";
import { PlanUncheckedCreateInput } from "../../generated/prisma/models";

export class PlanRepository {
  async getPlans() {
    return await prisma.plan.findMany();
  }

  async getPlanTypes() {
    return await prisma.plan.findMany({
      select: {
        plantype: true,
      },
    });
  }

  async createPlan(planData: PlanUncheckedCreateInput) {
    return await prisma.plan.create({
      data: planData,
    });
  }
}
