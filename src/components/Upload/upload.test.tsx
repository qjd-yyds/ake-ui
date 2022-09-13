import Upload from "./upload";
import {UploadProps} from "./uploadProps"
import {render, RenderResult, screen} from "@testing-library/react";

jest.mock("../Icon/icon", () => {
})
const testProps: UploadProps = {
    action: "tyets.com",
    onSuccess: jest.fn(),
    onChange: jest.fn()
}
describe("测试上传组件", () => {
    beforeEach(() => {

    })
    it('should work fine', async () => {
        const {container} =  render(<Upload {...testProps}>
            click to upload
        </Upload>)
        // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
        const fileInput = container.querySelector(".ake-file-input")
        console.log(fileInput)
    });
})