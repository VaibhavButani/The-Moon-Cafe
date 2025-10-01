export function verifyToken(req, res, next) {
  let token = req.headers["authorization"];
  console.log("👉 Incoming Authorization header:", token);

  if (!token) return res.status(403).json({ message: "No token provided" });

  if (token.startsWith("Bearer ")) token = token.slice(7).trim();
  console.log("👉 Extracted token:", token);

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("❌ JWT verification failed:", err.message);
      return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("✅ Decoded JWT payload:", decoded);
    req.user = decoded;
    next();
  });
}
