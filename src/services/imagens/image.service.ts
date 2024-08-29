import { PrismaService } from '@/services/prisma.service'
import { Injectable } from '@nestjs/common'
import * as fs from 'fs/promises'
import * as path from 'path'

@Injectable()
export class ImageService {
    private readonly baseUrl = 'http://localhost:3000/images'

    constructor(private readonly prisma: PrismaService) {}

    async saveBase64Image(base64Data: string, fileName: string): Promise<any> {
        // Remove a parte "data:image/jpeg;base64," se presente
        const imageBase64 = base64Data.replace(/^data:image\/jpeg;base64,/, '')
        const buffer = Buffer.from(imageBase64, 'base64')
        const dir = path.join(process.cwd(), 'images')
        const filePath = path.join(dir, fileName)

        try {
            await fs.mkdir(dir, { recursive: true })
        } catch (error) {
            console.error('Erro ao criar diretório:', error)
            throw new Error('Erro ao criar diretório')
        }

        try {
            await fs.writeFile(filePath, buffer)
        } catch (error) {
            console.error('Erro ao salvar o arquivo:', error)

            throw new Error('Erro ao salvar arquivo')
        }

        const url = `${this.baseUrl}/${fileName}`

        const findImage = await this.prisma.image.findFirst({
            where: { data: buffer },
        })
        if (findImage) return findImage

        const image = await this.prisma.image.create({
            data: {
                fileName,
                data: buffer,
                filePath,
                url,
            },
        })

        return image // Retorna a URL da imagem
    }

    async getImageById(id: string): Promise<Buffer> {
        const image = await this.prisma.image.findUnique({ where: { id } })
        if (!image) {
            throw new Error('Image not found')
        }
        return image.data
    }

    async getImageUrlById(id: string): Promise<string> {
        const image = await this.prisma.image.findUnique({ where: { id } })
        if (!image) {
            throw new Error('Image not found')
        }
        return image.url
    }
}
