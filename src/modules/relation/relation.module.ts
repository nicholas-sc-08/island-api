export interface IRelation {

    id: number;
    userId: number;
    roadId: number;
    addressId: number;
};

export interface ICreateRelation {

    userId: number;
    roadId: number;
    addressId: number;
};

export interface IUpdateRelation {

    userId?: number;
    roadId?: number;
    addressId?: number;
};