import React, {useEffect, useState, KeyboardEvent, useRef} from "react";
import classNames from "classnames";
import Input from "../Input/input";
import {isPromise} from "../../utils/utils";
import Icon from "../Icon/icon";
import {useDebounceValue} from "./hooks/useDebounce";
import {useClickOutSide} from "./hooks/useClickOutSide";
import keyCode from "../../utils/keyCode";
import type {AutoCompleteProps, DataSourceType} from './type'
import Transition from "../Transition/transition";

const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
    const {fetchSuggestions, onSelect, value, renderOptions, ...restProps} = props
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
    const [inputValue, setValue] = useState(value as string)
    const [loading, setLoading] = useState(false)
    const debounceValue = useDebounceValue(inputValue)
    const [highIndex, setHighIndex] = useState(-1)
    const [showDropDown, setShowDropDown] = useState(false)
    // 防止选择item后重复请求
    const triggerSearch = useRef(false)
    const componentRef = useRef<HTMLDivElement>(null)
    // 点击任意，关闭下拉菜单
    useClickOutSide(componentRef, () => {
        setSuggestions([])
        setShowDropDown(false)
    })
    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
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
        setValue(value);
        triggerSearch.current = true;
        setShowDropDown(!!value);
        setSuggestions([]);
    }
    const handleSelect = (data: DataSourceType) => {
        setValue(data.label)
        setSuggestions([])
        onSelect && onSelect(data)
        setShowDropDown(false)
    }
    // 根据用户操作判断是否生成自定义的下拉内容
    const renderDropDownItem = (item: DataSourceType) => {
        return renderOptions ? renderOptions(item) : item.label
    }
    const HightLight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1
        }
        setHighIndex(index)
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case keyCode.ENTER:
                // 防止当前数据可能在请求，没有数据
                if (suggestions[highIndex]) {
                    triggerSearch.current = false;
                    handleSelect(suggestions[highIndex])
                }
                break
            case keyCode.UP:
                HightLight(highIndex - 1)
                break
            case keyCode.DOWN:
                HightLight(highIndex + 1)
                break
            case keyCode.ESC:
                setSuggestions([])
                break
            default :
                break
        }
    }
    const generateDropDown = () => {
        return <Transition
            in={showDropDown || loading}
            animation="zoom-in-top"
            timeout={300}
            onExited={() => setSuggestions([])}>
            <ul className="ake-suggestion-list">
                {
                    loading &&
                    <div className="suggestions-loading-icon">
                        <Icon spin icon="spinner"/>
                    </div>
                }
                {
                    suggestions.map((item, index) => {
                        const classes = classNames("suggestion-item", {
                            "is-active": highIndex === index
                        })
                        return <li
                            className={classes} key={index}
                            onClick={() => handleSelect(item)}
                        >
                            {renderDropDownItem(item)}
                        </li>
                    })
                }
            </ul>
        </Transition>
    }

    return <div className="ake-auto-complete" ref={componentRef}>
        <Input value={inputValue} onKeyDown={handleKeyDown} onChange={handleChange} {...restProps}/>

        {generateDropDown()}
    </div>
}
export default AutoComplete