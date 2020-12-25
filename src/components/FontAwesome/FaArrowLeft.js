import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faArrowLeft)

const FaArrowLeft = props => (
    <FontAwesomeIcon
        {...props}
        icon={'arrow-left'}/>
)

export default FaArrowLeft
