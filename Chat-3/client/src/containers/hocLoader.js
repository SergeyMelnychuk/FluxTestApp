import React, { Component } from 'react'

export default  (propName) => (loaderPath) => (ChilComponent) => {
    return class hocLoader extends Component {
        componentDidMount() {
            this.startTime = Date.now()
        }

        componentWillReceiveProps() {
            this.endTime = Date.now()
        }

        propsIsEmpty() {
            const prop = this.props[propName]
            if ( !prop || (prop.hasOwnProperty('length') && !prop.length) 
                || !Object.keys(prop).length ) {
                return true;
            }
            return false;
        }

        loaderComponent() {
            return <div><img src={loaderPath} alt="loader" /></div>    
        }

        render() {       
            const newProp = {
                timeDiff: ((this.endTime - this.startTime) / 1000).toFixed(2) 
            }             
           return (
               this.propsIsEmpty() ? this.loaderComponent() : <ChilComponent {...this.props} {...newProp}/>
           )       
        }
    }
}