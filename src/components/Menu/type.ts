import type { CSSProperties, ReactNode } from 'react';
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
	index?: string | number;
	mode?: MenuMode;
};

export type MueuItemProps = {
	index?: number | string;
	disabled?: boolean;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
};

export type SubMenuProps = {
	classNames?: string;
	title: string;
	index?: number | string;
	children?: ReactNode;
};
