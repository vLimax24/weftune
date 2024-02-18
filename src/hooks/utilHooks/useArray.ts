import { useState } from 'react';

export default function useArray(defaultValue: any) {
    const [array, setArray] = useState(defaultValue)

    function push(element: any) {
        setArray((a:any) => [...element, a])
    }

    function filter(callback:any) {
        setArray((a:any) => a.filter(callback))
    }

    function update(index:any, newElement:any) {
        setArray((a:any) => [
            ...a.slice(0, index),
            newElement,
            ...a.slice(index + 1, a.length - 1)
        ])
    }
    
    function remove(index:any) {
        setArray((a:any) => [...a.slice(0, index), ...a.slice(index + 1, a.length - 1)])
    }

    function clear() {
        setArray([])
    }

    return { array, set: setArray, push, filter, update, remove, clear }
}