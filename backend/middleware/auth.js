import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

export function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  if (token.startsWith("Bearer ")) token = token.slice(7).trim();

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}
