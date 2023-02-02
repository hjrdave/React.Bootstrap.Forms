/**
 * This hook uses React Dropzone
 * Docs for this library are located https://react-dropzone.js.org/#section-components
 */
import { DropzoneOptions, useDropzone } from 'react-dropzone';

const useUpload = (options?: DropzoneOptions) => {

    const uploadState = useDropzone(options);

    return uploadState;
};

export default useUpload;