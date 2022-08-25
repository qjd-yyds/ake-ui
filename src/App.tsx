// import MenuExample from "./components/Menu/example"
// import ButtonExample from "./components/Button/example"
// import TransitionExample from "./components/Transition/example"
// import AutoCompleteExample from "./components/AutoComplete/example"
// import InputExample from "./components/Input/example"
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";

function App() {
    const [title, setTitle] = useState("dass")
    const hanldeOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const file = files[0]
            const formData = new FormData()
            formData.append(file.name, file)
            console.log(formData)
            axios.post("https://jsonplaceholder.typicode.com/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                console.log(res)
            })
        }
    }

    return (
        <div className="App">
            <h2>{title}</h2>
            <input type="file" name="myfile" onChange={hanldeOnchange}/>
            {/*<AutoCompleteExample/>*/}
            {/*<ButtonExample/>*/}
            {/*<hr/>*/}
            {/*<MenuExample/>*/}
            {/*<hr/>*/}
            {/*<TransitionExample/>*/}
        </div>
    );
}

export default App;
