import { Router } from "express";
import RoleController from "../controllers/roles.controller";
import validation from "../middleware/validation";
import { allSchema, createSchema, deleteSchema, getByFieldSchema, updatedSchema } from "../validators/roles.validatiors";
import authenticate from "../middleware/authentication";

const router = Router();
const controller = new RoleController();

router.use(authenticate)
router.get("/",validation(allSchema), (request, response) => controller.all(request, response));
router.post("/",validation(createSchema), (request, response) => controller.createDocument(request, response));
router.put("/:code",validation(updatedSchema), (request, response) => controller.updateDocument(request, response));
router.get("/:code",validation(getByFieldSchema), (request, response) => controller.getByField(request, response));
router.delete("/:code",validation(deleteSchema), (request, response) => controller.documentDelete(request, response));

export default router;
