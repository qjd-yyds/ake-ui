import AutoComplete from "./autoComplete";
import type {DataSourceType} from "./autoComplete";

export default function Example() {
    // const liker = [
    //     {
    //         label: 'cook',
    //         value: "a"
    //     },
    //     {
    //         label: 'play',
    //         value: "b"
    //     }, {
    //         label: 'pope',
    //         value: "c"
    //     }, {
    //         label: 'cousins',
    //         value: "d"
    //     }, {
    //         label: 'james',
    //         value: "e"
    //     }, {
    //         label: 'AD',
    //         value: "f"
    //     }, {
    //         label: 'kuzma',
    //         value: "g"
    //     }, {
    //         label: 'McGee',
    //         value: "h"
    //     }]
    const fetchSuggestions = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
                return items.map((item: any) => {
                    return {
                        ...item,
                        label: item.login,
                        value: item.avatar_url
                    }
                })
            })
    }
    const renderOptions = (data: DataSourceType) => {
        return <>
            <h2>label:{data.label}</h2>
            <div>value:{data.value}</div>
        </>
    }
    return <>
        <AutoComplete
            onSelect={(data) => {
                console.log(data)
            }
            }
            renderOptions={renderOptions}
            fetchSuggestions={fetchSuggestions}
            placeholder="请输入内容"
            icon="download" value=""/>
    </>
}