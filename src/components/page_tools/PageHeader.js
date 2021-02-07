import { func, string } from 'prop-types'
import React from 'react'


export default function PageHeader({title, addName, addAction}) {
    return (
        <div className="page-tools-bar" style={{marginBottom: '5px'}}>
            <div className="page-tools-add-action" onClick={addAction}>
                <div id={addName} style={{margin: 'auto'}}>
                    <span className="page-tools-icon fa fa-plus-circle"/>{addName}
                </div>
            </div>
        </div>
    )
}

PageHeader.propTypes = {
    title: string.isRequired,
    addName: string.isRequired,
    addAction: func.isRequired,
}
