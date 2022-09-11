// import MenuExample from "./components/Menu/example"
// import ButtonExample from "./components/Button/example"
// import TransitionExample from "./components/Transition/example"
// import AutoCompleteExample from "./components/AutoComplete/example"
// import InputExample from "./components/Input/example"
// import Draggable from "./components/Dragable/draggable";
import Upload from './components/Upload/upload'

const checkFileSize = (file: File) => {
    const size = file.size / 1024
    if (size > 50) {
        alert("不能超过50kb了")
        return false
    }
    return true
}
const filePromise = async (file: File) => {
    const newFile = new File([file], "newJop", {
        type: file.type
    })
    console.log(newFile, "====")
    return Promise.resolve(newFile)
}


function App() {

    return (
        <div className="App">
            {/*<AutoCompleteExample/>*/}
            {/*<ButtonExample/>*/}
            {/*<hr/>*/}
            {/*<MenuExample/>*/}
            {/*<hr/>*/}
            {/*<TransitionExample/>*/}
            {/*<Draggable />*/}
            <Upload
                action={"https://jsonplaceholder.typicode.com/photos"}
                onError={(err, file) => {
                    console.log(err,file, "===error")
                }}
                onProgress={(percentage, file) => {
                    console.log(percentage, "===pregress")
                }}
                onSuccess={(data, file) => {
                    console.log(data, file, "success")
                }}
                beforeUpload={filePromise}
            />
        </div>
    );
}

export default App;
