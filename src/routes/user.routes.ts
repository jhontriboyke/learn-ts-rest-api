import { Router } from "express";
import UserController from "../controllers/user.controllers";

// Utility function to handle async errors
const asyncHandler = (fn: Function) => (req: any, res: any, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

class UserRoutes {
  router = Router();
  private userController = new UserController();

  constructor() {
    this.initRoutes();
  }

  initRoutes() {
    // Create user
    this.router.post(
      "/",
      asyncHandler(this.userController.create.bind(this.userController))
    );

    // Get all users
    this.router.get(
      "/",
      asyncHandler(this.userController.findAll.bind(this.userController))
    );

    // Get single user by id
    this.router.get(
      "/:id",
      asyncHandler(this.userController.findOne.bind(this.userController))
    );
  }
}

export default new UserRoutes().router;
