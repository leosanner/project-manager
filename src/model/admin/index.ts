import { PlanUncheckedCreateInput } from "../../../generated/prisma/models";
import { PlanModel } from "../plan";
import { UserService } from "../user";
import { UserRepository } from "@/repository/user";

export class AdminModel {
  userModel: UserService;
  userRepository: UserRepository;
  userAdmin: Promise<boolean>;
  planModel: PlanModel;

  constructor() {
    this.userModel = new UserService();
    this.userAdmin = this.verifyIfAdmin();
    this.userRepository = new UserRepository();
    this.planModel = new PlanModel();
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

    return await this.userModel.getUsers();
  }

  async createNewPlan(planData: PlanUncheckedCreateInput) {
    if (await this.userAdmin) {
      return await this.planModel.createPlan(planData);
    }
  }
}
