import { library } from '@fortawesome/fontawesome-svg-core'
import { faComments } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faComments)

const FaComments = props => (
    <FontAwesomeIcon
        {...props}
        icon={'comments'}/>
)

export default FaComments
