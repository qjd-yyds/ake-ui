import classNames from 'classnames';
import { ButtonProps } from './types';
import { AKE_PREFIX } from '../constants';
const Button: React.FC<ButtonProps> = props => {
	const prefixCls = AKE_PREFIX;
	const { children, btnType, size, disabled, href, className, ...other } = props;
	const classes = classNames(`${prefixCls}-btn`, className, {
		[`${prefixCls}-btn-${btnType}`]: btnType,
		[`${prefixCls}-btn-${size}`]: size,
		disabled: btnType === 'link' && disabled
	});
	if (btnType === 'link' && href) {
		// eslint-disable-next-line no-script-url
		const linkHref = disabled ? 'javascript:void(0)' : href;
		return (
			<a className={classes} {...other} href={linkHref}>
				{children}
			</a>
		);
	}
	return (
		<button disabled={disabled} className={classes} {...other}>
			{children}
		</button>
	);
};
Button.defaultProps = {
	disabled: false,
	btnType: 'default'
};
export default Button;
