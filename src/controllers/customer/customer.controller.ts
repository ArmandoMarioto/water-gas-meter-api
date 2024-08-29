import { CustomBadRequestExceptionFilter } from '@/utils'
import { Controller, Get, Param, Query, Res, UseFilters } from '@nestjs/common'
import { MeasureService } from '@services/index'
import { Response } from 'express'

@Controller()
@UseFilters(CustomBadRequestExceptionFilter)
export class CustomerController {
    constructor(private readonly measureService: MeasureService) {}

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
