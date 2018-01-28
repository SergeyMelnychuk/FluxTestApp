import React, { Component } from 'react'
//import { Provider } from 'react-redux'
import store from 'store'
window.store = store

export default class App extends Component {
	render() {
		return (				
			<div class="container clearfix">Hello!!!</div>
		)
	}
}