import classNames from 'classnames';
import { Children, useState, createContext, cloneElement } from 'react';
import type { FC, FunctionComponentElement } from 'react';
import { AKE_PREFIX } from '../constants';
import { MenuProps, MenuContextProps, MueuItemProps } from './type';

export const MenuContext = createContext<MenuContextProps>({ });

const Menu: FC<MenuProps> = props => {
	const prefix = AKE_PREFIX;
	const { defaultIndex, className, mode, style, onSelect, children } = props;
	const [currentActive, setCurrentActive] = useState(defaultIndex);
	const classes = classNames(prefix + '-menu', className, {
		[prefix + '-menu-vertical']: mode === 'vertical',
		[prefix + '-menu-horizontal']: mode !== 'vertical'
	});
	const renderChildren = () => {
		return Children.map(children, (child, index) => {
			const childElement = child as FunctionComponentElement<MueuItemProps>;
			const { displayName } = childElement.type;
			if (displayName === 'MenuItem' || 'SubMenu') {
				return cloneElement(childElement, {
					index: childElement.props.index ?? index
				});
			} else {
				console.error('Warning: Menu has a child which is not a MenuItem component');
			}
		});
	};
	const passContext: MenuContextProps = {
		index: currentActive,
		onSelect: selectIndex => {
			setCurrentActive(selectIndex);
			if (onSelect) {
				onSelect(selectIndex);
			}
		},
		mode
	};
	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={passContext}>{renderChildren()}</MenuContext.Provider>
		</ul>
	);
};
Menu.defaultProps = {
	defaultIndex: "0",
	mode: 'horizontal'
};
export default Menu;
