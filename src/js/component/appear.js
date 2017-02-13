const willLeave = () => ({ opacity: spring(0) })
const willEnter = () => ({ opacity: 0 })
const Appear = ({ children, toggle, style }) => {
  return (
    <TransitionMotion
      willLeave={willLeave}
      willEnter={willEnter}
      styles={toggle() ? [{
        key: 1,
        style: { opacity: spring(1) }
      }] : []}>
      {interpolatedStyles =>
        <div>
          {interpolatedStyles.map(config => {
            return <div key={config.key} style={{ ...config.style, ...style }}>{children}</div>
          })}
        </div>
      }
    </TransitionMotion>
  )
}
export default Appear
