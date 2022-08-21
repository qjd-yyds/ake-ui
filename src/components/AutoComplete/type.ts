import {InputProps} from "../Input/type";
import {ReactElement} from "react";

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
