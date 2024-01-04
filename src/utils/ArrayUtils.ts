export const Arrays = {
  isNotEmpty(arr: unknown[] | Readonly<unknown[]>): boolean {
    return arr.length > 0;
  },
  isEmpty(arr: unknown[] | Readonly<unknown[]>): boolean {
    return !Arrays.isNotEmpty(arr);
  }
};
