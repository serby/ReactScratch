import React from 'react'
import FastGoodCheap from './component/fast-good-cheap'
const style = {
  width: '300px',
  height: '600px',
  background: 'red'
}

const childStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: 'blue'
}

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { value: 0 }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    this.setState({ value: (this.state.value + 1) % this.props.children.length })
  }

  render () {
    return <div>{this.props.children}</div>
  }
}

App.propTypes = {
  children: React.PropTypes.node
}

const hashHistory = ({ onChange }) => {
  const getPath = () => document.location.hash.substring(1) || '/'
  const onHashChange = () => {
    onChange({ path: getPath() })
  }

  return {
    setup: () => window.addEventListener('hashchange', onHashChange, false),
    destroy: () => window.removeEventListener('hashchange', onHashChange),
    getPath
  }
}

class Router extends React.Component {
  constructor (props) {
    super(props)
    this.history = this.props.history({ onChange: this.onChange.bind(this) })
    this.state = { path: this.history.getPath() }
  }

  componentWillMount () {
    console.log('componentWillMount')
    this.history.setup()
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
    this.history.destroy()
  }

  onChange ({ path }) {
    this.setState({ path })
  }

  match (path) {
    return this.state.path.match(path)
  }

  render () {
    const nodes = this.props.children.filter(child => this.match(child.props.path))
    return <div className="router">{nodes}</div>
  }
}
Router.propTypes = {
  children: React.PropTypes.node,
  history: React.PropTypes.func
}

const Route = ({ children }) => {
  return <div className="route">{children}</div>
}

const Link = ({ to, children }) => {
  return <a href={`#${to}`}>{children}</a>
}

const push = ({ to }) => {
  document.location.hash = '#' + to
}
window.pushIt = push
export default () => (
  <App name="Paul">
    <Link to="/hello">Hello</Link>
    <Link to="/bob">Bob</Link>
    <Link to="/paul">Paul</Link>
    <Router history={hashHistory}>
      <Route path="/hello">
        <p>Hello, Hello, Hello, Hello, Hello, Hello, Hello, Hello</p>
      </Route>
      <Route path="/bob">
        <p>Bob, Bob, Bob, Bob, Bob, Bob, Bob, Bob, Bob, Bob, Bob, Bob</p>
      </Route>
      <Route path="/paul">
        <FastGoodCheap />
      </Route>
    </Router>
  </App>
)
