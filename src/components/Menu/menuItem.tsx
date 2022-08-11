import classNames from 'classnames';
import { FC, useContext } from 'react';
import { AKE_PREFIX } from '../constants';
import { MenuContext } from './menu';
import type { MueuItemProps } from './type';

const MenuItem: FC<MueuItemProps> = props => {
	const context = useContext(MenuContext);
	const prefix = AKE_PREFIX;
	const { children, index, disabled, className, style } = props;
	const classes = classNames(prefix + '-menu-item', className, {
		'is-disabled': disabled,
		'is-active': context.index === index
	});
	const handleClick = () => {
		if (!disabled && context.onSelect) {
			context.onSelect(index!);
		}
	};
	return (
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	);
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
