import { RelationService } from "./relation.service.js";
import { RelationController } from "./relation.controller.js";
import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";

const relationRouter: Router = Router();
const relationService: RelationService = new RelationService();
const relationController: RelationController = new RelationController(relationService);

// relationRouter.use(authenticateToken);
relationRouter.get("/", relationController.getRelations.bind(relationController));
relationRouter.get("/:id", relationController.getRelation.bind(relationController));
relationRouter.post("/", relationController.postRelation.bind(relationController));
relationRouter.put("/:id", relationController.putRelation.bind(relationController));
relationRouter.delete("/:id", relationController.deleteRelation.bind(relationController));

export default relationRouter;