import { node } from 'prop-types'
import React from 'react'
import { Popover } from 'react-bootstrap'
import PopoverContext from './PopoverContext'

// So... Popover (or popperjs not sure) has an issue where if you change
// the target element on a mounted Popover component, it doesn't actually
// handle the events and placement of the popover correctly.

// as a result, we need to do a work around to get a massive amount
// of rows to display while still supporting popovers for the row's cells.

const initialState = {
    content: null,
    isOpen: false,
    target: null,
}

export class PopoverProvider extends React.Component {
    static propTypes = {
        children: node.isRequired,
    }

    state = initialState

    // this is passed to Popover as the toggler
    // (is only called when closing because when open is mounted as isOpen)
    toggleOff = () => this.setState(() => initialState)

    // this is called to trigger the popover to show.
    // it will pass the id of the target element (via 'target')
    // and it will provide content to render within the popover.
    triggerPopover = (target = null, content = null) => {
        // if the popover is already showing, get out of here.
        // this is either the original target calling again
        // or another one is trying to show before this one's hidden
        // and because of how this is set up, we can't allow that.
        // also, if there is no target, then don't try to open this.
        if (this.state.isOpen || target === null) {
            return
        }

        // dynamically set the content and target of the popover
        // so that the Popover places it self relative to that element.
        this.setState(() => ({
            content,
            isOpen: true,
            target,
        }))
    }

    render() {
        const {
            triggerPopover,
            toggleOff,
        } = this

        const {
            content,
            isOpen,
            target,
        } = this.state

        return (
            <PopoverContext.Provider
                value={{triggerPopover}}>
                {this.props.children}
                {
                    target && (
                        <Popover
                            delay={{
                                show: 0,
                                hide: 10,
                            }}
                            placement={'right'}
                            target={target}
                            trigger={'hover'}
                            isOpen={isOpen}
                            toggle={toggleOff}>
                            {content}
                        </Popover>
                    )
                }
            </PopoverContext.Provider>
        )
    }
}

export default PopoverProvider
