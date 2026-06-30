// Live progress bar for Auto UV / Auto Retopo, fed by SSE progress events.
// `progress` is { stage, frac, message } or null.
export default function MeshToolProgress({ progress }) {
  if (!progress) return null
  const frac = Math.max(0, Math.min(1, Number(progress.frac) || 0))
  const pct = Math.round(frac * 100)
  const label = progress.message || progress.stage || 'Working…'

  return (
    <div className="mesh-editor-tool-progress">
      <div className="mesh-editor-tool-progress__head">
        <span>{label}</span>
        <strong>{pct}%</strong>
      </div>
      <div className="mesh-editor-tool-progress__track">
        <div className="mesh-editor-tool-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}
