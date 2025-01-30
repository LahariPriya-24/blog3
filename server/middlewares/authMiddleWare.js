import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  // Check if the authorization header exists and starts with "Bearer"
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get the token from the authorization header
      token = authorization.split(" ")[1];

      // Verify and decode the token using the JWT secret stored in environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID, excluding the password field
      req.user = await authModel.findById(decoded.userID).select("-password");

      // If user is found, move to the next middleware or route handler
      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      // Handle specific JWT verification errors (expired token, invalid token, etc.)
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      } else {
        return res.status(401).json({ message: "Unauthorized: Invalid or malformed token" });
      }
    }
  } else {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};

export default checkIsUserAuthenticated;
