import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

/**
 * Generates a token for the given user.
 * @param {Object} user - The user object.
 * @param {string} user._id - The user's ID.
 * @param {string} user.name - The user's name.
 * @param {string} user.email - The user's email.
 * @param {boolean} user.isAdmin - Indicates if the user is an admin.
 * @returns {string} - The generated token.
 */
export const generateToken = (user: IUser) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn: "30d",
    }
  );
};
