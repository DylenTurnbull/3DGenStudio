import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

// (i) indicator + popover showing the parameters that produced a node's current
// result. Hovering reveals the popover; clicking pins it open until dismissed.
// Rendered via a portal so it isn't clipped by node overflow or scaled by the
// React Flow canvas transform (getBoundingClientRect already returns screen
// coordinates, so a fixed-position popover stays aligned at any zoom level).
function LastActionInfo({ lastActionParams }) {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [coords, setCoords] = useState(null)
  const btnRef = useRef(null)
  const hideTimer = useRef(null)
  const coordsRef = useRef(null)

  const visible = pinned || hovered

  const updateCoords = useCallback(() => {
    if (!btnRef.current) return
    const card = btnRef.current.closest('.graph-node__card')
      || btnRef.current.closest('.graph-node__value-card')
      || btnRef.current
    const rect = card.getBoundingClientRect()
    const next = { left: rect.right + 12, top: rect.top }
    const prev = coordsRef.current
    // Skip the state update (and re-render) when nothing moved — this runs on
    // every animation frame while the popover is open.
    if (prev && prev.left === next.left && prev.top === next.top) return
    coordsRef.current = next
    setCoords(next)
  }, [])

  const show = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
    updateCoords()
    setHovered(true)
  }, [updateCoords])

  const hide = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setHovered(false), 120)
  }, [])

  const togglePinned = useCallback(() => {
    updateCoords()
    setPinned(current => !current)
  }, [updateCoords])

  useEffect(() => () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }, [])

  // While the popover is showing, keep it glued to the node. React Flow pans
  // and drags via CSS transforms (no scroll events fire), so we track the node
  // position on every animation frame instead of listening for scroll/resize.
  useEffect(() => {
    if (!visible) return undefined
    let frame = null
    const tick = () => {
      updateCoords()
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    const handleClickOutside = event => {
      if (btnRef.current?.contains(event.target)) return
      if (document.getElementById('last-action-popover')?.contains(event.target)) return
      setPinned(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [visible, updateCoords])

  if (!lastActionParams) return null

  const { source, label, params = [], ranAt } = lastActionParams

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        className={`image-card__info-btn nodrag ${pinned ? 'image-card__info-btn--active' : ''}`}
        onMouseEnter={show}
        onMouseLeave={hide}
        onClick={togglePinned}
        title="Last action parameters"
        aria-label="Last action parameters"
      >
        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>info</span>
      </button>
      {visible && coords && createPortal(
        <div
          id="last-action-popover"
          className={`last-action-popover ${pinned ? 'last-action-popover--pinned' : ''}`}
          style={{ left: `${coords.left}px`, top: `${coords.top}px` }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <div className="last-action-popover__header">
            <span className="last-action-popover__source">{source}</span>
            {label && <span className="last-action-popover__label" title={label}>{label}</span>}
            {pinned && (
              <button
                type="button"
                className="last-action-popover__close"
                onClick={() => setPinned(false)}
                aria-label="Close"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
              </button>
            )}
          </div>
          {ranAt && (
            <div className="last-action-popover__time">{new Date(ranAt).toLocaleString()}</div>
          )}
          {params.length > 0 ? (
            <ul className="last-action-popover__list">
              {params.map((param, index) => (
                <li key={`${param.label}-${index}`} className="last-action-popover__item">
                  <span className="last-action-popover__key" title={param.label}>{param.label}</span>
                  <span className="last-action-popover__value">
                    <span className="last-action-popover__value-text">{String(param.value)}</span>
                    {param.boundFrom && (
                      <span className="last-action-popover__binding" title={`From ${param.boundFrom}`}>
                        ↳ from {param.boundFrom}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="last-action-popover__empty">No parameters recorded</div>
          )}
        </div>,
        document.body
      )}
    </>
  )
}

export default LastActionInfo
