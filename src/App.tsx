import MenuExample from "./components/Menu/example"
import ButtonExample from "./components/Button/example"
import { library } from "@fortawesome/fontawesome-svg-core"
import {fas} from "@fortawesome/free-solid-svg-icons"
import Icon from "./components/Icon/components/icon";
// 添加该类型所有图标
library.add(fas)
function App() {
    return (
        <div className="App">
            <Icon theme="danger" icon="arrow-down"/>
            <ButtonExample/>
            <hr/>
            <MenuExample/>

        </div>
    );
}

export default App;
