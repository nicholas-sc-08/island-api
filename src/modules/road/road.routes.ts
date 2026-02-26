import { RoadController } from "./road.controller.js";
import { RoadService } from "./road.service.js";
import { Router } from "express";
import { authenticateToken } from "../auth/auth.middleware.js";

const roadRouter: Router = Router();
const roadService: RoadService = new RoadService();
const roadController: RoadController = new RoadController(roadService);

// roadRouter.use(authenticateToken);
roadRouter.get("/", roadController.getRoads.bind(roadController));
roadRouter.get("/:id", roadController.getRoad.bind(roadController));
roadRouter.post("/", roadController.postRoad.bind(roadController));
roadRouter.put("/:id", roadController.putRoad.bind(roadController));
roadRouter.delete("/:id", roadController.deleteRoad.bind(roadController));

export default roadRouter;