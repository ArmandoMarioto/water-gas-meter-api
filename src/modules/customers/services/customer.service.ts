import { Injectable } from '@nestjs/common'
import { CustomerRepository } from '../repositories/customer.repositories'
import { CustomerResponse } from '../response/customer-response'

@Injectable()
export class CustomerService {
    constructor(private readonly customerRepo: CustomerRepository) {}
    async createOrFindCustomer(
        customerCode: string
    ): Promise<CustomerResponse> {
        try {
            const customer = await this.customerRepo.findCustomer({
                where: { customerCode: customerCode },
            })
            if (customer) {
                return customer
            }
            return await this.customerRepo.createCustomer({
                data: { customerCode: customerCode },
            })
        } catch (error) {
            throw new Error('Failed to create customer' + error)
        }
    }
    async getCustomerByCode(customerCode: string): Promise<CustomerResponse> {
        try {
            return await this.customerRepo.findCustomer({
                where: { customerCode: customerCode },
            })
        } catch (error) {
            throw new Error('Failed to get customer' + error)
        }
    }
}
