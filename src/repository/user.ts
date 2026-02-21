import { prisma } from "@/lib/prisma/index";

class UserRepository {
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

export const userRepository = new UserRepository();
