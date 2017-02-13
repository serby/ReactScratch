import React from 'react'
class FastGoodCheap extends React.Component {
  constructor (props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.state = Object.assign({ budget: 50000, fast: 50, good: 50, cheap: 50 }, props)
  }

  onChange (e) {
    if (e.currentTarget.type === 'number') {
      this.setState({ [e.currentTarget.name]: e.currentTarget.value })
    } else if (e.currentTarget.type === 'checkbox') {
      this.setState({ [e.currentTarget.name]: e.currentTarget.checked })
    } else {
      const name = e.currentTarget.name
      const diff = (this.state[name] - e.currentTarget.value) / 2
      let leftOver = 0
      const filtered = ['fast', 'good', 'cheap'].filter(property => property !== name)
      const newState = filtered.reduce((p, c) => {
        const extra = Number(p[c]) + Number(diff)
        leftOver = Math.max(0, extra - 100)
        p[c] = Math.min(extra, 100)
        return p
      }, this.state)
      filtered.reduce((p, c) => {
        if (leftOver > 0) {
          p[c] += leftOver
          leftOver = Math.max(0, p[c] - 100)
        }
        return p
      }, newState)
      newState[name] = e.currentTarget.value
      this.setState({ newState })
    }
  }

  render () {
    const days = (this.state.budget / 100) * (50 / this.state.fast)
    return (
      <div>
        <p>
          Budget: <input name="budget" type="number" defaultValue={this.state.budget} onChange={this.onChange} />
        </p>
        <p>
          Fast: <input name="fast" type="range" value={this.state.fast} step="1" min="0" max="100" onChange={this.onChange} />
          ({this.state.fast})
        </p>
        <p>
          Good: <input name="good" type="range" value={this.state.good} step="1" min="0" max="100" onChange={this.onChange} /> ({this.state.good})
        </p>
        <p>
          Cheap: <input name="cheap" type="range" value={this.state.cheap} step="1" min="0" max="100" onChange={this.onChange} />  ({this.state.cheap})
        </p>
        <p>Days to complete: {days}</p>
      </div>
    )
  }
}

FastGoodCheap.propTypes = {
  budget: React.PropTypes.string,
  fast: React.PropTypes.number,
  good: React.PropTypes.number,
  cheap: React.PropTypes.number
}

export default FastGoodCheap
