import React, {ReactElement, useEffect, useState} from "react";
import Input from "./input";
import {InputProps} from "./type";
import {isPromise} from "../../utils/utils";
import Icon from "../Icon/icon";
import {useDebounceValue} from "../../hooks/useDebounce";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOptions?: (item: DataSourceType) => ReactElement
}

export type DataSourceBase = {
    label: string,
    value: string
}
export type DataSourceType<T = Record<string, any>> = T & DataSourceBase

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, value, renderOptions, ...restProps} = props
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [inputValue, setValue] = useState(value as string)
    const [loading, setLoading] = useState(false)
    const debounceValue = useDebounceValue(inputValue)
    useEffect(() => {
        if (debounceValue) {
            const res = fetchSuggestions(debounceValue)
            if (isPromise(res)) {
                setLoading(true)
                res.then((data) => {
                    setSuggestions(data)
                    setLoading(false)
                }).catch(() => {
                    setLoading(false)
                })
            } else {
                setSuggestions(res)
            }
        } else {
            setSuggestions([])
        }
    }, [fetchSuggestions, debounceValue])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim();
        setValue(value)
    }
    const handleSelect = (data: DataSourceType) => {
        setValue(data.label)
        setSuggestions([])
        onSelect && onSelect(data)
    }
    // 根据用户操作判断是否生成自定义的下拉内容
    const renderDropDownItem = (item: DataSourceType) => {
        return renderOptions ? renderOptions(item) : item.label
    }
    const generateDropDown = () => {
        return <ul>
            {
                suggestions.map((item, index) => {
                    return <li key={index} onClick={() => handleSelect(item)}>{renderDropDownItem(item)}</li>
                })
            }
        </ul>
    }

    return <div className="ake-auto-complete">
        <Input value={inputValue} onChange={handleChange} {...restProps}/>
        {
            loading && <Icon spin icon="spinner"/>
        }
        {generateDropDown()}
    </div>
}
export default AutoComplete