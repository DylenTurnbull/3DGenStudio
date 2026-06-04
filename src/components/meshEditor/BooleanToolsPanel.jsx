// Boolean/Displace-mode left panel (brush source, stamp transform sliders,
// apply/clear) extracted from MeshEditorPage.jsx. Presentational: state +
// handlers + refs in via props.
export default function BooleanToolsPanel({
  booleanBrushSource,
  setBooleanBrushSource,
  booleanBrushAsset,
  setBooleanBrushAsset,
  booleanBrushFile,
  setBooleanBrushFile,
  setShowBooleanBrushSelector,
  booleanBrushFileInputRef,
  hasBooleanBrushMask,
  booleanOperation,
  setBooleanOperation,
  booleanPlaceMode,
  setBooleanPlaceMode,
  booleanStampBasis,
  setBooleanStampBasis,
  booleanStampSize,
  setBooleanStampSize,
  booleanStampDepth,
  setBooleanStampDepth,
  booleanTessellation,
  setBooleanTessellation,
  booleanStampRotation,
  setBooleanStampRotation,
  booleanStampOffset,
  setBooleanStampOffset,
  booleanStampNudgeX,
  setBooleanStampNudgeX,
  booleanStampNudgeY,
  setBooleanStampNudgeY,
  booleanStampLocalGeometry,
  booleanStampMatrix,
  handleApplyBoolean,
  handleClearBooleanStamp,
  stats
}) {
  return (
    <>{/* DISPLACE */}
      <div className="mesh-editor-panel__section">
        <span className="mesh-editor-panel__section-title">Displace stamp</span>

        <div className="mesh-editor-workflow-field">
          <span>Brush source</span>
          <select
            className="mesh-editor-panel__input mesh-editor-panel__select"
            value={booleanBrushSource}
            onChange={event => setBooleanBrushSource(event.target.value)}
          >
            <option value="asset">From assets</option>
            <option value="computer">From computer</option>
          </select>
        </div>

        {booleanBrushSource === 'asset' ? (
          <button
            type="button"
            className="mesh-editor-btn mesh-editor-btn--secondary"
            onClick={() => setShowBooleanBrushSelector(true)}
          >
            <span className="material-symbols-outlined">stamp</span>
            {booleanBrushAsset ? `Brush: ${booleanBrushAsset.name}` : 'Choose displace brush…'}
          </button>
        ) : (
          <div className="mesh-editor-workflow-field">
            <input
              ref={booleanBrushFileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={event => {
                const file = event.target.files?.[0]
                if (file) {
                  setBooleanBrushFile(file)
                  setBooleanBrushAsset(null)
                }
                event.target.value = ''
              }}
            />
            <button
              type="button"
              className="mesh-editor-btn mesh-editor-btn--secondary"
              onClick={() => booleanBrushFileInputRef.current?.click()}
            >
              <span className="material-symbols-outlined">upload_file</span>
              {booleanBrushFile ? booleanBrushFile.name : 'Upload displace brush…'}
            </button>
          </div>
        )}

        <div className="mesh-editor-workflow-field">
          <span>Operation</span>
          <select
            className="mesh-editor-panel__input mesh-editor-panel__select"
            value={booleanOperation}
            onChange={event => setBooleanOperation(event.target.value)}
          >
            <option value="out">Out</option>
            <option value="in">In</option>
          </select>
        </div>

        <button
          type="button"
          className={`mesh-editor-btn ${booleanPlaceMode ? 'mesh-editor-btn--primary' : 'mesh-editor-btn--ghost'}`}
          disabled={!hasBooleanBrushMask}
          onClick={() => {
            setBooleanPlaceMode(current => !current)
            if (booleanPlaceMode) {
              setBooleanStampBasis(null)
            }
          }}
        >
          <span className="material-symbols-outlined">ads_click</span>
          {booleanPlaceMode ? 'Placing: move pointer on mesh' : 'Place stamp'}
        </button>

        <label className="mesh-editor-range-field">
          <span>Size</span>
          <input
            type="range"
            min="0.01"
            max={Math.max(0.05, stats.faces > 0 ? booleanStampSize * 4 : 1)}
            step="0.001"
            value={booleanStampSize}
            onChange={event => setBooleanStampSize(Number(event.target.value))}
            disabled={!hasBooleanBrushMask}
          />
          <strong>{booleanStampSize.toFixed(3)}</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Depth</span>
          <input
            type="range"
            min="0.001"
            max={Math.max(0.02, booleanStampDepth * 6)}
            step="0.001"
            value={booleanStampDepth}
            onChange={event => setBooleanStampDepth(Number(event.target.value))}
            disabled={!hasBooleanBrushMask}
          />
          <strong>{booleanStampDepth.toFixed(3)}</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Tessellation</span>
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={booleanTessellation}
            onChange={event => setBooleanTessellation(Number(event.target.value))}
            disabled={!hasBooleanBrushMask}
          />
          <strong>x{booleanTessellation}</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Rotation</span>
          <input
            type="range"
            min="0"
            max="360"
            step="1"
            value={booleanStampRotation}
            onChange={event => setBooleanStampRotation(Number(event.target.value))}
            disabled={!booleanStampBasis}
          />
          <strong>{booleanStampRotation}°</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Normal offset</span>
          <input
            type="range"
            min={-Math.max(0.01, booleanStampDepth * 2)}
            max={Math.max(0.01, booleanStampDepth * 2)}
            step="0.001"
            value={booleanStampOffset}
            onChange={event => setBooleanStampOffset(Number(event.target.value))}
            disabled={!booleanStampBasis}
          />
          <strong>{booleanStampOffset.toFixed(3)}</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Nudge X</span>
          <input
            type="range"
            min={-Math.max(0.01, booleanStampSize)}
            max={Math.max(0.01, booleanStampSize)}
            step="0.001"
            value={booleanStampNudgeX}
            onChange={event => setBooleanStampNudgeX(Number(event.target.value))}
            disabled={!booleanStampBasis}
          />
          <strong>{booleanStampNudgeX.toFixed(3)}</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Nudge Y</span>
          <input
            type="range"
            min={-Math.max(0.01, booleanStampSize)}
            max={Math.max(0.01, booleanStampSize)}
            step="0.001"
            value={booleanStampNudgeY}
            onChange={event => setBooleanStampNudgeY(Number(event.target.value))}
            disabled={!booleanStampBasis}
          />
          <strong>{booleanStampNudgeY.toFixed(3)}</strong>
        </label>

        <div className="mesh-editor-icon-grid mesh-editor-icon-grid--double">
          <button
            type="button"
            className="mesh-editor-btn mesh-editor-btn--primary"
            onClick={handleApplyBoolean}
            disabled={!booleanStampLocalGeometry || !booleanStampMatrix}
            title="Apply displacement operation"
          >
            <span className="material-symbols-outlined">check</span>
            <span>Apply Displace</span>
          </button>
          <button
            type="button"
            className="mesh-editor-btn mesh-editor-btn--ghost"
            onClick={handleClearBooleanStamp}
            disabled={!booleanStampBasis && !booleanPlaceMode}
            title="Clear displacement placement"
          >
            <span className="material-symbols-outlined">close</span>
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="mesh-editor-panel__notes">
        <span className="mesh-editor-panel__hint">Pick a brush, click Place stamp, move over mesh to position, then click to lock. Click the mesh again to reposition.</span>
        <span className="mesh-editor-panel__hint">Use size/depth/rotation/offset and nudge sliders for final placement.</span>
        <span className="mesh-editor-panel__hint">Click Apply Displace to commit Out / In operations.</span>
      </div>
    </>
  )
}
