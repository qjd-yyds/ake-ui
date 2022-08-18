import type {InputProps} from "./type";
import type {FC} from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";

const Input: FC<InputProps> = (props) => {
    const {disabled, size, icon, prefix, suffix,style, ...restProps} = props
    // 取出所有的props
    // 计算class
    const classes = classNames("ake-input-wrapper", {
        "ake-input-disabled": disabled,
        "ake-input-group-prefix": !!prefix,
        "ake-input-group-suffix": !!suffix,
        "ake-input-group": !!suffix || !!prefix,
        [`ake-input-${size}`]: !!size,
    })
    if ("value" in props) {
        // 受控组件需要去除defaultValue
        delete props.defaultValue
        //防止传入undefined或者null报错
        restProps.value = restProps.value ?? ''
    }
    return (
        // 根据属性判断是否要添加不同的节点
        <div className={classes} style={style}>
            {prefix && <div className="ake-input-group-prefix">{prefix}</div>}
            {icon && <div className="icon-wrapper"><Icon icon={icon} title={`title-${icon}`}/></div>}
            <input
                className="ake-input-inner"
                disabled={disabled}
                {...restProps}
            />
            {suffix && <div className="ake-input-group-suffix">{suffix}</div>}
        </div>
    )
}
Input.defaultProps = {
    disabled: false
}
export default Input