export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';
export type NativeButtonType = React.ButtonHTMLAttributes<HTMLElement>;
export type BaseButtonProps = {
	className?: string;
	disabled?: boolean;
	size?: ButtonSize;
	btnType?: ButtonType;
	children?: React.ReactNode;
	href?: string;
};
export type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<AnchorButtonProps & BaseButtonProps & NativeButtonType>;
