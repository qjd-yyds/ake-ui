import {IconProp} from "@fortawesome/fontawesome-svg-core"
import {ReactElement, InputHTMLAttributes, ChangeEvent} from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size" | "prefix"> {
    disabled?: boolean;
    size?: "lg" | "sm";
    icon?: IconProp;
    prefix?: string | ReactElement;
    suffix?: string | ReactElement;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export type {
    InputProps
}