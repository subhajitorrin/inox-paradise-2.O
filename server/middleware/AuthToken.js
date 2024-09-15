import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

async function AuthToken(req, res, next) {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    next();
    req.user = decoded;
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while verifying token" });
  }
}
export default AuthToken