export const protectRoute = (req, res, next) => {
  console.log("triggered");
  if (req.session?.user) {
    next();
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - No Token Provided" });
  }
};
