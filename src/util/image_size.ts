/**
 * Get image dimensions from a byte array.
 * Supports the following types:
 * - JPEG
 * - PNG
 * - GIF
 * - BMP
 * - WebP
 *
 * @example
 * ```ts
 * import { getImageSize } from "jsr:@lala/mieruko/size";
 *
 * const data = Deno.readFileSync("test.png");
 *
 * console.log(getImageSize(data));
 * // { height: 1080, width: 1920 }
 * ```
 *
 * @module
 */

import { getImageSizeGif } from "../formats/gif.ts";
import { getImageSizeJpeg } from "../formats/jpeg.ts";
import { getImageSizeBmp } from "../formats/bmp.ts";
import { getImageSizeWebp } from "../formats/webp.ts";
import { getImageSizePng } from "../formats/png.ts";
import { getImageFormat } from "./format.ts";

/** Get image dimensions from a byte array. */
export function getImageSize(bytes: Uint8Array): {
  width: number;
  height: number;
} {
  const res = { width: 0, height: 0 };
  const format = getImageFormat(bytes);
  switch (format) {
    case "jpeg":
      [res.width, res.height] = getImageSizeJpeg(bytes);
      break;
    case "png":
      [res.width, res.height] = getImageSizePng(bytes);
      break;
    case "gif":
      [res.width, res.height] = getImageSizeGif(bytes);
      break;
    case "bmp":
      [res.width, res.height] = getImageSizeBmp(bytes);
      break;
    case "webp":
      [res.width, res.height] = getImageSizeWebp(bytes);
      break;
    case "unknown":
    default:
      break;
  }
  return res;
}
