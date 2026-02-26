import type { Request, Response } from "express";
import { GeminiService } from "./gemini.service.js";
import type { PromptRequest } from "./gemini.module.js";

export class GeminiController {

    private geminiService: GeminiService;

    constructor(geminiService: GeminiService) {

        this.geminiService = geminiService;
    };

    public async generate(req: Request, res: Response): Promise<Response> {

        const { prompt } = req.body as PromptRequest;

        if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {

            return res.status(400).json({ message: "Prompt is required to generate an answer" });
        };

        try {

            const result = await this.geminiService.generateReponse(prompt);
            return res.status(200).json({ sucess: true, data: result.response, metadata: { model: result.model, prompt: result.prompt } });

        } catch (error: any) {

            return res.status(500).json({ message: error.message });
        };
    };
};