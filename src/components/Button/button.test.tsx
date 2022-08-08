import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button';
import type { ButtonProps } from './types';
const defaultProps = {
	onClick: jest.fn()
};
const testProps: ButtonProps = {
	className: 'custom-button',
	btnType: 'primary'
};
test('our first test', () => {
	render(<Button>hello</Button>);
	const element = screen.getByText('hello');
	expect(element).toBeTruthy();
	expect(element).toBeInTheDocument();
});

describe('test button', () => {
	it('测试默认组件', () => {
		render(<Button {...defaultProps}>hello</Button>);
		const element = screen.getByText('hello');
		expect(element).toBeInTheDocument();
		expect(element.tagName).toEqual('BUTTON');
		expect(element).toHaveClass('ake-btn ake-btn-default');
		fireEvent.click(element);
		expect(defaultProps.onClick).toBeCalled();
	});
	it('不同的props', () => {
		render(<Button {...testProps}>hello</Button>);
		const element = screen.getByText('hello');
		expect(element).toBeInTheDocument();
		expect(element).toHaveClass('custom-button ake-btn ake-btn-primary');
	});
	it('如果type为link 并且href存在，渲染a链接', () => {
		render(
			<Button btnType="link" href="http://www.baidu.com">
				hello
			</Button>
		);
		const element = screen.getByText('hello');
		expect(element).toBeInTheDocument();
		expect(element.tagName).toEqual('A');
	});
	it('测试disable属性，不能点击', () => {
		const props: ButtonProps = {
			disabled: true,
      btnType:"danger",
			onClick: jest.fn()
		};
		render(<Button {...props}>hello</Button>);
		const element = screen.getByText('hello') as HTMLButtonElement;
		expect(element.disabled).toBeTruthy();
		fireEvent.click(element);
		expect(props.onClick).not.toBeCalled();
	});
});
