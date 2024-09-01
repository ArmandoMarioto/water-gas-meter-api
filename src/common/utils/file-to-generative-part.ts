export function fileToGenerativePart(path: string) {
    const imageBase64 = path.replace(/^data:image\/jpeg;base64,/, '')
    return {
        inlineData: {
            data: imageBase64,
            mimeType: 'image/jpeg',
        },
    }
}
