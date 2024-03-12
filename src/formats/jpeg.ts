/** Check if a given byte array is a JPEG image. */
export function isJpeg(bytes: Uint8Array): boolean {
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) {
    return true;
  }
  return false;
}

/** Get image dimensions from a JPEG byte array */
export function getImageSizeJpeg(bytes: Uint8Array): [number, number] {
  if (!isJpeg(bytes)) throw new Error(`Provided byte array is not a PNG image.`);
  const res: [number, number] = [0, 0];

  let offset = 2;

  while (offset < bytes.length) {
    if (bytes[offset] === 0xff) {
      const marker = bytes[offset + 1];
      if (
        (marker >= 0xc0 && marker <= 0xcf) ||
        (marker >= 0xc0 && marker <= 0xcf)
      ) {
        const height = (bytes[offset + 5] << 8) | bytes[offset + 6];
        const width = (bytes[offset + 7] << 8) | bytes[offset + 8];

        res[0] = width;
        res[1] = height;
        break;
      }
      offset += 2 + ((bytes[offset + 2] << 8) | bytes[offset + 3]);
    } else {
      offset++;
    }
  }
  return res;
}
