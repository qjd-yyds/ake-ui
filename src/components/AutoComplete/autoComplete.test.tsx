/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
import { fireEvent, findByText, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { config } from 'react-transition-group';
import AutoComplete from './autoComplete';
import type { DataSourceType, AutoCompleteProps } from './type';
config.disabled = true; // 动画效果变成同步
const testArr: DataSourceType[] = [
	{
		label: 'ab',
		value: '1'
	},
	{
		label: 'abc',
		value: '2'
	},
	{
		label: 'b',
		value: '3'
	},
	{
		label: 'c',
		value: '4'
	}
];
const testProps: AutoCompleteProps = {
	onSelect: jest.fn(),
	placeholder: '请输入',
	fetchSuggestions: query => {
		return testArr.filter(item => {
			return item.label.includes(query);
		});
	}
};
const testProps2: AutoCompleteProps = {
    fetchSuggestions: query => {
		return testArr.filter(item => {
			return item.label.includes(query);
		});
	},
    onSelect: jest.fn(),
    placeholder: 'auto-completed',
    renderOptions: (item: DataSourceType) => <span>{item.label}-{item.value}</span>
  }
  
describe('测试autoComponents组件', () => {
	it('测试基本行为', async () => {
		const { container } = render(<AutoComplete {...testProps} />);
		const node = screen.getByPlaceholderText('请输入') as HTMLInputElement;
		fireEvent.change(node, {
			target: {
				value: 'a'
			}
		});
		await waitFor(() => {
			expect(screen.getByText('ab')).toBeInTheDocument();
		});
		// 判断当前有2条数据
		expect(container.querySelectorAll('.suggestion-item').length).toEqual(2);
		// 点击第一个
		fireEvent.click(screen.getByText('ab'));
		// 点击后调用onselect方法
		expect(testProps.onSelect).toHaveBeenCalledWith({
			label: 'ab',
			value: '1'
		});
		// 输入框内容
		expect(node.value).toEqual('ab');
		// 去除提示框
		expect(container.querySelector('.ake-suggestion-list')).not.toBeInTheDocument();
	});
	it('测试键盘支持', async () => {
		const { container } = render(<AutoComplete {...testProps} />);
		const node = screen.getByPlaceholderText('请输入') as HTMLInputElement;
		// input change
		fireEvent.change(node, { target: { value: 'a' } });
		await waitFor(() => {
			expect(screen.getByText('ab')).toBeInTheDocument();
		});
		const firstResult = screen.queryByText('ab');
		const secondResult = screen.queryByText('abc');
		// 下
		fireEvent.keyDown(node, {
			keyCode: 40
		});
		expect(firstResult).toHaveClass('is-active');
		fireEvent.keyDown(node, {
			keyCode: 40
		});
		expect(secondResult).toHaveClass('is-active');
		// 上
		fireEvent.keyDown(node, {
			keyCode: 38
		});
		expect(firstResult).toHaveClass('is-active');
		// 回车
		fireEvent.keyDown(node, {
			keyCode: 13
		});
		expect(testProps.onSelect).toHaveBeenCalledWith({
			label: 'ab',
			value: '1'
		});
        expect(container.querySelector('.ake-suggestion-list')).not.toBeInTheDocument();
	});
	it('点击空白dropdown消失', async () => {
        const { container } = render(<AutoComplete {...testProps} />);
		const node = screen.getByPlaceholderText('请输入') as HTMLInputElement;
		// input change
		fireEvent.change(node, { target: { value: 'a' } });
		await waitFor(() => {
			expect(screen.getByText('ab')).toBeInTheDocument();
		});
        fireEvent.click(document)
        expect(container.querySelector('.ake-suggestion-list')).not.toBeInTheDocument();
    });
	it('测试自定义显示功能', async () => {
        const { container } = render(<AutoComplete {...testProps2} />);
		const node = screen.getByPlaceholderText('auto-completed') as HTMLInputElement;
		// input change
		fireEvent.change(node, { target: { value: 'a' } });
		await waitFor(() => {
			expect(screen.getByText('ab-1')).toBeInTheDocument();
		});
        expect(container.querySelectorAll(".suggestion-item").length).toEqual(2)
    });
	it('测试异步', () => {});
});
