import { Role } from "../../../generated/prisma/enums";
import { UserService } from "../user";

export class AdminModel {
  userModel: UserService;
  userAdmin: Promise<boolean>;

  constructor() {
    this.userModel = new UserService();
    this.userAdmin = this.verifyIfAdmin();
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
    }
  }
}
