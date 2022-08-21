import {RefObject, useEffect} from "react";

export function useClickOutSide(ref: RefObject<HTMLElement>, handler: (event: MouseEvent) => void) {
    useEffect(() => {
        const listener = (e: MouseEvent) => {
            if (!ref.current || ref.current.contains(e.target as Node)) {
                return
            } else {
                handler(e)
            }
        }
        document.addEventListener("click", listener)
        return () => {
            document.removeEventListener("click", listener)
        }
    }, [ref, handler])
}