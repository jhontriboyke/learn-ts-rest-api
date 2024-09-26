import { PrismaClient } from "@prisma/client";
import { CreateUser } from "../types/user.type";

export default class UserService {
  private db = new PrismaClient();

  async create(createUser: CreateUser) {
    return this.db.user.create({
      data: {
        ...createUser,
      },
    });
  }

  async findAll() {
    return this.db.user.findMany({});
  }

  async findOne(id: string) {
    return this.db.user.findUnique({
      where: {
        id,
      },
    });
  }
}
