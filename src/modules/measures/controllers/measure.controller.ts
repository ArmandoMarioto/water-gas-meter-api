import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Res,
} from '@nestjs/common'
import { Response } from 'express'
import { ConfirmInput, UploadInput } from '../input'
import { MeasureService } from '../services/measure.service'
@Controller()
export class MeasureController {
    constructor(private readonly measureService: MeasureService) {}
    @Get()
    getHello(): string {
        return 'Hello World!'
    }
    @Patch('confirm')
    async confirm(
        @Body() confirmInput: ConfirmInput,
        @Res() res: Response
    ): Promise<Response> {
        const result = await this.measureService.confirmMeasure(confirmInput)
        return res.status(200).json({ success: result })
    }
    @Post('upload')
    async upload(@Body() uploadInput: UploadInput, @Res() res: Response) {
        const result = await this.measureService.createMeasure(uploadInput)
        return res.status(200).json(result)
    }
    @Get(':customerCode/list')
    async getCustomerMeasures(
        @Param('customerCode') customerCode: string,
        @Res() res: Response,
        @Query('measure_type') measureType?: string
    ) {
        const result = await this.measureService.getMeasuresByCustomer(
            customerCode,
            measureType
        )
        return res.status(200).json(result)
    }
}
