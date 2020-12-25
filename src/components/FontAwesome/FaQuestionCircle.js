import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faQuestionCircle)

const FaQuestionCircle = props => (
    <FontAwesomeIcon
        {...props}
        icon={'question-circle'}/>
)

export default FaQuestionCircle
