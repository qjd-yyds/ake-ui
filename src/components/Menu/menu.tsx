import classNames from 'classnames';
import { CSSProperties, FC, ReactNode, useState } from 'react';
import { createContext } from 'react';
import { AKE_PREFIX } from '../constants';
export type SelectCallback = (selectIndex: number | string) => void;
export type MenuMode = 'vertical' | 'horizontal';
export type MenuProps = {
	defaultIndex?: number | string;
	className?: string;
	mode?: MenuMode;
	style?: CSSProperties;
	onSelect?: SelectCallback;
	children?: ReactNode;
};
export type MenuContextProps = {
	onSelect?: SelectCallback;
	index?: number | string;
};
export const MenuContext = createContext<MenuContextProps>({ index: 0 });
const Menu: FC<MenuProps> = props => {
	const prefix = AKE_PREFIX;
	const { defaultIndex, className, mode, style, onSelect, children } = props;
	const [currentActive, setCurrentActive] = useState(defaultIndex);
	const classes = classNames(prefix + '-menu', className, {
		[prefix + '-menu-vertical']: mode === 'vertical'
	});
	const passContext: MenuContextProps = {
		index: currentActive,
		onSelect: (selectIndex) => {
			setCurrentActive(selectIndex);
			if (onSelect) {
				onSelect(selectIndex);
			}
		}
	};
	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={passContext}>{children}</MenuContext.Provider>
		</ul>
	);
};
Menu.defaultProps = {
	defaultIndex: 0,
	mode: 'horizontal'
};
export default Menu;
