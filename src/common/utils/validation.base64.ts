import { BadRequestException } from '@nestjs/common'

function isBase64(str: string): boolean {
    const regex = /^data:image\/[a-z]+;base64,/
    return regex.test(str)
}
export function valitateBase64(image: string): void {
    if (!isBase64(image)) {
        throw new BadRequestException([
            'The image must be a valid Base64 encoded string.',
        ])
    }
}
