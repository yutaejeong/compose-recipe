export function selectMenuImage(src: string | string[]) {
  if (typeof src === "string") {
    return src;
  }
  return src[Math.floor(Math.random() * src.length)];
}
