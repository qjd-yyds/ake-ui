// <Upload
// action="https://upload"
// beforeUpload={}
// onProgress={}
// onChange={}
// onSuccess={}
// onError={}
// onRemove={}
// >
// </Upload>
import {ChangeEvent, FC, useRef, useState} from "react";
import Button from "../Button/button";
import axios from "axios";
import {isPromise} from "../../utils/utils";

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
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void
    beforeUpload?: (file: File) => boolean | Promise<File> | void
    onChange?: (file: File) => void
}
const Upload: FC<UploadProps> = (props) => {
    const {action, onProgress, onSuccess, onError, beforeUpload, onChange} = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>([])
    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files)
        postFiles.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (isPromise(result)) {
                    result.then(post)
                } else if (result) {
                    post(file)
                }
            }
        })
    }
    const uploadFileList = (uploadFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((prevList) => {
            console.log(prevList)
            return prevList.map(file => {
                if (file.uid === uploadFile.uid) {
                    return {
                        ...file,
                        ...updateObj
                    }
                }
                return file
            })
        })
    }
    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + "upload_file",
            status: "ready",
            size: file.size,
            percent: 0,
            raw: file,
            name: file.name
        }
        setFileList([...fileList, _file])
        const formData = new FormData()
        formData.append(file.name, file)
        axios.post(action, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (e) => {
                let percent = Math.round(e.loaded / e.total * 100) || 0

                if (percent < 100) {
                    uploadFileList(_file, {
                        status: "uploading",
                        percent
                    })
                    onProgress?.(percent, file)
                }
            }
        }).then(res => {
            onSuccess?.(res.data, file)
            onChange?.(file)
            uploadFileList(_file, {
                status: "success",
                percent: 100,
                response: res.data
            })
        }).catch(error => {
            onError?.(error, file)
            onChange?.(file)
            uploadFileList(_file, {
                status: "error",
                error
            })
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ""
        }
    }
    return <div className="ake-upload-component">
        <Button btnType={"primary"} onClick={handleClick}>点击上传</Button>
        <input
            className={"ake-upload-input"}
            ref={fileInput}
            type={"file"}
            style={{display: "none"}}
            onChange={handleFileChange}
        />
    </div>
}

export default Upload
