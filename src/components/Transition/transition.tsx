import React from "react";
import {CSSTransition} from "react-transition-group";
import type {CSSTransitionProps} from "react-transition-group/CSSTransition";

type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-bottom" | "zoom-in-right"
type TransitionProps = {
    animation?: AnimationName
} & CSSTransitionProps

const Transition: React.FC<TransitionProps> = (props) => {
    const {children, classNames, animation, ...restProps} = props
    return <CSSTransition {...restProps} classNames={classNames ?? animation}>{children}</CSSTransition>

}
Transition.defaultProps = {
    unmountOnExit:true,
}
export default Transition