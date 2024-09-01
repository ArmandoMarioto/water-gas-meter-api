import { Module } from '@nestjs/common'
import { ImagensController } from './controllers'
import { ImageService } from './services/images.service'

@Module({
    providers: [ImageService],
    controllers: [ImagensController],
    exports: [],
})
export class ImagensModule {}
