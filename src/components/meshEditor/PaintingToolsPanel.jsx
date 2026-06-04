// Painting-mode left panel (draw/erase mode, brush source + sliders, blend
// mode, color, clear-layers) extracted from MeshEditorPage.jsx.
// Presentational: state + handlers + refs in via props.
export default function PaintingToolsPanel({
  paintMode,
  setPaintMode,
  selectedLayerId,
  paintBrushSource,
  setPaintBrushSource,
  paintBrushAsset,
  setShowBrushSelector,
  paintBrushFileInputRef,
  paintBrushFile,
  handlePaintBrushFileChange,
  paintBrushSize,
  setPaintBrushSize,
  paintOpacity,
  setPaintOpacity,
  paintFlow,
  setPaintFlow,
  paintHardness,
  setPaintHardness,
  paintRotation,
  setPaintRotation,
  paintBlendMode,
  setPaintBlendMode,
  PAINT_BLEND_MODES,
  paintColor,
  setPaintColor,
  paintLayers,
  handleClearAllLayers
}) {
  return (
    <>{/* PAINTING */}
      <div className="mesh-editor-panel__section">
        <span className="mesh-editor-panel__section-title">Brush</span>

        <div className="mesh-editor-paint-mode-switch" role="radiogroup" aria-label="Paint mode">
          <button
            type="button"
            role="radio"
            aria-checked={paintMode === 'draw'}
            className={`mesh-editor-paint-mode-switch__btn ${paintMode === 'draw' ? 'mesh-editor-paint-mode-switch__btn--active' : ''}`}
            onClick={() => setPaintMode('draw')}
          >
            <span className="material-symbols-outlined">brush</span>
            Drawing
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={paintMode === 'erase'}
            className={`mesh-editor-paint-mode-switch__btn ${paintMode === 'erase' ? 'mesh-editor-paint-mode-switch__btn--active' : ''}`}
            disabled={!selectedLayerId}
            title={selectedLayerId ? 'Erase from the selected layer' : 'Select a layer to enable erasing'}
            onClick={() => { if (selectedLayerId) setPaintMode('erase') }}
          >
            <span className="material-symbols-outlined">ink_eraser</span>
            Erasing
          </button>
        </div>

        <div className="mesh-editor-workflow-field">
          <span>Source</span>
          <select
            className="mesh-editor-panel__input mesh-editor-panel__select"
            value={paintBrushSource}
            onChange={(e) => setPaintBrushSource(e.target.value)}
          >
            <option value="asset">From assets</option>
            <option value="computer">From computer</option>
          </select>
        </div>

        {paintBrushSource === 'asset' ? (
          <div className="mesh-editor-workflow-field">
            <button
              type="button"
              className="mesh-editor-btn mesh-editor-btn--secondary"
              onClick={() => setShowBrushSelector(true)}
            >
              <span className="material-symbols-outlined">brush</span>
              {paintBrushAsset ? `Brush: ${paintBrushAsset.name}` : 'Choose brush…'}
            </button>
          </div>
        ) : (
          <div className="mesh-editor-workflow-field">
            <input
              ref={paintBrushFileInputRef}
              type="file"
              accept=".png"
              style={{ display: 'none' }}
              onChange={handlePaintBrushFileChange}
            />
            <button
              type="button"
              className="mesh-editor-btn mesh-editor-btn--secondary"
              onClick={() => paintBrushFileInputRef.current?.click()}
            >
              <span className="material-symbols-outlined">upload_file</span>
              {paintBrushFile ? paintBrushFile.name : 'Upload brush PNG…'}
            </button>
          </div>
        )}

        <label className="mesh-editor-range-field">
          <span>Size</span>
          <input
            type="range" min="1" max="256" step="1"
            value={paintBrushSize}
            onChange={e => setPaintBrushSize(Number(e.target.value))}
          />
          <strong>{paintBrushSize}px</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Opacity</span>
          <input
            type="range" min="0" max="1" step="0.01"
            value={paintOpacity}
            onChange={e => setPaintOpacity(Number(e.target.value))}
          />
          <strong>{Math.round(paintOpacity * 100)}%</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Flow</span>
          <input
            type="range" min="0" max="1" step="0.01"
            value={paintFlow}
            onChange={e => setPaintFlow(Number(e.target.value))}
          />
          <strong>{Math.round(paintFlow * 100)}%</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Hardness</span>
          <input
            type="range" min="0" max="1" step="0.01"
            value={paintHardness}
            onChange={e => setPaintHardness(Number(e.target.value))}
          />
          <strong>{Math.round(paintHardness * 100)}%</strong>
        </label>
        <label className="mesh-editor-range-field">
          <span>Rotation</span>
          <input
            type="range" min="0" max="360" step="1"
            value={paintRotation}
            onChange={e => setPaintRotation(Number(e.target.value))}
          />
          <strong>{paintRotation}°</strong>
        </label>

        <div className="mesh-editor-workflow-field">
          <span>Blend mode</span>
          <select
            className="mesh-editor-panel__input mesh-editor-panel__select"
            value={paintBlendMode}
            onChange={e => setPaintBlendMode(e.target.value)}
          >
            {PAINT_BLEND_MODES.map(mode => (
              <option key={mode.value} value={mode.value}>{mode.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mesh-editor-workflow-field">
        <span>Color</span>
        <input
          type="color"
          value={paintColor}
          onChange={e => setPaintColor(e.target.value)}
        />
      </div>

      <div className="mesh-editor-panel__notes">
        <span className="mesh-editor-panel__hint">Select a brush, then click and drag on the mesh to paint.</span>
        <span className="mesh-editor-panel__hint">Each stroke creates a new layer in the panel on the right.</span>
        <span className="mesh-editor-panel__hint">Middle-click drag to orbit while painting.</span>
      </div>
      {paintLayers.length > 0 && (
        <button
          type="button"
          className="mesh-editor-btn mesh-editor-btn--ghost"
          onClick={handleClearAllLayers}
        >
          Clear all layers
        </button>
      )}
    </>
  )
}
