import { prisma } from "@/lib/prisma/index";

export class PlanRepository {
  async getPlans() {
    return await prisma.plan.findMany();
  }
}
