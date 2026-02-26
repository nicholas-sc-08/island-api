export interface IRoad {

    id: number;
    attempt_coins: number;
    check: boolean;
    created_at: Date;
};

export interface ICreateRoad {

    check: boolean;
    attempt_coins: number;
};

export interface IUpdateRoad {

    check?: boolean;
    attempt_coins?: number;
    created_at?: Date;
};