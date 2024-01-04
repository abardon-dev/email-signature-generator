import { FileSizeUnit } from '@appTypes/enum/global/FileSizeUnit';
import { FileType } from '@appTypes/enum/global/FileType';
import { Grid, Typography } from '@mui/material';
import { Files } from '@utils/FileUtils';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import styles from './FileUploader.module.scss';
import { Enums } from '@utils/EnumUtils';
import { DropzoneContent } from './DropzoneContent/DropzoneContent';

type FileUploaderProps = {
  value: File | null;
  allowedFileTypes: FileType[];
  sizeLimit: { size: number; unit: FileSizeUnit };
  onChange: (newUploadedFile: File | null) => void;
};

export const FileUploader = ({ value, allowedFileTypes, sizeLimit, onChange }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
  const allowedFileExtensions: string[] = allowedFileTypes.flatMap((fileType) => fileType.split(','));

  /**
   * Method used to handle the dragging over the dropzone
   * @param event dragging event
   */
  const handleDragOver = (event: React.DragEvent | undefined) => {
    //Allow dropping files on the dropzone
    event?.preventDefault();
  };

  /**
   * Method used the inform the component that the file is inside the droppable zone
   * @param event dragging event
   */
  const handleDragEnter = (event: React.DragEvent | undefined) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      setIsDraggingOver(true);
    }
  };

  /**
   * Method used the inform the component that the file is outside the droppable zone
   * @param event dragging event
   */
  const handleDragLeave = (event: React.DragEvent | undefined) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
      const { relatedTarget } = event;
      if (!relatedTarget || !event.currentTarget.contains(relatedTarget as Node)) {
        setIsDraggingOver(false);
      }
    }
  };

  /**
   * Method used to handle the drop on the dropzone
   * @param event dropping event
   */
  const handleDrop = (event: React.DragEvent | undefined) => {
    //Disable the navigator to handle the drop instead to let it to the dropzone
    event?.preventDefault();
    setIsDraggingOver(false);

    if (event?.dataTransfer.files) {
      if (event.dataTransfer.files.length > 1) {
        toast.error('You can only upload one file at a time');
      } else {
        handleNewUploadedFile(event.dataTransfer.files[0]);
      }
    }
  };

  /**
   * Method used to handle the drop of files using the system file explorer
   * @param event system file explorer upload event
   */
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    if (event?.target.files) {
      handleNewUploadedFile(event.target.files[0]);
    }
  };

  /**
   * Handle the file uploaded using system files explorer or using the dropzone
   * The method will validate the upload by checking the extension and the size of the file
   * @param newUploadedFile the file to check size and extension before validating the upload
   */
  const handleNewUploadedFile = (newUploadedFile: File | null) => {
    if (!newUploadedFile) {
      onChange(null);
    } else {
      const isFileExtensionError = Files.isFileExtensionError(newUploadedFile, allowedFileTypes);
      if (isFileExtensionError) {
        toast.error('The file extension is not allowed');
      }

      const isFileSizeError = Files.isFileSizeError(newUploadedFile, sizeLimit);
      if (isFileSizeError) {
        toast.error('The file exceeds the maximal allowed size');
      }

      if (!isFileExtensionError && !isFileSizeError) {
        onChange(newUploadedFile);
      }
    }
  };

  return (
    <Grid item container gap={0.5}>
      <div
        className={styles.dropzone}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleOnChange}
          accept={allowedFileExtensions.toString()}
          style={{ display: 'none' }}
        />
        <DropzoneContent inputRef={fileInputRef} isDraggingOver={isDraggingOver} droppedFile={value} />
      </div>
      <Typography className={styles.rulesDescription}>
        {allowedFileTypes.flatMap((fileType) => Enums.getKeyFromValue(FileType, fileType)).join(', ')} (&lt;
        {sizeLimit.size + sizeLimit.unit})
      </Typography>
    </Grid>
  );
};
