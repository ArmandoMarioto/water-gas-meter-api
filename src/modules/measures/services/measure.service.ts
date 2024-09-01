import { fileToGenerativePart, valitateBase64 } from '@/common'
import { GeminiService } from '@/external-services'
import { ListCustomerMeasureResponse } from '@/modules/customers/response/list-customer-measure.response'
import { CustomerService } from '@/modules/customers/services/customer.service'
import { ImageService } from '@/modules/imagens/services/images.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfirmInput, UploadInput } from '../input'
import { MeasureRepository } from '../repositories/measure.repositories'
import { UploadResponse } from '../response/upload-response.interface'

@Injectable()
export class MeasureService {
    constructor(
        private readonly geminiService: GeminiService,
        private readonly customerService: CustomerService,
        private readonly imagensService: ImageService,
        private readonly measureRepo: MeasureRepository
    ) {}
    async createMeasure(uploadInput: UploadInput): Promise<UploadResponse> {
        const { image, customer_code, measure_datetime, measure_type } =
            uploadInput
        valitateBase64(image)
        const DOUBLE_REPORT = await this.measureRepo.findMeasure({
            where: {
                measureDatetime: measure_datetime,
                measureType: measure_type,
            },
        })
        if (DOUBLE_REPORT) {
            throw new HttpException(
                {
                    error_code: 'DOUBLE_REPORT',
                    error_description: 'Leitura do mês já realizada',
                },
                HttpStatus.CONFLICT
            )
        }
        const customer =
            await this.customerService.createOrFindCustomer(customer_code)
        const savedImage = await this.imagensService.saveBase64Image(
            image,
            `image${customer_code}${measure_type}.jpg`
        )
        const fileName = fileToGenerativePart(image)
        const result = await this.geminiService.generateContent(
            fileName,
            measure_type
        )
        const measure = await this.measureRepo.createMeasure({
            data: {
                measureDatetime: measure_datetime,
                measureType: measure_type,
                customerId: customer.id,
                imageId: savedImage.id,
                hasConfirmed: false,
                measureValue: parseFloat(result),
            },
        })
        return {
            image_url: savedImage.url,
            measure_value: parseFloat(result),
            measure_uuid: measure.id,
        }
    }
    async confirmMeasure(confirmInput: ConfirmInput): Promise<boolean> {
        const { measure_uuid, confirmed_value } = confirmInput
        const measure = await this.measureRepo.findUniqueMeasure({
            where: { id: measure_uuid },
        })
        if (!measure) {
            throw new HttpException(
                {
                    error_code: 'MEASURE_NOT_FOUND',
                    error_description: 'Leitura do mês já realizada',
                },
                HttpStatus.NOT_FOUND
            )
        } else if (measure.hasConfirmed) {
            throw new HttpException(
                {
                    error_code: 'CONFIRMATION_DUPLICATE',
                    error_description: 'Leitura do mês já realizada',
                },
                HttpStatus.CONFLICT
            )
        }
        await this.measureRepo.updateMeasure({
            where: { id: measure_uuid },
            data: { hasConfirmed: true, measureValue: confirmed_value },
        })
        return true
    }
    async getMeasuresByCustomer(
        customerCode: string,
        measureType?: string
    ): Promise<ListCustomerMeasureResponse> {
        if (measureType && !['WATER', 'GAS'].includes(measureType)) {
            throw new HttpException(
                {
                    error_code: 'INVALID_TYPE',
                    error_description: 'Tipo de medição não permitida',
                },
                HttpStatus.BAD_REQUEST
            )
        }
        const customer =
            await this.customerService.getCustomerByCode(customerCode)
        if (!customer) {
            throw new HttpException(
                {
                    error_code: 'CUSTOMER_NOT_FOUND',
                    error_description: 'Cliente não encontrado',
                },
                HttpStatus.NOT_FOUND
            )
        }
        const measures = await this.measureRepo.findManyMeasures({
            where: {
                customerId: customer.id,
                measureType: measureType,
            },
        })
        if (measures.length === 0) {
            throw new HttpException(
                {
                    error_code: 'MEASURE_NOT_FOUND',
                    error_description: 'Nenhuma leitura encontrada',
                },
                HttpStatus.NOT_FOUND
            )
        }
        const measuresResponse = measures.map((measure) => {
            return {
                measure_uuid: measure.id,
                measure_datetime: measure.measureDatetime,
                measure_type: measure.measureType,
                has_confirmed: measure.hasConfirmed,
                image_url: measure.image.url,
            }
        })
        const response: ListCustomerMeasureResponse = {
            customer_code: customer.customerCode,
            measures: measuresResponse,
        }
        return response
    }
}
