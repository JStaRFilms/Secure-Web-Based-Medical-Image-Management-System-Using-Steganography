import * as daikon from 'daikon';

/**
 * Reads a DICOM file and returns valid HTML Canvas ImageData.
 * @param file The DICOM file object
 */
export async function readDicomFile(file: File): Promise<ImageData> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            if (!e.target?.result) return reject('Failed to read file');

            const dataView = new DataView(e.target.result as ArrayBuffer);

            try {
                // Parse DICOM
                const image = daikon.Series.parseImage(dataView);

                if (!image) {
                    return reject('Could not parse DICOM data');
                }

                // Get raw data
                // Daikon returns raw data, we need to normalize it to 0-255 for display
                const rawData = image.getRawData();
                const numCols = image.getCols();
                const numRows = image.getRows();

                // Determine min/max for windowing/leveling (contrast)
                // If not present in tags, standard auto-windowing
                // For simplicity, we'll find min/max in the raw data
                let min = Number.MAX_VALUE;
                let max = Number.MIN_VALUE;

                for (let i = 0; i < rawData.length; i++) {
                    if (rawData[i] < min) min = rawData[i];
                    if (rawData[i] > max) max = rawData[i];
                }

                const range = max - min;

                // Create RGBA ImageData
                // DICOM is usually grayscale (1 channel), Canvas is RGBA (4 channels)
                const canvasImageData = new ImageData(numCols, numRows);
                const data = canvasImageData.data;

                for (let i = 0; i < rawData.length; i++) {
                    // Normalize to 0-255
                    const val = Math.floor(((rawData[i] - min) / range) * 255);

                    const index = i * 4;
                    data[index] = val;     // R
                    data[index + 1] = val; // G
                    data[index + 2] = val; // B
                    data[index + 3] = 255; // Alpha
                }

                resolve(canvasImageData);

            } catch (err) {
                reject('Error parsing DICOM: ' + err);
            }
        };

        reader.readAsArrayBuffer(file);
    });
}
