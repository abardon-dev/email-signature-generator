import { FileSizeUnit } from '@appTypes/enum/global/FileSizeUnit';
import { FileType } from '@appTypes/enum/global/FileType';

export const Files = {
  /**
   * Method used to check if the uploaded file are conform with the allowed file types
   *
   * @param uploadedFile uploaded file to check
   * @param allowedFileTypes list of allowed {@link FileType}
   * @returns true if the file is conform else false
   */
  isFileExtensionError(uploadedFile: File, allowedFileTypes: FileType[]): boolean {
    const allowedFileExtensions: string[] = allowedFileTypes.flatMap((fileType) => fileType.split(','));

    return !allowedFileExtensions.some(
      (allowedFileExtension) => this.extractExtensionFromName(uploadedFile.name) === allowedFileExtension
    );
  },
  /**
   * Method used to check if all the uploaded file don't exceed the allowed file size limit
   *
   * @param uploadedFile uploaded file to check
   * @param allowedSize max file size allowed
   * @returns true if the file is conform else false
   */
  isFileSizeError(uploadedFile: File, allowedSize: { size: number; unit: FileSizeUnit }): boolean {
    const sizeAllowedInByte = Files.getSizeInByte(allowedSize.size, allowedSize.unit);

    return uploadedFile.size > sizeAllowedInByte;
  },
  /**
   * Method used to get the file size into string
   * with the size and size unit in the most readable/understandable way for the user
   *
   * @param fileSize file size
   * @returns the file size in the most readable/understandable way for the user
   */
  getSizeOfFileString(fileSize: number): string {
    if (fileSize < Math.pow(1024, 2)) {
      return `${(fileSize / 1024).toFixed(0)}${FileSizeUnit.KILOBYTE}`;
    }
    return `${(fileSize / Math.pow(1024, 2)).toFixed(0)}${FileSizeUnit.MEGABYTE}`;
  },
  /**
   * Convert the size of a file in byte
   *
   * @param size size of the file
   * @param unit unit of the file size
   * @returns the size of the file in byte
   */
  getSizeInByte(size: number, unit: FileSizeUnit): number {
    switch (unit) {
      case FileSizeUnit.BYTE:
        return size;
      case FileSizeUnit.KILOBYTE:
        return size * 1024;
      case FileSizeUnit.MEGABYTE:
        return size * Math.pow(1024, 2);
    }
  },
  /** Returns the path of the icon to display according the file extension
   *
   * @param fileExtension file extension (.pdf, .jpg, ...)
   * @returns the path of the icon to display
   */
  getIconPathByFileExtension(fileExtension: string): string {
    switch (fileExtension.toLowerCase()) {
      case '.jpg':
      case '.jpeg':
        return '/assets/img/file-icons/jpg_file.svg';
      case '.png':
        return '/assets/img/file-icons/png_file.svg';
      default:
        return '';
    }
  },
  /**
   * Method use to get the file extension using the file name
   *
   * @param fileName file name
   * @returns the file extension
   */
  extractExtensionFromName(fileName: string): string {
    if (!fileName.includes('.')) {
      return '';
    }

    const filenameExtension = fileName.split('.').pop();
    return `.${filenameExtension}`;
  }
};
