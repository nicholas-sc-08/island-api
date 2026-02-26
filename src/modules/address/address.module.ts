export type category = "TRILHA" | "PRAIA" | "LARICA"

export interface IAddress {

    id: number;
    name: string;
    image_url: string;
    category: category;
    check: boolean;
};

export interface ICreateAddress {

    name: string;
    image_url: string;
    category: category;
    check: boolean;
};

export interface IUpdateAddress {

    name?: string;
    image_url?: string;
    category?: category;
    check?: boolean;
};