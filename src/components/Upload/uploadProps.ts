import type {ReactNode} from "react";

export type UploadFileStatus = "success" | "ready" | "uploading" | "error"
export type UploadFile = {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any
}
export type UploadProps = {
    action: string;
    defaultFileList?: UploadFile[];
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    beforeUpload?: (file: File) => boolean | Promise<File> | void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    name?: string;
    headers?: Record<string, any>;
    data?: Record<string, any>;
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
    children?: ReactNode;
}
export type UploadListProps = {
    fileList: UploadFile[];
    onRemove: (file: UploadFile) => void
}