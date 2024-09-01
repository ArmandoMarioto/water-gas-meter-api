import { Type } from 'class-transformer'
import { IsDate, IsIn, IsString } from 'class-validator'

export class UploadInput {
    @IsString()
    image: string

    @IsString()
    customer_code: string

    @Type(() => Date)
    @IsDate()
    measure_datetime: Date

    @IsIn(['WATER', 'GAS'])
    measure_type: 'WATER' | 'GAS'
}
