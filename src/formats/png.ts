/** Check if a given byte array is a PNG image. */
export function isPng(bytes: Uint8Array): boolean {
  if (
    bytes[0] === 137 &&
    bytes[1] === 80 &&
    bytes[2] === 78 &&
    bytes[3] === 71
  ) {
    return true;
  }
  return false;
}

/** Get image dimensions from a PNG byte array */
export function getImageSizePng(bytes: Uint8Array): [number, number] {
  if (!isPng(bytes)) throw new Error(`Provided byte array is not a PNG image.`);
  const res: [number, number] = [0, 0];
  let offset = 8;

  while (offset < bytes.length) {
    const length =
      (bytes[offset] << 24) |
      (bytes[offset + 1] << 16) |
      (bytes[offset + 2] << 8) |
      bytes[offset + 3];

    const type = String.fromCharCode(
      bytes[offset + 4],
      bytes[offset + 5],
      bytes[offset + 6],
      bytes[offset + 7]
    );

    if (type === "IHDR") {
      const width =
        (bytes[offset + 8] << 24) |
        (bytes[offset + 9] << 16) |
        (bytes[offset + 10] << 8) |
        bytes[offset + 11];

      const height =
        (bytes[offset + 12] << 24) |
        (bytes[offset + 13] << 16) |
        (bytes[offset + 14] << 8) |
        bytes[offset + 15];

      res[0] = width;
      res[1] = height;
      break;
    }
    offset += length + 12;
  }
  return res;
}
