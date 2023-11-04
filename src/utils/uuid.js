/**
 * @description Generate a random uuid
 * @example uuid() // 3d5c2c5b-8d1c-4d8a-9a5b-9c9b8c7d6e5f
 *
 * @returns {string}
 */

export function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
