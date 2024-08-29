import { IsIn } from 'class-validator'

export class measureTypeInput {
    @IsIn(['WATER', 'GAS'])
    measureType?: 'WATER' | 'GAS'
}
