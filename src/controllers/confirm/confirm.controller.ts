import { ConfirmInput } from '@/input/index'
import { CustomBadRequestExceptionFilter } from '@/utils'
import { Body, Controller, Patch, Res, UseFilters } from '@nestjs/common'
import { MeasureService } from '@services/index'
import { Response } from 'express'
@Controller('confirm')
@UseFilters(CustomBadRequestExceptionFilter)
export class ConfirmController {
    constructor(private readonly measureService: MeasureService) {}

    @Patch()
    async confirm(
        @Body() confirmInput: ConfirmInput,
        @Res() res: Response
    ): Promise<Response> {
        const result = await this.measureService.confirmMeasure(confirmInput)
        return res.status(200).json({ success: result })
    }
}
