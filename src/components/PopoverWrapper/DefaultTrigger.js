import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faQuestionCircle)

const DefaultTrigger = () => (
    <FontAwesomeIcon
        icon='question-circle'/>
)

export default DefaultTrigger
