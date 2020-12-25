import { pageView } from 'helpers/googleAnalytics'
import { useEffect } from 'react'

// triggers a single GA pageview when component loads

const useGA_PageView = () => {
    useEffect(() => {
        pageView()
    }, [])
}

export default useGA_PageView
