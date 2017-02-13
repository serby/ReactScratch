import React from 'react'
import { TransitionMotion, spring } from 'react-motion'

const containerStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden'
}

const Slide = ({ children, filter, direction = 'left', style }) => {
  const willLeave = () => {
    return { x: spring(-100), zIndex: 1 }
  }
  const willEnter = () => {
    return { x: 100, zIndex: 1 }
  }

  const directions = {
    left: { transform: 'X', multi: 1 },
    right: { transform: 'X', multi: -1 },
    up: { transform: 'Y', multi: 1 },
    down: { transform: 'Y', multi: -1 }
  }
  return (
    <TransitionMotion
      willLeave={willLeave}
      willEnter={willEnter}
      styles={children
        .map((child, index) => ({ key: index, data: child, style: { x: spring(0) } }))
        .filter(filter)}>
      {items =>
        <div style={containerStyle}>
          {items.map(
            item => <div key={item.key} style={{ transform: `translate${directions[direction].transform}(${item.style.x * directions[direction].multi}%)`, ...style }}>{item.data}</div>
          )}
        </div>
      }
    </TransitionMotion>
  )
}

Slide.propTypes = {
  filter: React.PropTypes.func,
  style: React.PropTypes.object,
  direction: React.PropTypes.string,
  children: React.PropTypes.node
}

export default Slide
