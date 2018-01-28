import React, { Component } from 'react'
import hocLoader from 'containers/hocLoader'

class HocChild extends Component {     
    render(){
        const { currency } = this.props;
        // console.log(currency)
        // console.log(this.props)
        return (
        <div>
           As of: { currency.date ? currency.date : '???'}
           <p>1 USD = { currency.date ? currency.rates['EUR'] : 'EUR'}</p>
           <p> 1 USD = { currency.date ? currency.rates['UAN'] : 'UAN'}</p>           
            <br/>
            <br/>
            <p>Time: {this.props.timeDiff}s</p>
        </div>
        )                    
    }
}

const loaderPath = 'https://i.pinimg.com/originals/33/1c/50/331c50afc533f2045a4716b84e6aae24.gif';

export default hocLoader('currency')(loaderPath)(HocChild)