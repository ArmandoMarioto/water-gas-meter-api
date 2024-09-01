import { IsDecimal, IsString } from 'class-validator'

export class ConfirmInput {
    @IsDecimal()
    confirmed_value: number

    @IsString()
    measure_uuid: string
}
