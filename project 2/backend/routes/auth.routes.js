import express from "express";
import { auth } from "../controllers/index.js";

const router = express.Router();

router.post("/signup", auth.signup);
router.post("/login", auth.login);
router.get("/logout", auth.logout);
router.get("/authCheck", auth.authCheck);

export default router;
