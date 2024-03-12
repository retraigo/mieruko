import { getImageFormat } from "../../src/util/format.ts";
import { getImageSize } from "../../src/util/image_size.ts";

const files = Deno.readDirSync("test/size");


for (const file of files) {
  if (file.name === "size.ts") continue;
  console.log(`Reading ${file.name}`);
  const fileContent = Deno.readFileSync(`test/size/${file.name}`);
  const format = getImageFormat(fileContent);
  console.log(`Format: ${format}`);
  const dimensions = getImageSize(fileContent);
  console.log(`${dimensions.width}x${dimensions.height}`);
}
