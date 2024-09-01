import { PrismaService } from '@/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class MeasureRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findMeasure(findMeasure: Prisma.MeasureFindFirstArgs) {
        return await this.prisma.measure.findFirst(findMeasure)
    }
    async findUniqueMeasure(findUniqueMeasure: Prisma.MeasureFindUniqueArgs) {
        return await this.prisma.measure.findUnique(findUniqueMeasure)
    }
    async createMeasure(createMeasure: Prisma.MeasureCreateArgs) {
        return await this.prisma.measure.create(createMeasure)
    }
    async updateMeasure(updateMeasure: Prisma.MeasureUpdateArgs) {
        return await this.prisma.measure.update(updateMeasure)
    }
    async findManyMeasures(findManyMeasures: Prisma.MeasureFindManyArgs) {
        return await this.prisma.measure.findMany({
            ...findManyMeasures,
            include: {
                image: {
                    select: {
                        url: true,
                    },
                },
            },
        })
    }
}
