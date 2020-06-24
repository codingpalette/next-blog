import {useState, useCallback} from 'react';

export default (initialValue = false) => {
    const [value, setValue] = useState(initialValue);

    const onHandler = useCallback(() => {
        setValue(true)
    }, [])

    const offHandler = useCallback(() => {
        setValue(false)
    }, [])

    return[value, onHandler, offHandler]
}