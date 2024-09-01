import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { MeasureModule } from './modules/measures/measure.module'
import { ImagensModule } from './modules/imagens/imagens.module'

@Module({
    imports: [DatabaseModule, MeasureModule, ImagensModule],
})
export class AppModule {}
