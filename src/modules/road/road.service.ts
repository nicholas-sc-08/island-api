import prisma from "../../prisma/client.js";
import type { ICreateRoad, IRoad, IUpdateRoad } from "./road.module.js";

export class RoadService {

    async getRoads(): Promise<IRoad[]> {

        return prisma.road.findMany();
    };

    async getRoad(id: number): Promise<IRoad | null> {

        return prisma.road.findUnique({ where: { id } });
    };

    async postRoad(data: ICreateRoad): Promise<IRoad> {

        return prisma.road.create({ data });
    };

    async putRoad(id: number, data: IUpdateRoad): Promise<IRoad> {

        return prisma.road.update({ where: { id }, data });
    };

    async deleteRoad(id: number): Promise<void> {

        prisma.road.delete({ where: { id } });
    };
};