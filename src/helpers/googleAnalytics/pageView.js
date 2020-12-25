import ReactGA from 'react-ga'

// 'location' allows you to define a custom pageURL if you need to. (See <PageNotFound />)
// otherwise, this will send the page route that you're currently on.
// NOTE - this is based on hash routing.

const pageView = location => (
    ReactGA.pageview(location || window.location.hash.slice(1))
)

export default pageView
