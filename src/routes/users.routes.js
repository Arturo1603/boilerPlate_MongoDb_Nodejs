import { Router } from "express";
import UserController from "../controllers/users.controller";
import validation from "../middleware/validation";
import { createSchema, getSchema } from '../validators/users.validators';
import authenticate from "../middleware/authentication";


const router = Router();
// recuerda que cuando instancias una clase debes usar new Clase()
const controller = new UserController();

router.use(authenticate)
router.get("/", validation(getSchema), (request, response) =>controller.all(request, response));
router.post("/", validation(createSchema), (request, response) =>controller.createDocument(request, response));
router.get("/:username", (request, response) => controller.getByField(request, response));
router.put("/:username", (request, response) => controller.updateDocument(request, response));
router.delete("/:username", (request, response) => controller.documentDelete(request, response));

export default router;
