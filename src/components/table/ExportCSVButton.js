import { faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { bool, object } from 'prop-types'
import React from 'react'
import { Button } from 'react-bootstrap'


const ExportCSVButton = ({
                             props,
                             disabled
                         }) => {
    const handleClick = () => {
        props.onExport()
    }

    return (
        <div
            className="text-right"
        >
            <Button
                variant="danger"
                className="btn-block"
                onClick={handleClick}
                disabled={disabled}
            >
                <FontAwesomeIcon
                    icon={faFileDownload}
                    className={'text-center'}
                    aria-hidden="true"/>
                &nbsp;Export CSV
            </Button>
        </div>
    )
}

ExportCSVButton.propTypes = {
    props: object.isRequired,
    disabled: bool,
}

ExportCSVButton.defaultProps = {
    disabled: false,
}

export default ExportCSVButton
