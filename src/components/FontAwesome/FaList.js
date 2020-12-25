import { library } from '@fortawesome/fontawesome-svg-core'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faList)

const FaList = props => (
    <FontAwesomeIcon
        {...props}
        icon={'list'}/>
)

export default FaList
