import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "Token is missing!" });
    }

    const token = header.split(' ')[1];

    jwt.verify(token, process.env.SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Token is invalid" });
      }

      req.user = decoded;
      next();
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
