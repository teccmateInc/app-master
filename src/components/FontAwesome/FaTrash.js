import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faTrash)

const FaTrashO = props => (
    <FontAwesomeIcon
        {...props}
        icon={'trash'}/>
)

export default FaTrashO
