import { GeminiService } from '@/external-services'
import { Module } from '@nestjs/common'
import { CustomerModule } from '../customers/customer.module'
import { ImageService } from '../imagens/services/images.service'
import { MeasureController } from './controllers/measure.controller'
import { MeasureService } from './services/measure.service'

@Module({
    imports: [CustomerModule],
    controllers: [MeasureController],
    providers: [MeasureService, GeminiService, ImageService],
})
export class MeasureModule {}
