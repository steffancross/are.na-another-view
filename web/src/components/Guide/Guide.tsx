import { useState } from 'react'

const Guide = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <>
      {isOpen ? (
        <div className="guide-open">
          <button onClick={() => setIsOpen(false)}>X</button>
          <p>paste a link to the channel you want to explore</p>
          <p>Scroll to zoom in and out on mouse</p>
          <p>
            hold <em>alt</em> and drag to pan
          </p>
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
