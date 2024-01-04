export enum FileType {
  PNG = '.png',
  JPEG = '.jpeg,.jpg'
}

export const getFileTypeKeyFromValue = (value: FileType): keyof typeof FileType => {
  return Object.keys(FileType)[Object.values(FileType).indexOf(value)] as keyof typeof FileType;
};
