import { UploadFile } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { Files } from '@utils/FileUtils';
import styles from './DropzoneContent.module.scss';
import { RefObject } from 'react';
import { OverflowTooltip } from '@components/global/OverflowTooltip/OverflowTooltip';

type DropzoneContentProps = {
  inputRef: RefObject<HTMLInputElement>;
  isDraggingOver: boolean;
  droppedFile: File | null;
};

/** Component to display the dropzone content */
export const DropzoneContent = ({ inputRef, isDraggingOver, droppedFile }: DropzoneContentProps) => {
  /**
   * Method used to click on the input type file to open the user's file explorer
   */
  const handleOpenFileExplorer = () => {
    inputRef.current?.click();
  };

  if (!droppedFile) {
    return (
      <div className={styles.emptyDropzoneContainer}>
        <UploadFile className={`${isDraggingOver && styles.zoom}`} />
        <div className={`${styles.dropIndicationContainer} ${isDraggingOver && styles.hidden}`}>
          <Typography variant="h6" textAlign={'center'} color={'primary'}>
            Drag and drop one file here
          </Typography>
          <div className={styles.orDividerContainer}>
            <div className={styles.line} />
            <Typography variant="body2" color={'primary'}>
              OR
            </Typography>
            <div className={styles.line} />
          </div>
          <Button onClick={handleOpenFileExplorer} variant="outlined">
            Choose a file
          </Button>
        </div>
      </div>
    );
  }

  const uploadedFileName = droppedFile.name;
  const uploadedFileExtension = Files.extractExtensionFromName(uploadedFileName);

  return (
    <div className={`${styles.filledDropzoneContainer} ${isDraggingOver && styles.zoomOutAndShake}`}>
      <img className={styles.pictogram} src={Files.getIconPathByFileExtension(uploadedFileExtension)} />
      <OverflowTooltip title={uploadedFileName}>
        <Typography variant="body1" color="primary" textAlign={'center'} className={'overflowEllipsis'}>
          {uploadedFileName}
        </Typography>
      </OverflowTooltip>
      <Button className={`${isDraggingOver && styles.hidden}`} onClick={handleOpenFileExplorer} variant="outlined">
        Change file
      </Button>
    </div>
  );
};
