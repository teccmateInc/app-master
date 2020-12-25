import { library } from '@fortawesome/fontawesome-svg-core'
import { faHistory } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faHistory)

const FaHistory = props => (
    <FontAwesomeIcon
        {...props}
        icon={'history'}/>
)

export default FaHistory
