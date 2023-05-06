import Upload from "./upload";
import {UploadProps} from "./uploadProps"
import {fireEvent, render, RenderResult, screen} from "@testing-library/react";
import axios from "axios";

jest.mock("../Icon/icon", () => {
    return ({icon, onClick}: any) => {
        return <span onClick={onClick}>{icon}</span>
    }
})
jest.mock("axios")
const MockAxios = axios as jest.Mocked<typeof axios>
const testProps: UploadProps = {
    action: "tyets.com",
    onSuccess: jest.fn(),
    onChange: jest.fn(),
    onRemove: jest.fn()
}
const testFile = new File(["xxx"], "test.png", {
    type: "image/png"
})
describe("测试上传组件", () => {
    beforeEach(() => {

    })
    it('should work fine', async () => {
        const {container} = render(<Upload {...testProps}>
            click to upload
        </Upload>)
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const fileInput = container.querySelector(".ake-file-input") as HTMLInputElement
        const uploadArea = screen.getByText("click to upload")
        expect(uploadArea).toBeInTheDocument()
        expect(fileInput).not.toBeVisible()
        MockAxios.post.mockImplementation(() => {
            return Promise.resolve({
                data: "cool"
            })
        })
        fireEvent.change(fileInput, {
            target: {
                files: [testFile]
            }
        })
        expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile)
        expect(testProps.onChange).toHaveBeenCalledWith(testFile)
        // const spinner = screen.getByText("spinner")
        // console.log(spinner)
        // expect(screen.getByText("spinner")).toBeInTheDocument()
    });
})