import { library } from '@fortawesome/fontawesome-svg-core'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faExclamationCircle)

const FaExclamationCircle = props => (
    <FontAwesomeIcon
        {...props}
        icon={'exclamation-circle'}/>
)

export default FaExclamationCircle
