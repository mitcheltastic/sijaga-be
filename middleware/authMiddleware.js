const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const accessValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authorization.split(" ")[1];

  // Check if the token is blacklisted
  const blacklistedToken = await prisma.blacklistedToken.findUnique({
    where: { token },
  });

  if (blacklistedToken) {
    return res.status(403).json({ message: "Token has been logged out." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = accessValidation;
