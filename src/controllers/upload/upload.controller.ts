import { CustomBadRequestExceptionFilter } from '@/utils'
import { Body, Controller, Get, Post, Res, UseFilters } from '@nestjs/common'
import { MeasureService } from '@services/index'
import { Response } from 'express'
import { UploadInput } from 'src/input'

@Controller('upload')
@UseFilters(CustomBadRequestExceptionFilter)
export class UploadController {
    constructor(private readonly measureService: MeasureService) {}

    @Get()
    getHello(): string {
        return 'Hello World!'
    }

    @Post()
    async upload(@Body() uploadInput: UploadInput, @Res() res: Response) {
        const result = await this.measureService.createMeasure(uploadInput)
        return res.status(200).json(result)
    }
}
