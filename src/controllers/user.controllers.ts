import { Request, Response } from "express";
import UserService from "../services/user.services";

export default class UserController {
  private userService = new UserService();

  // Create user
  async create(req: Request, res: Response) {
    const { username, name, email } = req.body;

    // Validation
    if (!username || !name || !email) {
      return res.status(400).json({
        statusCode: 400,
        message: "Please provide valid value",
      });
    }

    try {
      // Await the result of user creation
      const user = await this.userService.create({ username, name, email });

      return res.status(201).json({
        statusCode: 201,
        message: "User created",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Server internal error",
      });
    }
  }

  // Get all users
  async findAll(req: Request, res: Response) {
    try {
      // Await the result of fetching all users
      const users = await this.userService.findAll();

      return res.status(200).json({
        statusCode: 200,
        message: "Users found",
        data: users,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Server internal error",
      });
    }
  }

  // Get single user by ID
  async findOne(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      // Await the result of fetching the user by ID
      const user = await this.userService.findOne(userId);

      // If user not found, return 404
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          message: "User not found",
        });
      }

      return res.status(200).json({
        statusCode: 200,
        message: "User found",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        message: "Server internal error",
      });
    }
  }
}
