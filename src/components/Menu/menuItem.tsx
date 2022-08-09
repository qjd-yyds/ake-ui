import classNames from 'classnames';
import { FC, ReactNode, CSSProperties, useContext } from 'react';
import { AKE_PREFIX } from '../constants';
import { MenuContext } from './menu';
export type MueuItemProps = {
	index: number | string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
};

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
			context.onSelect(index);
		}
	};
	return (
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	);
};

export default MenuItem;
