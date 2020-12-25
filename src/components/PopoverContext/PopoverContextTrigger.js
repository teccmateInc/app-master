import DefaultTrigger from 'components/PopoverWrapper/DefaultTrigger'
import { bool, func, node, string } from 'prop-types'
import React from 'react'
import withPopoverContext from './withPopoverContext'

// NOTE - this component MUST be used within the context of the PopoverProvider!
// This is a wrapper for what you want to present as a popover trigger.
// This handles communication with PopoverContext. You just tell it the
// id, popoverTrigger (trigger itself) and
// getPopoverContent (function that returns the JSX for the popover.)

class PopoverContextTrigger extends React.PureComponent {
    static propTypes = {
        children: node,
        disabled: bool,
        id: string.isRequired,
        getPopoverContent: func.isRequired,
        triggerClasses: string,
        triggerPopover: func.isRequired,
    }

    handleMouseOver = () => {
        const {
            disabled,
            id,
            getPopoverContent,
            triggerPopover,
        } = this.props

        // if the parent tells us to be disabled, don't trigger the Popover.
        if (disabled) {
            return
        }

        // build the content for the popover that we're about to display.
        const content = getPopoverContent()

        // display the popover now.
        triggerPopover(id, content)
    }

    render() {
        const {
            children,
            id,
            triggerClasses,
        } = this.props

        return (
            <span
                className={triggerClasses}
                id={id}
                onMouseOver={this.handleMouseOver}>
        {children || <DefaultTrigger/>}
      </span>
        )
    }
}

export default withPopoverContext(PopoverContextTrigger)
