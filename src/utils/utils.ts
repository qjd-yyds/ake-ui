export function isDef<T = any>(val:any):val is NonNullable<T> {
    return val !== undefined && val !== null
}
export function isPromise(val: any): val is Promise<any> {
    return isDef(val) && (
        typeof val.then === 'function' &&
        typeof val.catch === 'function'
    )
}
