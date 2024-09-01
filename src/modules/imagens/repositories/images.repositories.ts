import { PrismaService } from '@/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class ImageRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findImage(findImage: Prisma.ImageFindFirstArgs) {
        return await this.prisma.image.findFirst(findImage)
    }
    async createImage(createImage: Prisma.ImageCreateArgs) {
        return await this.prisma.image.create(createImage)
    }
    async findUniqueImage(findUniqueImage: Prisma.ImageFindUniqueArgs) {
        return await this.prisma.image.findUnique(findUniqueImage)
    }
}
