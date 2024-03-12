/**
 * Get image format from a byte array.
 * Supports the following types:
 * - JPEG
 * - PNG
 * - GIF
 * - BMP
 * - WebP
 *
 * @example
 * ```ts
 * import { getImageFormat } from "jsr:@lala/mieruko/format";
 *
 * const data = Deno.readFileSync("test.png");
 *
 * console.log(getImageFormat(data));
 * // "png"
 * ```
 *
 * @module
 */

import { isBmp } from "../formats/bmp.ts";
import { isGif } from "../formats/gif.ts";
import { isJpeg } from "../formats/jpeg.ts";
import { isPng } from "../formats/png.ts";
import { isWebp } from "../formats/webp.ts";

/** Supported image formats */
export type ImageFormat = "jpeg" | "png" | "gif" | "bmp" | "webp" | "unknown";

/** Get image format. Supports jpeg, png, gif, bmp, webp. */
export function getImageFormat(bytes: Uint8Array): ImageFormat {
  if (isJpeg(bytes)) {
    return "jpeg";
  } else if (isPng(bytes)) {
    return "png";
  } else if (isGif(bytes)) {
    return "gif";
  } else if (isBmp(bytes)) {
    return "bmp";
  } else if (isWebp(bytes)) {
    return "webp";
  } else {
    console.warn(
      `Unknown image format. Please open an issue in https://github.com/retraigo/mieruko`
    );
    return "unknown";
  }
}
