import { PopoverContextTrigger } from 'components/PopoverContext'
import React, { useCallback } from 'react'


const Popover1 = () => {
    const getPopoverContent = useCallback(() => (
        <p>{'I am some popover content!'}</p>
    ))

    return (
        <p>
            {'basic popover context: '}
            <PopoverContextTrigger
                id={'popover-context-demo-1'}
                getPopoverContent={getPopoverContent}/>
        </p>
    )
}

export default Popover1
