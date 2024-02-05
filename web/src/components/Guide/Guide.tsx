import { useState } from 'react'

const Guide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const setTheme = () => {
    if (isDark) {
      document.querySelector('body').setAttribute('data-theme', 'light')
      setIsDark(false)
    } else {
      document.querySelector('body').setAttribute('data-theme', 'dark')
      setIsDark(true)
    }
  }
  return (
    <>
      {isOpen ? (
        <div className="guide-open">
          <button onClick={() => setIsOpen(false)}>X</button>
          <p>paste a link to the channel you want to explore</p>
          <p>Scroll to zoom in and out on mouse</p>
          <p>
            hold <em>shift</em> and drag to pan
          </p>
          <div>
            <button onClick={setTheme}>light/dark</button>
          </div>
        </div>
      ) : (
        <div className="guide-closed" onClick={() => setIsOpen(true)}>
          Guide
        </div>
      )}
    </>
  )
}

export default Guide
