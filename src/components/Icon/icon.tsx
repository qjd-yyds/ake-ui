import React from "react";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import type {IconProps} from './type'

const Icon: React.FC<IconProps> = (props) => {
    const {className, theme, ...restProps} = props
    const classes = classNames("ake-icon", className, {
        [`icon-${theme}`]: theme
    })
    return <FontAwesomeIcon className={classes} {...restProps}/>
}
export default Icon;