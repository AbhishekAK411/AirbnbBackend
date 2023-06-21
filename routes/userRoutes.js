import express from "express";
import { checkRegister, checkUser } from "../middlewares/auth.js";
import { register } from "../controllers/users.js";
import { geoLocate, search } from "../controllers/airbnb.js";

const router = express.Router();

router.post("/register", checkRegister, register);
router.post("/search", checkUser, search);
router.post("/locate", checkUser, geoLocate);

export default router;