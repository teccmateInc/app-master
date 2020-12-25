import { library } from '@fortawesome/fontawesome-svg-core'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'


library.add(faDatabase)

const FaDFatabase = props => (
    <FontAwesomeIcon
        {...props}
        icon={'database'}/>
)

export default FaDFatabase
