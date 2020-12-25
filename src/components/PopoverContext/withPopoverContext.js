import React from 'react'
import PopoverContext from './PopoverContext'


const withPopoverContext = Component => (
    React.memo(props => (
        <PopoverContext.Consumer>
            {({triggerPopover}) => (
                <Component
                    triggerPopover={triggerPopover}
                    {...props} />
            )}
        </PopoverContext.Consumer>
    ))
)

export default withPopoverContext
