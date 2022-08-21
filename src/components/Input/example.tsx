import Input from "./input";
import {useState} from "react";

export default function Example() {
    const [inputValue, setInputValue] = useState("")
    return <>
        <Input
            placeholder="请输入内容"
            icon="download"
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value)
            }
            }
        />
    </>
}