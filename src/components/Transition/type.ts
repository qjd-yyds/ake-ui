import type {CSSTransitionProps} from "react-transition-group/CSSTransition";

export type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-bottom" | "zoom-in-right"
export type TransitionProps = {
    animation?: AnimationName;
    wrapper?: boolean // 判断是否在外层添加一个空的div防止transition丢失
} & CSSTransitionProps

