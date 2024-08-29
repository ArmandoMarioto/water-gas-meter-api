import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    ExceptionFilter,
} from '@nestjs/common'
import { Response } from 'express'

@Catch(BadRequestException)
export class CustomBadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: BadRequestException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()
        const exceptionResponse = exception.getResponse()

        let errorDescription = ''

        if (
            typeof exceptionResponse === 'object' &&
            'message' in exceptionResponse
        ) {
            errorDescription = (exceptionResponse as any).message.join(', ')
        } else {
            errorDescription = exception.message
        }

        response.status(status).json({
            error_code: 'INVALID_DATA',
            error_description: errorDescription,
        })
    }
}
