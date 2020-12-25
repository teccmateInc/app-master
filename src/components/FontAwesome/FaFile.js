import { library } from '@fortawesome/fontawesome-svg-core'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faFile)

const FaFile = props => (
    <FontAwesomeIcon
        {...props}
        icon={'file'}/>
)

export default FaFile
