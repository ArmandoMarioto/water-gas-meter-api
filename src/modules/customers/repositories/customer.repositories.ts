import { PrismaService } from '@/database/prisma.service'
import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'

@Injectable()
export class CustomerRepository {
    constructor(private readonly prisma: PrismaService) {}

    async findCustomer(findCustomer: Prisma.CustomerFindFirstArgs) {
        return await this.prisma.customer.findFirst(findCustomer)
    }
    async createCustomer(createCustomer: Prisma.CustomerCreateArgs) {
        return await this.prisma.customer.create(createCustomer)
    }
}
