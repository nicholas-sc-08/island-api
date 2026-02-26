import type { ICreateUser, IUpdateUser, IUser } from "./user.module.js";
import prisma from "../../prisma/client.js";


export class UserService {

    async getUsers(): Promise<IUser[]> {

        return prisma.users.findMany();
    };

    async getUser(id: number): Promise<IUser | null> {

        return prisma.users.findUnique({ where: { id } });
    };

    async getUserByEmail(email: string) {
    
        const user = await prisma.users.findFirst({
            where: { email },
            include: {
                relations: {
                    include: {
                        road: true,
                        address: true
                    }
                }
            }
        });
    
        if (!user) return null;
    
        const roadsMap = new Map<number, { road: any; addresses: any[] }>();
    
        for (const rel of user.relations) {
            const roadId = rel.roadId;
    
            if (!roadsMap.has(roadId)) {
                roadsMap.set(roadId, { road: rel.road, addresses: [] });
            }
    
            roadsMap.get(roadId)!.addresses.push(rel.address);
        }
    
        const roads = Array.from(roadsMap.values()).map(r => ({
            id: r.road.id,
            name: r.road.name,
            attempt_coins: r.road.attempt_coins,
            check: r.road.check,
            created_at: r.road.created_at,
            address: r.addresses
        }));
    
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            current_coins: user.current_coins,
            created_at: user.created_at,
            roads
        };
    }
    

    async createUser(data: ICreateUser): Promise<IUser> {

        return prisma.users.create({ data });
    };

    async updateUser(id: number, data: IUpdateUser): Promise<IUser> {

        return prisma.users.update({ where: { id }, data });
    };

    async deleteUser(id: number): Promise<void> {

        prisma.users.delete({ where: { id } });
    };
};