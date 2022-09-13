import classNames from "classnames";
import {useState} from "react";
import type {FC, ReactNode, DragEvent} from "react";

type DraggerDrops = {
    onFile: (file: FileList) => void;
    children?: ReactNode
}
const Dragger: FC<DraggerDrops> = (props) => {
    const [dragOver, setDragOver] = useState(false);
    const {onFile, children} = props;
    const cls = classNames("ake-uploader-dragger", {
        "is-dragover": dragOver
    })
    const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
        e.preventDefault()
        setDragOver(over)
    }
    const handleDrop = (e:DragEvent<HTMLElement>) => {
        e.preventDefault()
        onFile(e.dataTransfer.files)
    }
    return <div
        className={cls}
        onDragOver={e => handleDrag(e, true)}
        onDragLeave={e => handleDrag(e, false)}
        onDrop={handleDrop}
    >
        {
            children
        }
    </div>
}
export default Dragger