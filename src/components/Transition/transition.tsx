import React from "react";
import {CSSTransition} from "react-transition-group";
import type {TransitionProps} from "./type";

const Transition: React.FC<TransitionProps> = (props) => {
    const {children, classNames, animation, wrapper, ...restProps} = props;
    // @ts-ignore
    const wrapperChildren = wrapper ? <div>{children}</div> : children
    return <CSSTransition {...restProps} classNames={classNames ?? animation}>
        {wrapperChildren}
    </CSSTransition>

}
Transition.defaultProps = {
    unmountOnExit: true,
    wrapper: true
}
export default Transition