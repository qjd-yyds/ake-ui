import React from "react"
import {fireEvent, render, screen} from "@testing-library/react";
import Input from "./input";
import type {InputProps} from "./type";

const defaultProps: InputProps = {
    placeholder: "input some text",
    onChange: jest.fn()
}
describe("测试input输入框", () => {
    it('should render default input', function () {
        render(<Input {...defaultProps}/>)
        const node = screen.getByPlaceholderText("input some text") as HTMLInputElement
        expect(node).toBeInTheDocument()
        expect(node).toHaveClass("ake-input-inner")
        fireEvent.change(node, {
            target: {
                value: "qjd"
            }
        })
        expect(defaultProps.onChange).toBeCalled()
        expect(node.value).toEqual("qjd")
    });
    it('should disabled', function () {
        render(<Input {...defaultProps} disabled/>)
        const node = screen.getByPlaceholderText("input some text") as HTMLInputElement
        expect(node.disabled).toBeTruthy()
    });
    it('should size diff', function () {
        const container = render(<Input size="lg" placeholder="large"/>).container
        // eslint-disable-next-line testing-library/no-node-access
        expect(container.querySelector(".ake-input-wrapper")).toHaveClass("ake-input-lg")
    });
    it('should render prepend and append element on prepend/append property', () => {
        const {container,queryByText} = render(<Input placeholder="pend" prefix="https://" suffix=".com"/>)
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const testContainer = container.querySelector('.ake-input-wrapper')
        expect(testContainer).toHaveClass('ake-input-group ake-input-group-prefix ake-input-group-suffix')
        // eslint-disable-next-line testing-library/prefer-presence-queries,testing-library/prefer-screen-queries
        expect(queryByText('https://')).toBeInTheDocument()
        // eslint-disable-next-line testing-library/prefer-presence-queries,testing-library/prefer-screen-queries
        expect(queryByText('.com')).toBeInTheDocument()
    })

})