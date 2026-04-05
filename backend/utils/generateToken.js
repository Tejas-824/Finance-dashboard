import jwt from "jsonwebtoken";

const generateToken = (id, role, status) => {
  return jwt.sign({ id, role, status }, process.env.JWT_SECRET, {
    expiresIn: "1d"
  });
};

export default generateToken;