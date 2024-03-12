const MAX_SIZE = 16383;

/** Check if a given byte array is a WebP image. */
export function isWebp(bytes: Uint8Array): boolean {
  if (
    bytes[0] === 82 &&
    bytes[1] === 73 &&
    bytes[2] === 70 &&
    bytes[3] === 70 &&
    bytes[8] === 87 &&
    bytes[9] === 69 &&
    bytes[10] === 66 &&
    bytes[11] === 80
  ) {
    return true;
  }
  return false;
}

/** Get image dimensions from a WebP byte array */
export function getImageSizeWebp(bytes: Uint8Array): [number, number] {
  if (!isWebp(bytes))
    throw new Error(`Provided byte array is not a PNG image.`);

  const res: [number, number] = [0, 0];

  let offset = 12;
  while (offset < bytes.length) {
    const chunkID = String.fromCharCode(...bytes.slice(offset, offset + 4));
    console.log(chunkID)
    const chunkSize =
      (bytes[offset + 4] << 0) |
      (bytes[offset + 5] << 8) |
      (bytes[offset + 6] << 16) |
      (bytes[offset + 7] << 24);

    if (chunkID === "VP8X") {
      const width =
        (bytes[offset + 14] << 16) |
        (bytes[offset + 13] << 8) |
        bytes[offset + 12];

      const height =
        (bytes[offset + 17] << 16) |
        (bytes[offset + 16] << 8) |
        bytes[offset + 15];

      res[0] = width + 1;
      res[1] = height + 1;
      break;
    } else if (chunkID === "VP8 ") {
      const view = new DataView(bytes.buffer);
      const width = view.getUint16(offset + 14, true) & MAX_SIZE;
      const height = view.getUint16(offset + 16, true) & MAX_SIZE;

      res[0] = width;
      res[1] = height;
      break;
    } else if (chunkID === "VP8L") {
      const view = new DataView(bytes.buffer);
      const dat = view.getUint32(offset + 9, true);
      const width = dat & MAX_SIZE;
      const height = (dat >> 14) & MAX_SIZE;

      res[0] = width + 1;
      res[1] = height + 1;
      break;
    } else {
      // Move to the next chunk
      offset += chunkSize + 8;
    }
  }
  return res;
}
