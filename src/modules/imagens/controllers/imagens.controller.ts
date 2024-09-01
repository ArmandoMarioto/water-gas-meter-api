import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { ImageService } from '../services/images.service'

@Controller('images')
export class ImagensController {
    constructor(private readonly imageService: ImageService) {}

    @Get(':fileName')
    async getImagemByPath(
        @Param('fileName') fileName: string,
        @Res() res: Response
    ) {
        const base64Image = await this.imageService.getImageByfileName(fileName)
        const imageBuffer = Buffer.from(
            base64Image.data.toString('base64'),
            'base64'
        )

        res.setHeader('Content-Type', 'image/jpeg')

        return res.send(imageBuffer)
    }
}
