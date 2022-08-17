import Transition from "./transition"
import Button from "../Button/button";
import {useState} from "react";

function Example() {
    const [show, setShow] = useState(false)
    return <div>
        <Button onClick={() => setShow(!show)}>点击显示隐藏</Button>
        <Transition timeout={300} in={show} animation="zoom-in-left">
            <ul>
                <li>123</li>
                <li>123</li>
                <li>123</li>
                <li>123</li>
            </ul>
        </Transition>
        <Transition timeout={300} in={show} animation="zoom-in-left">
            <Button size={"lg"}>超大</Button>
        </Transition>
    </div>
}
export  default Example;