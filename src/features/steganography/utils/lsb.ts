export const textToBinary = (text: string): string => {
    return text
        .split('')
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('')
}

export const binaryToText = (binary: string): string => {
    let text = ''
    for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8)
        text += String.fromCharCode(parseInt(byte, 2))
    }
    return text
}

// Terminator sequence to know when to stop reading (e.g., NULL char 00000000)
// Using a more unique sequence can prevent false positives, but NULL is standard for strings
const TERMINATOR = '00000000'

export async function encodeLSB(imageFile: File, secretText: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(imageFile)
        img.src = url

        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')

            if (!ctx) {
                reject(new Error('Canvas context not available'))
                return
            }

            ctx.drawImage(img, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            const binaryText = textToBinary(secretText) + TERMINATOR

            if (binaryText.length > data.length * 3) { // 3 channels (RGB) available per pixel roughly
                reject(new Error('Text is too long for this image'))
                return
            }

            let binaryIndex = 0

            for (let i = 0; i < data.length; i += 4) {
                if (binaryIndex >= binaryText.length) break

                // Modify R
                if (binaryIndex < binaryText.length) {
                    data[i] = (data[i] & ~1) | parseInt(binaryText[binaryIndex])
                    binaryIndex++
                }

                // Modify G
                if (binaryIndex < binaryText.length) {
                    data[i + 1] = (data[i + 1] & ~1) | parseInt(binaryText[binaryIndex])
                    binaryIndex++
                }

                // Modify B
                if (binaryIndex < binaryText.length) {
                    data[i + 2] = (data[i + 2] & ~1) | parseInt(binaryText[binaryIndex])
                    binaryIndex++
                }
            }

            ctx.putImageData(imageData, 0, 0)

            // Return as Data URL (PNG)
            const encryptedImage = canvas.toDataURL('image/png')
            URL.revokeObjectURL(url)
            resolve(encryptedImage)
        }

        img.onerror = () => reject(new Error('Failed to load image'))
    })
}

export async function decodeLSB(imageFile: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(imageFile)
        img.src = url

        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')

            if (!ctx) {
                reject(new Error('Canvas context not available'))
                return
            }

            ctx.drawImage(img, 0, 0)
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            let binaryText = ''

            for (let i = 0; i < data.length; i += 4) {
                // Read R
                binaryText += (data[i] & 1).toString()
                if (binaryText.endsWith(TERMINATOR)) break

                // Read G
                binaryText += (data[i + 1] & 1).toString()
                if (binaryText.endsWith(TERMINATOR)) break

                // Read B
                binaryText += (data[i + 2] & 1).toString()
                if (binaryText.endsWith(TERMINATOR)) break
            }

            if (binaryText.endsWith(TERMINATOR)) {
                binaryText = binaryText.slice(0, -TERMINATOR.length)
            } else {
                // Technically could fail to find terminator if image dirty or text too long/corrupted
                // For simple labs we can try to return what we have or warn
            }

            const decodedText = binaryToText(binaryText)
            URL.revokeObjectURL(url)
            resolve(decodedText)
        }

        img.onerror = () => reject(new Error('Failed to load image'))
    })
}
