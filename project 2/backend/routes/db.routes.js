import express from "express";
import { db } from "../controllers/index.js";
import { protectRoute } from "../middelware/protectRoute.js";

const router = express.Router();

// testing purpose
// router.use((req, res, next) => {
//   console.log(
//     `${new Date().toISOString()} - ${req.method} request to ${req.url}`
//   );

//   console.log("server base path ", req.session.user, "--end");
//   next();
// });

router.get("/update", db.updateDb);

router.get("/fetchData", db.fetchData);

export default router;
