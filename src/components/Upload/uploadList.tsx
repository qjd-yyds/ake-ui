import Icon from "../Icon/icon";
import type {UploadListProps} from "./uploadProps";
import {FC} from "react";
import Progress from "../Progress/progress";

const uploadList: FC<UploadListProps> = (props) => {
    const {fileList, onRemove} = props
    return <ul className="ake-upload-list">
        {
            fileList.map(item => {
                return <li className={"ake-upload-list-item"} key={item.uid}>
                    <span className={`file-name file-name-${item.status}`}>
                        <Icon icon={"file-alt"} theme={"secondary"}/>
                        {
                            item.name
                        }
                    </span>
                    <span className={"file-status"}>
                        {
                            item.status === "uploading" && <Icon icon={"spinner"} spin theme={"primary"}/>
                        }
                        {
                            item.status === "error" && <Icon icon={"times-circle"} theme={"danger"}/>
                        }
                        {
                            item.status === "success" && <Icon icon={"check-circle"} theme={"success"}/>
                        }
                    </span>
                    <span className={"file-actions"} onClick={() => {onRemove(item)}}>
                        <Icon icon={"times"} />
                    </span>
                    {
                        item.status === "uploading" && <Progress percent={item.percent || 0}/>
                    }
                </li>
            })
        }
    </ul>
}
export default uploadList