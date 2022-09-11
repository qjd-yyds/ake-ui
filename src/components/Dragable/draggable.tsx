import {ChangeEvent, DragEvent, memo, useCallback, useMemo, useRef, useState} from "react";
import type {FC} from "react"
import classNames from "classnames";
import {AKE_PREFIX} from '../constants';

type DragableProps = {
    count?: number;
    width?: number;
    height?: number;
    padding?: number
}
type ListItem = { sort: number; name: string; image: string }
const showList: ListItem[] = [
    {
        sort: 2,
        name: 'osmo pocket',
        image: "https://w.wallhaven.cc/full/57/wallhaven-571k97.jpg",
    },
    {
        sort: 4,
        name: 'mavic pro',
        image: 'https://w.wallhaven.cc/full/dp/wallhaven-dp9kmj.png',
    },
    {
        sort: 1,
        name: 'mavic mini2',
        image: 'https://w.wallhaven.cc/full/57/wallhaven-571k97.jpg',
    },
    {
        sort: 3,
        name: '机甲大师s1',
        image: 'https://w.wallhaven.cc/full/dp/wallhaven-dp9kmj.png',
    },
    {
        sort: 0,
        name: 'mavic 2',
        image: 'https://w.wallhaven.cc/full/57/wallhaven-571k97.jpg',
    },
];

// 将元素插入到数组中到某个位置
function insertBefore<T = any>(list: T[], from: T, to?: T) {
    const copy = [...list]
    const fromIndex = copy.indexOf(from)
    if (from === to) {
        return copy
    }
    copy.splice(fromIndex, 1)
    const newToIndex = to ? copy.indexOf(to) : -1
    if (to && newToIndex >= 0) {
        copy.splice(newToIndex, 0, from)
    } else {
        copy.push(from)
    }
    return copy
}

function isEqualBy<T extends object>(a: T[], b: T[], key: keyof T) {
    const aList = a.map((item) => item[key]);
    const bList = b.map((item) => item[key]);

    let flag = true;
    aList.forEach((i, idx) => {
        if (i !== bList[idx]) {
            flag = false
        }
    })
    return flag;
}

const Draggable: FC<DragableProps> = (props) => {
    const prefixCls = AKE_PREFIX;
    const {count, width, height, padding} = props
    const [list, setList] = useState(showList)
    const dropAreaRef = useRef<HTMLDivElement>(null);
    const dropItemRef = useRef<ListItem>();
    // 先给当前传入的数据进行一个排序
    const sortedList = useMemo(() => list.slice().sort((a, b) => a.sort - b.sort), [list])
    const listHeight = useMemo(() => {
        const size = list.length
        return Math.ceil(size / count!) * height!
    }, [list])
    const updateList = useCallback((clientX: number, clientY: number) => {
        const dropRect = dropAreaRef.current?.getBoundingClientRect()
        if (dropRect) {
            const offsetX = clientX - dropRect.left
            const offsetY = clientY - dropRect.top
            const dragItem = dropItemRef.current;
            // 超出拖动区域
            if (
                !dragItem ||
                offsetX < 0 ||
                offsetX > dropRect.width ||
                offsetY < 0 ||
                offsetY > dropRect.height
            ) {
                return;
            }
            const col = Math.floor(offsetX / width!);
            const row = Math.floor(offsetY / height!);
            let currentIndex = row * count! + col
            const fromIndex = list.indexOf(dragItem);
            if (fromIndex < currentIndex) {
                // 从前往后移动
                currentIndex++;
            }
            const currentItem = list[currentIndex]

            const ordered = insertBefore(list, dragItem, currentItem);
            if (isEqualBy(ordered, list, "sort")) {
                return;
            }
            setList(ordered);
        }
    }, [list])
    const handleDragStart = (e: DragEvent<HTMLDivElement>, item: ListItem) => {
        dropItemRef.current = item;
        const el = dropAreaRef.current?.querySelector(`[data-sort="${item.sort}"]`)
        if (el) {
            el.classList.add("draggingItem")
        }
    }
    const handleDragEnd = useCallback(() => {
        const data = dropItemRef.current
        if (data) {
            const el = dropAreaRef.current?.querySelector(`[data-sort="${data.sort}"]`)
            if (el) {
                el.classList.remove("draggingItem")
            }
            dropItemRef.current = undefined
        }
    }, [])
    const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        // 防止拖动触发默认行为
        e.preventDefault()
        updateList(e.clientX, e.clientY)
    }, [updateList])
    const classes = classNames(`${prefixCls}-draggable-wrapper`)
    return <div
        ref={dropAreaRef}
        className={classes}
        style={{width: count! * (width! + padding!) + padding!}}
    >
        <div style={{height: listHeight}} className={`${prefixCls}-draggable-list`}>
            {
                sortedList.map(item => {
                    const index = list.findIndex(i => i === item)
                    // 行
                    const row = Math.floor(index / count!)
                    // 列
                    const col = index % count!
                    return <div
                        key={item.sort}
                        draggable={true}
                        onDragStart={(e) => handleDragStart(e, item)}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        className={`${prefixCls}-draggable-item`}
                        style={{
                            height: height,
                            left: col * (width! + padding!),
                            top: row * width!,
                            padding: `0 ${padding}px`
                        }}
                        data-sort={item.sort}
                    >
                        <img src={item.image} alt={item.name} width={width}/>
                    </div>
                })
            }
        </div>
    </div>
}
Draggable.defaultProps = {
    count: 5,
    width: 120,
    height: 80,
    padding: 5
}
export default memo(Draggable)