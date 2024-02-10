import { useState } from 'react'

import { BarLoader } from 'react-spinners'

import { useStore } from 'src/stores/store'

const Guide = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const loading = useStore((state) => state.loadingWheel)

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
          <div>
            <button className="guide-buttons" onClick={() => setIsOpen(false)}>
              &#x2237;
            </button>
          </div>
          <p>paste a link or slug to the channel you want to explore</p>
          <p>scroll to zoom </p>
          <p>
            hold <em>shift</em> and drag to pan
          </p>
          <div className="guide-theme">
            <button onClick={setTheme}>light / dark</button>
          </div>
        </div>
      ) : (
        <div className="guide-closed">
          <button className="guide-buttons" onClick={() => setIsOpen(true)}>
            &#x2237;
          </button>
        </div>
      )}

      {loading ? (
        <BarLoader color={isDark ? '#fff' : '#000'} id="loading" />
      ) : null}
    </>
  )
}

export default Guide
