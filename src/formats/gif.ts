/** Check if a given byte array is a GIF image. */
export function isGif(bytes: Uint8Array): boolean {
  if (
    bytes[0] === 71 &&
    bytes[1] === 73 &&
    bytes[2] === 70 &&
    bytes[3] === 56 &&
    (bytes[4] === 55 || bytes[4] === 57) &&
    bytes[5] === 97
  ) {
    return true;
  }
  return false;
}

/** Get image dimensions from a GIF byte array */
export function getImageSizeGif(bytes: Uint8Array): [number, number] {
  if (!isGif(bytes)) throw new Error(`Provided byte array is not a GIF image.`);
  return [bytes[6] | (bytes[7] << 8), bytes[8] | (bytes[9] << 8)];
}
