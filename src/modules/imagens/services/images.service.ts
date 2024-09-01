import { Injectable } from '@nestjs/common'
import { ImageRepository } from '../repositories/images.repositories'

@Injectable()
export class ImageService {
    private readonly baseUrl = 'http://localhost:3000/images'

    constructor(private readonly imageRepo: ImageRepository) {}

    async saveBase64Image(base64Data: string, fileName: string): Promise<any> {
        const imageBase64 = base64Data.replace(/^data:image\/jpeg;base64,/, '')
        const buffer = Buffer.from(imageBase64, 'base64')

        const url = `${this.baseUrl}/${fileName}`

        const findImage = await this.imageRepo.findImage({
            where: { data: buffer },
        })
        if (findImage) return findImage

        const image = await this.imageRepo.createImage({
            data: {
                fileName,
                data: buffer,
                url,
            },
        })

        return image
    }

    async getImageById(id: string) {
        const image = await this.imageRepo.findUniqueImage({ where: { id } })
        if (!image) {
            throw new Error('Image not found')
        }
        return image
    }

    async getImageByfileName(fileName: string) {
        const image = await this.imageRepo.findUniqueImage({
            where: { fileName },
        })
        if (!image) {
            throw new Error('Image not found')
        }
        return image
    }
}
