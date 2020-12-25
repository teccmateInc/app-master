import { LoadingIcon } from 'components'
import { node } from 'prop-types'
import React, { useCallback, useState } from 'react'
import LoadingContext from './LoadingContext'

const LoadingProvider = ({ children }) => {
  const [isLoading, toggleLoading] = useState(0)

  const loadingWrapper = useCallback(async (action) => {
    let res = null
    toggleLoading((isLoading) => ++isLoading)
    try {
      res = await action()
    } catch (err) {
      console.warn(err)
    }
    toggleLoading((isLoading) => (isLoading ? --isLoading : 0))
    return res
  })

  return (
    <LoadingContext.Provider value={loadingWrapper}>
      {children}
      <LoadingIcon isLoading={!!isLoading} />
    </LoadingContext.Provider>
  )
}

LoadingProvider.propTypes = {
  children: node.isRequired,
}

export default LoadingProvider
