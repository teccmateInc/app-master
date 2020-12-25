import React from 'react'
import { Button } from 'reactstrap'

// TODO - add proper error here

class BreakStuff extends React.Component {
    breakStuff = () => {
        foo.bar()
    }

    render() {
        return (
            <Button
                color={'danger'}
                onClick={this.breakStuff}>
                {'Break stuff'}
            </Button>
        )
    }
}

export default BreakStuff
