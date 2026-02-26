import { RelationService } from "./relation.service.js";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import type { IRelation, IUpdateRelation } from "./relation.module.js";
import { relationSchema, updateRelationSchema } from "./relation.zod.js";

export class RelationController {


    private relationService: RelationService;

    constructor(relationService: RelationService) {

        this.relationService = relationService;
    };

    async getRelations(req: Request, res: Response): Promise<Response> {

        try {

            const data: IRelation[] = await this.relationService.getRelations();
            return res.status(200).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async getRelation(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;

            if (!id) {

                return res.status(404).json({ message: "Id not received" });
            };

            const data: IRelation | null = await this.relationService.getRelation(Number(id));
            return res.status(200).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async postRelation(req: Request, res: Response): Promise<Response> {

        try {

            const relation: IRelation = req.body;
            const validatedRelation = relationSchema.parse(relation);

            if(!validatedRelation){

                return res.status(401).json({message: "Forbidden"});
            };

            const data = await this.relationService.postRelation(relation);
            return res.status(201).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async putRelation(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;
            const relation: IUpdateRelation = req.body;
            const validatedRelation = updateRelationSchema.parse(relation);

            if (!id) {

                return res.status(404).json({ message: "Id not received" });
            
            } else if (!validatedRelation) {

                return res.status(401).json({ message: "Object structure not valid to update" });
            };

            const data: IRelation = await this.relationService.updateRelation(Number(id), relation);
            return res.status(200).json(data);

        } catch (error: any) {

            return res.status(500).json({ message: error.message })
        };
    };

    async deleteRelation(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;

            if (!id) {

                return res.status(404).json({ message: "Id not received" });
            };

            await this.relationService.deleteRelation(Number(id));
            return res.status(200).json({ message: "User deleted with sucess" });

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };
};