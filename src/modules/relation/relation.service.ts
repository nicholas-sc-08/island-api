import prisma from "../../prisma/client.js";
import type { IRelation, ICreateRelation, IUpdateRelation } from "./relation.module.js";

export class RelationService {

    async getRelations(): Promise<IRelation[]> {

        return await prisma.relation.findMany();
    };

    async getRelation(id: number): Promise<IRelation | null> {

        return await prisma.relation.findUnique({ where: { id } });
    };

    async postRelation(data: ICreateRelation): Promise<IRelation> {

        return await prisma.relation.create({ data });
    };

    async updateRelation(id: number, data: IUpdateRelation): Promise<IRelation> {

        return await prisma.relation.update({ where: { id }, data: data });
    };

    async deleteRelation(id: number): Promise<void> {

        await prisma.relation.delete({ where: { id } });
    };
};