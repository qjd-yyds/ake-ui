import { fireEvent, render, screen } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
const testProps: MenuProps = {
	defaultIndex: 0,
	onSelect: jest.fn(),
	className: 'test'
};
const verProps: MenuProps = {
	defaultIndex: 0,
	mode: 'vertical'
};
const GenerateMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem index={0}>active</MenuItem>
			<MenuItem index={1} disabled>
				disabled
			</MenuItem>
			<MenuItem index={2}>haha</MenuItem>
		</Menu>
	);
};
describe('测试menu组件', () => {

	// 每个case都执行
	beforeEach(() => {});
	it('测试默认props', () => {
    render(<GenerateMenu {...testProps}></GenerateMenu>);
    const menuElement = screen.getByTestId('test-menu');
    const activeElement = screen.getByText('active');
    const disabledElement = screen.getByText('disabled');
		expect(menuElement).toBeInTheDocument();
		expect(menuElement).toHaveClass('test ake-menu');
		expect(menuElement.getElementsByTagName('li').length).toEqual(3);
		expect(activeElement).toHaveClass('ake-menu-item is-active');
		expect(disabledElement).toHaveClass('ake-menu-item is-disabled');
	});
	it('测试点击是否会选中', () => {
    render(<GenerateMenu {...testProps}></GenerateMenu>);
    const activeElement = screen.getByText('active');
    const disabledElement = screen.getByText('disabled');
		const thirdItem = screen.getByText('haha');
		fireEvent.click(thirdItem);
		expect(thirdItem).toHaveClass('is-active');
		expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).toBeCalledWith(2);
    fireEvent.click(disabledElement);
    expect(activeElement).not.toHaveClass('is-active');
    expect(testProps.onSelect).not.toBeCalledWith(1);
	});
	it('测试横向和纵向', () => {
    render(<GenerateMenu {...verProps}></GenerateMenu>);
    const menuElement = screen.getByTestId('test-menu');
    expect(menuElement).toHaveClass("ake-menu-vertical ake-menu")
  });
});
