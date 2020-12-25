import { object } from 'prop-types'
import React from 'react'

import { Button, Jumbotron, } from 'react-bootstrap'


const errWrap = {
    border: '1px solid',
}

const stackStyles = {
    maxHeight: '20vh',
    overflow: 'auto',
    whitespace: 'pre',
}

class GlobalErrorBoundary extends React.Component {
    static propTypes = {
        // TODO this is here just to illustrate the function of this Component
        // authContext: object.isRequired,
        children: object.isRequired,
    }

    state = {
        hasError: false,
        message: null,
        stack: null,
    }

    componentDidCatch(error, info) {
        console.warn(error)
        this.setState({
                          hasError: true,
                      })
    }

    render() {
        const {
            hasError,
            message,
            stack,
        } = this.state

        if (hasError) {
            return (
                <div className={'justify-content-center align-items-center row min-vh-100'}>
                    <Jumbotron
                        className={'col-sm-8 text-center'}
                        style={errWrap}>
                        <h1>{'Something went wrong.'}</h1>
                        <p>{`The application crashed with the following message:`}</p>
                        <p className={'error-message padding-top-1 padding-bottom-1'}>
                            {message}
                        </p>
                        <details>
                            <summary>{'Component Stack Trace'}</summary>
                            <pre style={stackStyles}>{stack}</pre>
                        </details>
                        <Button
                            className={'margin-0-auto'}
                            color={'primary'}
                            href={'#'}
                            onClick={e => {
                                location.reload()
                            }}>
                            {'Reload Page'}
                        </Button>
                    </Jumbotron>
                </div>
            )
        }

        return this.props.children
    }
}

export default GlobalErrorBoundary
