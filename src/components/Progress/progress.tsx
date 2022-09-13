import React, {FC} from "react";
import {ThemeProps} from "../Icon/type";

export type ProgressProps = {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    styles?: React.CSSProperties
    theme?: ThemeProps
}
const progress: FC<ProgressProps> = (props) => {
    const {strokeHeight, styles, theme, percent,showText} = props
    return <div className="ake-progress-bar" style={styles}>
        <div className="ake-progress-bar-outer" style={{height: strokeHeight + "px"}}>
            <div className={`ake-progress-bar-inner color-${theme}`} style={{width: percent + "%"}}>
                {
                    showText && <span className="inner-text"/>
                }
            </div>
        </div>
    </div>
}
progress.defaultProps = {
    strokeHeight: 15,
    showText: true,
    theme: "primary"
}
export default progress