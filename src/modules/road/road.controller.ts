import type { ICreateRoad, IRoad, IUpdateRoad } from "./road.module.js";
import { RoadService } from "./road.service.js";
import type { Request, Response } from "express";
import { roadSchema, updateRoadSchema } from "./road.zod.js";

export class RoadController {

    private roadService: RoadService;

    constructor(roadService: RoadService) {

        this.roadService = roadService;
    };

    async getRoads(req: Request, res: Response): Promise<Response> {

        try {

            const data: IRoad[] = await this.roadService.getRoads();
            return res.status(200).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async getRoad(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;

            if (!id) {

                return res.status(404).json({ message: "Id not found" });
            };

            const road: IRoad | null = await this.roadService.getRoad(Number(id));
            return res.status(200).json(road);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async postRoad(req: Request, res: Response): Promise<Response> {

        try {

            const data: ICreateRoad = req.body;
            const validatedRoad = roadSchema.parse(data);

            if (!validatedRoad) {

                return res.status(401).json({ message: "Object format not valid" });
            };

            const road: IRoad = await this.roadService.postRoad(data);
            return res.status(201).json(road);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async putRoad(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;
            const data: IUpdateRoad = req.body;

            if (!id) {

                return res.status(404).json({ message: "Id not found" });
            };

            const validatedRoad = updateRoadSchema.parse(data);

            if (!validatedRoad) {

                return res.status(401).json({ message: "Object format no valid to update" });
            };

            const road: IRoad = await this.roadService.putRoad(Number(id), data);
            return res.status(200).json(road);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async deleteRoad(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;

            if (!id) {

                return res.status(404).json({ message: "Id not found" });
            };

            await this.roadService.deleteRoad(Number(id));
            return res.status(200).json({ message: "Road deleted with sucess" });

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };
};