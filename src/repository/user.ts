import { prisma } from "@/lib/prisma/index";

export class UserRepository {
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    return user;
  }

  async getUsers() {
    return await prisma.user.findMany();
  }
}
