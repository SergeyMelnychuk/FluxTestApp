import React, { Component } from 'react'
import HocChild from 'containers/HocChild'
export default class HocExample extends Component {
    constructor() {
        super()
        this.state = {
            currency: {}
        }
    }
    componentWillMount() {
        setTimeout(() => {
            fetch('https://api.fixer.io/latest?base=USD')
            .then(r => r.json())
            .then(data => {
                this.setState({ currency: data})
            })
        }, 2000);
    }

    render(){
        return (
        <div style={{ background: '#fff', color: '#000', padding: 100 }}>
            <HocChild currency={this.state.currency} />
        </div>
        )                    
    }
}