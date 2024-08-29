import {
    ConfirmController,
    CustomerController,
    UploadController,
} from '@controllers/index'
import { Module } from '@nestjs/common'
import {
    AppService,
    CustomerService,
    GeminiService,
    ImageService,
    MeasureService,
    PrismaService,
} from '@services/index'

@Module({
    imports: [],
    controllers: [UploadController, ConfirmController, CustomerController],
    providers: [
        AppService,
        GeminiService,
        ImageService,
        CustomerService,
        PrismaService,
        MeasureService,
    ],
})
export class AppModule {}
