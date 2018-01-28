import React from 'react'
import { render } from 'react-dom'
import App from 'containers/App'

import { AppContainer } from 'react-hot-loader'
import 'assets/styles/style.scss'

const renderApp = Component => {
	render(
		<AppContainer>
			<Component />
		</AppContainer>,
		document.querySelector('#mount_place')
	)
}

renderApp(App)

if(module.hot) {
	module.hot.accept('containers/App', () => { renderApp(App) })
}
