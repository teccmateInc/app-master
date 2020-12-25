import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bool, func, object, string } from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'


const SidebarButton = ({
                           text,
                           action,
                           disabled,
                           variant,
                           icon
                       }) => {
    return (
        <Button
            variant={variant}
            className="btn-block"
            onClick={action}
            disabled={disabled}
        >
            <FontAwesomeIcon
                icon={icon}
                className={'text-center'}
                aria-hidden="true"/>
            &nbsp;{text}
        </Button>)
}

SidebarButton.propTypes = {
    text: string.isRequired,
    action: func.isRequired,
    disabled: bool,
    variant: string.isRequired,
    icon: object.isRequired,
}

SidebarButton.defaultProps = {
    disabled: false,
}

export default SidebarButton
