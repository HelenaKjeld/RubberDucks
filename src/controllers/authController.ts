import { type Request, type Response, type NextFunction } from "express";

import jwt from "jsonwebtoken";

import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";

//Product imports
import { UserModel } from "../models/userModel";
import { User } from "../interfaces/user";
import { connect, disconnect } from "../repository/database";

/**
 * Registers a new user in the database
 * @param req
 * @param res
 */
export async function registerUser(req: Request, res: Response): Promise<void> {
  try {
    const { error } = validateUserRegistration(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    await connect();

    const emailExists = await UserModel.findOne({ email: req.body.email });
    if (emailExists) {
      res.status(400).json({ error: "Email already exists." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userObject = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await userObject.save();
    res.status(200).json({ error: null, data: savedUser._id });
  } catch (error) {
    res
      .status(500)
      .send("An error occurred while registering the user. Error:" + error);
  } finally {
  }
}

// login function

/**
 * Validates the user registration data (name, email, password)
 * @param data
 */
export function validateUserRegistration(data: User): ValidationResult {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(6).max(30).required(),
  });

  return schema.validate(data);
}

/**
 * Validates the user Login ( email, password)
 * @param data
 */
export function validateUserLoginInfo(data: User): ValidationResult {
  const schema = Joi.object({
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(6).max(30).required(),
  });

  return schema.validate(data);
}
