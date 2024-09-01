import { CustomerRepository } from '@/modules/customers/repositories/customer.repositories'
import { ImageRepository } from '@/modules/imagens/repositories/images.repositories'
import { MeasureRepository } from '@/modules/measures/repositories/measure.repositories'
import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
@Global()
@Module({
    providers: [
        PrismaService,
        CustomerRepository,
        MeasureRepository,
        ImageRepository,
    ],
    exports: [CustomerRepository, MeasureRepository, ImageRepository],
})
export class DatabaseModule {}
