import { GoogleGenerativeAI } from '@google/generative-ai'
import { Injectable, InternalServerErrorException } from '@nestjs/common'

@Injectable()
export class GeminiService {
    private genAI: GoogleGenerativeAI

    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
    }

    async generateContent(filePart, measure_type: string): Promise<string> {
        try {
            const model = this.genAI.getGenerativeModel({
                model: 'gemini-1.5-flash',
            })
            const prompt = `Please analyze this ${measure_type} meter reading and return only measure value .`
            //const generatedContent = await model.generateContent(prompt)
            const generatedContent = await model.generateContent([
                prompt,
                filePart,
            ])

            return generatedContent.response.text()
        } catch (error) {
            throw new InternalServerErrorException(
                `Failed to generate content, error: ${error}`
            )
        }
    }
}
