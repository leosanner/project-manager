import { prisma } from "@/lib/prisma/index";

export class UserRepository {
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }

  async setUserPlan(userId: string, planId: string) {
    return await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        planId: planId,
      },
    });
  }

  async getUsers() {
    return await prisma.user.findMany();
  }
}
