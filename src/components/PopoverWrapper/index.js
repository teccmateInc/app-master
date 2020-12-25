import { useBooleanToggle } from 'hooks'
import { object, oneOfType, string } from 'prop-types'
import React from 'react'
import { Popover } from 'react-bootstrap'
import DefaultTrigger from './DefaultTrigger'

// makes DefaultContent importable through this module
export DefaultContent from './DefaultContent'

// NOTE - triggerId here MUST be a unique value to work properly.
// This is because of how reactstrap handles event binding.
// (using ids to traverse the DOM.)
// TODO - using react-bootstrap instead of reactstrap
// TODO - do I need to revise this code?

// If there are duplicate ids (triggerId) in the DOM,
// the <Popover /> is not guaranteed to work properly.

const PopoverWrapper = props => {
    const {
        children,
        popoverOptions,
        popoverTrigger,
        triggerClasses,
        triggerId,
    } = props

    const [isOpen, toggleIsOpen] = useBooleanToggle(false)

    return (
        <React.Fragment>
      <span
          id={triggerId}
          className={triggerClasses}>
        {popoverTrigger || <DefaultTrigger/>}
      </span>
            <Popover
                delay={{
                    show: 100,
                    hide: 100,
                }}
                placement={'left'}
                trigger={'hover'}
                // NOTE - the spread operator placement here with props after
                // it is intentional. this way we will not allow inherited
                // props to override those values as passed to the <Popover /> itself.
                {...popoverOptions}
                isOpen={isOpen}
                toggle={toggleIsOpen}
                target={triggerId}>
                {children}
            </Popover>
        </React.Fragment>
    )
}

PopoverWrapper.propTypes = {
    children: oneOfType([
                            object,
                            string,
                        ]),
    popoverOptions: object,
    popoverTrigger: oneOfType([
                                  object,
                                  string,
                              ]),
    triggerClasses: string,
    triggerId: string.isRequired,
}

export default PopoverWrapper
