import { GoogleGenAI } from "@google/genai";
import { configDotenv } from "dotenv";
import type { GenerationResult } from "./gemini.module.js";

configDotenv();

export class GeminiService {

    private ai: GoogleGenAI;
    private readonly defaultModel: string = "gemini-2.5-flash";

    constructor() {

        const apiKey: string = process.env.GEMINI_API_KEY || "";

        if (!apiKey) {

            throw new Error("GEMINI_API_KEY hasn't been configured. Check your .env");
        };

        this.ai = new GoogleGenAI({ apiKey });
    };

    public async generateReponse(prompt: string): Promise<GenerationResult> {

        try {

            const response = await this.ai.models.generateContent({ model: this.defaultModel, contents: prompt });
            const data = { prompt: prompt, model: this.defaultModel, response: response.text || "" };
            return data;

        } catch (error: any) {

            console.error("[Gemini Service Error]", error.message);
            throw new Error("Error with comunication on gemini API services");
        };
    };
};