import { UserService } from "../user";
import { User } from "../../../generated/prisma/client";
import { UserRepository } from "@/repository/user";

export class AdminModel {
  userModel: UserService;
  userRepository: UserRepository;
  userAdmin: Promise<boolean>;

  constructor() {
    this.userModel = new UserService();
    this.userAdmin = this.verifyIfAdmin();
    this.userRepository = new UserRepository();
  }

  private async verifyIfAdmin(): Promise<boolean> {
    const userRole = await this.userModel.getUserRole();

    if (userRole !== "ADMIN") {
      return false;
    }

    return true;
  }

  async getUsers() {
    if (!(await this.userAdmin)) {
      return;
    }

    return await this.userRepository.getUsers();
  }
}
