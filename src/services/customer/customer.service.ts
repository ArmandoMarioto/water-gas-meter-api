import { CustomerResponse } from '@/interfaces'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) {}
    async createOrFindCustomer(
        customerCode: string
    ): Promise<CustomerResponse> {
        try {
            const customer = await this.prisma.customer.findFirst({
                where: { customerCode: customerCode },
            })
            if (customer) {
                return customer
            }
            return await this.prisma.customer.create({
                data: { customerCode: customerCode },
            })
        } catch (error) {
            throw new Error('Failed to create customer' + error)
        }
    }
    async getCustomerByCode(customerCode: string): Promise<CustomerResponse> {
        try {
            return await this.prisma.customer.findFirst({
                where: { customerCode: customerCode },
            })
        } catch (error) {
            throw new Error('Failed to get customer' + error)
        }
    }
}
