import { bool } from 'prop-types'
import React from 'react'


const style = {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    bottom: 0,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
}

const LoadingIcon = ({isLoading}) => (
    isLoading
        ? (
            <div style={style}>
                <h1>
                    {'Loading'}
                </h1>
            </div>
        ) : (
            null
        )
)

LoadingIcon.propTypes = {
    isLoading: bool.isRequired,
}

export default LoadingIcon
