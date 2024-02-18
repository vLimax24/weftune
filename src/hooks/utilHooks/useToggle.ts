import { useState } from 'react'

export default function useToggle(defaultValue: boolean) {
    const [value, setValue] = useState(defaultValue)

    function toggleValue(value: boolean) {
        setValue(currentValue => 
            typeof value === 'boolean' ? value : !currentValue    
        )
    }

    return [value, toggleValue]
}

/* 

    USAGE:
    
        const [value, toggleValue] = useToggle(false/true)

        toggleValue() | Toggles between true and false
        toggleValue(true/false) | Sets the state to true or false depending on the value

*/