import AutoComplete from "../AutoComplete/autoComplete";
import type {DataSourceType} from "./type";

export default function Example() {
    const fetchSuggestions = (query: string) => {
        return fetch(`https://api.github.com/search/users?q=${query}`)
            .then(res => res.json())
            .then(({items}) => {
                return items
                    .map((item: any) => {
                        return {
                            ...item,
                            label: item.login,
                            value: item.avatar_url
                        }
                    })
                    .slice(0, 5)
            })
    }
    const renderOptions = (data: DataSourceType) => {
        return <>
            <div>label:{data.label}</div>
            {/*<div>value:{data.value}</div>*/}
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