/** Check if a given byte array is a BMP image. */
export function isBmp(bytes: Uint8Array): boolean {
  if (bytes[0] === 66 && bytes[1] === 77) {
    return true;
  }
  return false;
}

/** Get image dimensions from a BMP byte array */
export function getImageSizeBmp(bytes: Uint8Array): [number, number] {
  if (!isBmp(bytes)) throw new Error(`Provided byte array is not a BMP image.`);
  return [
    bytes[18] | (bytes[19] << 8) | (bytes[20] << 16) | (bytes[21] << 24),
    bytes[22] | (bytes[23] << 8) | (bytes[24] << 16) | (bytes[25] << 24),
  ];
}
