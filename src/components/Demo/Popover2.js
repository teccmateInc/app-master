import { PopoverContextTrigger } from 'components/PopoverContext'
import React, { useCallback } from 'react'


const Popover2 = () => {
    const getPopoverContent = useCallback(() => (
        <>
            <h1>{'Foo bar'}</h1>
            <p>{'I am some popover content!'}</p>
        </>
    ))

    return (
        <p>
            {'custom popover context: '}
            <PopoverContextTrigger
                id={'popover-context-demo-2'}
                getPopoverContent={getPopoverContent}>
                {'Learn more!'}
            </PopoverContextTrigger>
        </p>
    )
}

export default Popover2
