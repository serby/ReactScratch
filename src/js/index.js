import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

require('./../stylus/index.styl')

import App from './app'

// Redux Setup

const rootElement = document.getElementById('app')

// UI Setup
function renderApp (Component) {
  render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./app.js', () => {
    renderApp(require('./app').default)
  })
}
