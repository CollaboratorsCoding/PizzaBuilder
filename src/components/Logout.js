import React, {Component} from 'react'

export class Logout extends Component {
    componentDidMount = () => {
        this
            .props
            .logout()
    }
    render() {

        return (
            <div></div>
        )
    }
}

export default Logout
