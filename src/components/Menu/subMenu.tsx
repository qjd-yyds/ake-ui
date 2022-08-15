import React, {cloneElement, useContext, useRef, useState} from 'react';
import type {SubMenuProps, MueuItemProps} from './type';
import {MenuContext} from './menu';
import classNames from 'classnames';
import {AKE_PREFIX} from '../constants';
import Icon from "../Icon/components/icon";

const SubMenu: React.FC<SubMenuProps> = ({title, children, index}) => {
    const prefix = AKE_PREFIX;
    const context = useContext(MenuContext);
    // 控制移动显示开关
    const [menuOpen, setOpen] = useState(false);
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    let timer = useRef<NodeJS.Timeout | null>(null);
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        e.preventDefault();
        timer.current && clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setOpen(toggle);
        }, 100);
    };
    const clickEvent =
        context.mode === 'vertical'
            ? {
                onClick: handleClick
            }
            : {};
    const hoverEvent =
        context.mode !== 'vertical'
            ? {
                onMouseEnter: (e: React.MouseEvent) => {
                    handleMouse(e, true);
                },
                onMouseLeave: (e: React.MouseEvent) => {
                    handleMouse(e, false);
                }
            }
            : {};
    const classes = classNames(`${prefix}-menu-item submenu-item`, {
        'is-active': context.index === index,
        "is-vertical": context.mode === "vertical"
    });
    const renderChildren = () => {
        const subMenuClasses = classNames(`${prefix}-submenu`, {
            'menu-open': menuOpen,
            "is-active": context.index === index,
        });
        const childrenComponents = React.Children.map(children, (child, i) => {
            const childElement = child as React.FunctionComponentElement<MueuItemProps>;

            if (childElement.type.displayName === 'MenuItem') {
                return cloneElement(childElement, {
                    index: childElement.props.index ?? `${index}-${i}`
                });
            } else {
                console.error('warning: SubMenu has a child which is not a MenuItem component');
            }
        });
        return <ul className={subMenuClasses}>{childrenComponents}</ul>;
    };
    return (
        <li key={index} className={classes} {...hoverEvent}>
            <div className={`${prefix}-submenu-title`} {...clickEvent}>
                {title}
                <Icon theme="dark" icon="angle-down" className="arrow-icon"/>
            </div>
            {renderChildren()}
        </li>
    );
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
