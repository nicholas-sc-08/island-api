import type { IAddress, ICreateAddress } from "./address.module.js";
import { AddressService } from "./address.service.js";
import type { Request, Response } from "express";
import { addressSchema, updateAddressSchema } from "./address.zod.js";

export class AddressController {

    private addressService: AddressService;

    constructor(addressService: AddressService) {

        this.addressService = addressService;
    };

    async getAllAddres(req: Request, res: Response): Promise<Response> {

        try {

            const address: IAddress[] = await this.addressService.getAllAddress();
            return res.status(200).json(address);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async getAddress(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;

            if (!id) {
                return res.status(404).json({ message: "Id not found" });
            };

            const address = await this.addressService.getAddress(Number(id));
            return res.status(200).json(address);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async postAddress(req: Request, res: Response): Promise<Response> {

        try {

            const data: ICreateAddress = req.body;
            const validatedAddress = addressSchema.parse(data);

            if (!validatedAddress) {

                return res.status(401).json({ message: "Object format not valid" });
            };

            const address: IAddress = await this.addressService.postAddress(data);
            return res.status(201).json(address);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async putAddress(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;
            const data = req.body;

            if (!id) {

                return res.status(404).json({ message: "Id not found" });
            };

            const validatedAddress = updateAddressSchema.parse(data);

            if (!validatedAddress) {

                return res.status(401).json({ message: "Object format not valid" });
            };

            const address = await this.addressService.updateAddress(Number(id), data);
            return res.status(200).json(address);

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };

    async deleteAddress(req: Request, res: Response): Promise<Response> {

        try {

            const { id } = req.params;

            if (!id) {

                return res.status(404).json({ message: "Id not found" });
            };

            await this.addressService.deleteAddress(Number(id));
            return res.status(200).json({ message: "Address deleted with sucess" });

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };
};