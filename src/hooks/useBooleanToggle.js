import { useEffect, useRef, useState, } from 'react'

// provides a boolean value that can be toggled off/on.

const useBooleanToggle = (initialState = false) => {
    const [state, setState] = useState(initialState)

    // we will track if the component which called useBooleanToggle is mounted or not.
    // This way we can avoid setting state for a component which is no longer in the DOM.
    const mounted = useRef(false)
    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])

    // make sure that mounted.current === true
    // before calling toggling state value
    const toggleBoolean = () => mounted.current && setState(!state)

    return [state, toggleBoolean]
}

export default useBooleanToggle
