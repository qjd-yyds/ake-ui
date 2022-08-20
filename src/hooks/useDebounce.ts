import {useEffect, useState} from "react";
// 延迟更新
export const useDebounceValue = (value: any, delay = 300) => {
    const [debounceValue, setDebounceValue] = useState()
    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebounceValue(value)
        }, delay)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])
    return debounceValue
}