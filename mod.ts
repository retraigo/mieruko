/**
 * # mieruko
 * Utilities for working with images.
 *
 * @example
 * ```ts
 * import { getImageFormat, getImageSize } from "jsr:@lala/mieruko";
 *
 * const data = Deno.readFileSync("test.png");
 *
 * console.log(getImageFormat(data));
 * // "png"
 *
 * console.log(getImageSize(data));
 * // { height: 1080, width: 1920 }
 * ```
 *
 * @module
 */

export { getImageFormat } from "./src/util/format.ts";
export { getImageSize } from "./src/util/image_size.ts";
