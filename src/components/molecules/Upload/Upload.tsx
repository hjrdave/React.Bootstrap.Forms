/**
 * This component uses React Dropzone
 * Docs for this library are located https://react-dropzone.js.org/#section-components
 */
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import DottedCard from '../../atoms/DottedCard';
import useNonInitialEffect from 'react-cork/use-non-initial-effect';
import useUpload from '../../../hooks/use-upload';
import { FileRejection, DropEvent } from 'react-dropzone'
import styles from './Upload.module.scss';

interface Props {
    variant?: 'light' | 'white';
    accept: string[];
    minSize?: number;
    maxSize?: number;
    maxFiles?: number;
    preventDropOnDocument?: boolean;
    noClick?: boolean;
    noKeyboard?: boolean;
    noDrag?: boolean;
    multiple?: boolean;
    noDragEventsBubbling?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    onDrop?: (data: {
        acceptedFiles: File[],
        fileRejections: FileRejection[],
        event: DropEvent | null
    }) => void;
    onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void;
    onDropRejected?: (fileRejections: FileRejection[], event: DropEvent) => void;
    onFileDialogCancel?: () => void;
    onFileDialogOpen?: () => void;
    onDragEnter?: React.DragEventHandler<HTMLElement>;
    onDragLeave?: React.DragEventHandler<HTMLElement>;
    onDragOver?: React.DragEventHandler<HTMLElement>;
}
export default function Upload({ multiple, variant, accept, maxFiles: _maxFiles, minSize: _minSize, maxSize: _maxSize, preventDropOnDocument, noClick, noKeyboard, noDrag, noDragEventsBubbling, disabled: _disabled, onDrop: _onDrop, onDropAccepted, onDropRejected, onFileDialogCancel, onFileDialogOpen, onDragEnter, onDragLeave, onDragOver, onClick }: Props) {

    const [maxFiles] = React.useState((multiple) ? (_maxFiles !== undefined) ? _maxFiles : 10 : 1);
    const [minSize] = React.useState(((_minSize !== undefined) ? _minSize : 0));
    const [maxSize] = React.useState(((_maxSize !== undefined) ? _maxSize : 10000000));
    const [event, setEvent] = React.useState<DropEvent | null>(null);
    const [acceptedFiles, setAcceptedFiles] = React.useState<File[]>([]);
    const [fileRejections, setFileRejections] = React.useState<FileRejection[]>([]);
    const disabled = (_disabled) ? true : (accept) ? true : false;

    //updates state when files are uploaded
    const onDrop = (acceptedFiles: any[], fileRejections: FileRejection[], event: DropEvent) => {
        setAcceptedFiles(acceptedFiles);
        setFileRejections(fileRejections);
        setEvent(event);
    };

    const { getRootProps, getInputProps, isDragActive } = useUpload({
        accept: accept,
        multiple: (multiple) ? true : false,
        maxFiles: maxFiles,
        minSize: minSize,
        maxSize: maxSize,
        preventDropOnDocument: preventDropOnDocument,
        noClick: noClick,
        noKeyboard: noKeyboard,
        noDrag: false/*noDrag*/,
        noDragEventsBubbling: false/*noDragEventsBubbling*/,
        disabled: false /*disabled*/,
        onDrop: onDrop,
        onDropAccepted: onDropAccepted,
        onDropRejected: onDropRejected,
        onFileDialogCancel: onFileDialogCancel,
        onFileDialogOpen: onFileDialogOpen,
        onDragEnter: onDragEnter,
        onDragLeave: onDragLeave,
        onDragOver: onDragOver
    });

    //onDrop file data
    useNonInitialEffect(() => {
        if (_onDrop) {
            _onDrop({ acceptedFiles: acceptedFiles, fileRejections: fileRejections, event: event });
        }
    }, [acceptedFiles]);

    //handles file rejections
    React.useEffect(() => {
        if (fileRejections.length > 0) {
            if (fileRejections.length > maxFiles) {
                const msg = `You may only upload ${maxFiles} ${(maxFiles === 1) ? "file" : "files"} at a time.`;
            } else {
                const invalidTypeMsg = `When importing, you must choose a file with a ${(typeof accept === 'string') ? accept : (Array.isArray(accept)) ? accept.toString() : accept} extension to import. Please choose a file with that extension.`;
                const fileToLargeMsg = `File is larger than ${maxSize} bytes`;
                fileRejections.forEach((rejection) => {
                    const fileName = rejection.file.name;
                    rejection.errors.forEach((error) => {
                        const dropzoneMsg = (error.code === 'file-invalid-type') ? invalidTypeMsg : (error.code === 'file-too-large') ? fileToLargeMsg : error.message;
                        const msg = `${fileName}: ${dropzoneMsg}`
                    });
                })
            }
        }
    }, [fileRejections]);

    return (
        <>
            <div className={'d-flex flex-column'}>
                <DottedCard onClick={onClick} className={'px-3'}>
                    <div className={`d-flex flex-column align-items-center py-3 ${(disabled) ? styles.noCursor : ''}`} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <i className={`fa-solid fa-cloud-arrow-up ${styles.icon} ${(disabled) ? styles.disabled : ''}`}></i>
                        {
                            (isDragActive) ?
                                <p className={`pt-2 mb-0 ${styles.text}`}>
                                    Upload File.
                                </p> :
                                <p className={`pt-2 mb-0 ${styles.text}`}>
                                    Drag or Click to upload files.
                                </p>
                        }
                        <div className={'d-flex'}>
                            {
                                (maxFiles > 1) ?
                                    <p className={`mb-0 me-2 ${styles.text}`}><small><i>
                                        Upload Limit: {maxFiles}</i>
                                    </small></p> : null
                            }

                            <p className={`mb-0 me-2 ${styles.text}`}><small><i>
                                Max File Size: {(maxSize / 1000000)} MB</i></small>
                            </p>
                            {
                                (typeof accept === 'string') ?
                                    <p className={`p-2 mb-0 ${styles.text}`}><small><i>File Types:{accept}.</i></small></p> :
                                    (typeof accept === 'object') ?
                                        <p className={`mb-0 ${styles.text}`} ><small><i>
                                            File Types: {(accept as any)?.map((type: any, index: number) => (<span key={index}>{type} </span>))}
                                            .</i></small></p> : <p className={`p-2 mb-0 ${styles.text}`} ><small><i>

                                                All files accepted.

                                            </i></small></p>
                            }

                        </div>
                        {
                            (acceptedFiles.length > 1) ?
                                <Button variant={'bg-none'} className={`mt-2 py-1 px-1 ${styles.clearBtn}`} onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation()
                                    setAcceptedFiles([]);
                                }}>Clear All</Button> : null
                        }
                    </div>
                </DottedCard>
                <div className={'pt-1'}>
                    {
                        acceptedFiles.map((file) => {
                            const size = (file.size / 1000000).toFixed(2);
                            const id = `${(file as any).path}-${file.size}-${file.name}`;
                            const truncatedName = file.name.substring(0, 25);
                            return (
                                <React.Fragment key={id}>
                                    <Card className={'mt-2'} onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                                        <div className={'d-flex align-items-center justify-content-between px-2'}>
                                            <p className={'p-2 mb-0'}>
                                                <small><i>{(file.name.length !== truncatedName.length) ? `${truncatedName}...` : truncatedName}</i></small>
                                            </p>
                                            <div className={'d-flex align-items-center'}>
                                                <p className={'mb-0 pe-4'}><small><i>{size} MB</i></small></p>
                                                <i className={`fa-solid fa-minus-circle text-danger cursor ${styles.remove}`} onClick={() => setAcceptedFiles(acceptedFiles.filter((file) => `${(file as any).path}-${file.size}-${file.name}` !== id))}></i>
                                            </div>

                                        </div>
                                    </Card>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>

        </>
    )
}