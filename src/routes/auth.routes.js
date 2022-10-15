import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();
const controller = new AuthController();
router.post('/signup', (request, response) => controller.Singup(request, response));
router.post('/signIn', (request, response) => controller.signIn(request, response));
router.post('/refreshToken', (request, response) => controller.refreshToken(request, response));

export default router