// Modeling-mode left panel (selection / history / actions) extracted from
// MeshEditorPage.jsx. Presentational: receives state + handlers as props.
export default function ModelingToolsPanel({
  selectionMode,
  setSelectionMode,
  resetSelection,
  modelingCanUndo,
  modelingCanRedo,
  handleModelingUndo,
  handleModelingRedo,
  handleDelete,
  deleteDisabled,
  handleSmooth,
  smoothDisabled,
  handleMerge,
  mergeDisabled,
  handleSubdivide,
  subdivideDisabled,
  handleBridge,
  bridgeDisabled,
  handleFillHole,
  fillDisabled
}) {
  return (
    <>{/* MODELING */}
      <div className="mesh-editor-panel__section">
        <span className="mesh-editor-panel__section-title">Selection</span>
        <div className="mesh-editor-icon-grid mesh-editor-icon-grid--double">
          <button
            type="button"
            className={`mesh-editor-icon-btn ${selectionMode === 'face' ? 'mesh-editor-icon-btn--active' : ''}`}
            onClick={() => {
              setSelectionMode('face')
              resetSelection()
            }}
            title="Face selection"
          >
            <span className="material-symbols-outlined">crop_square</span>
            <span>Faces</span>
          </button>
          <button
            type="button"
            className={`mesh-editor-icon-btn ${selectionMode === 'vertex' ? 'mesh-editor-icon-btn--active' : ''}`}
            onClick={() => {
              setSelectionMode('vertex')
              resetSelection()
            }}
            title="Vertex selection"
          >
            <span className="material-symbols-outlined">scatter_plot</span>
            <span>Vertices</span>
          </button>
        </div>
      </div>

      <div className="mesh-editor-panel__section">
        <span className="mesh-editor-panel__section-title">History</span>
        <div className="mesh-editor-icon-grid mesh-editor-icon-grid--double">
          <button type="button" className="mesh-editor-icon-btn" onClick={handleModelingUndo} disabled={!modelingCanUndo} title="Undo (Ctrl+Z)">
            <span className="material-symbols-outlined">undo</span>
            <span>Undo</span>
          </button>
          <button type="button" className="mesh-editor-icon-btn" onClick={handleModelingRedo} disabled={!modelingCanRedo} title="Redo (Ctrl+Shift+Z)">
            <span className="material-symbols-outlined">redo</span>
            <span>Redo</span>
          </button>
        </div>
      </div>

      <div className="mesh-editor-panel__section">
        <span className="mesh-editor-panel__section-title">Actions</span>
        <div className="mesh-editor-icon-grid mesh-editor-icon-grid--double">
          <button type="button" className="mesh-editor-icon-btn" onClick={handleDelete} disabled={deleteDisabled} title="Delete selection">
            <span className="material-symbols-outlined">delete</span>
            <span>Delete</span>
          </button>
          <button type="button" className="mesh-editor-icon-btn" onClick={handleSmooth} disabled={smoothDisabled} title="Smooth selected vertices">
            <span className="material-symbols-outlined">auto_fix_high</span>
            <span>Smooth</span>
          </button>
          <button type="button" className="mesh-editor-icon-btn" onClick={handleMerge} disabled={mergeDisabled} title="Merge selected vertices">
            <span className="material-symbols-outlined">merge_type</span>
            <span>Merge</span>
          </button>
          <button type="button" className="mesh-editor-icon-btn" onClick={handleSubdivide} disabled={subdivideDisabled} title="Subdivide selected faces">
            <span className="material-symbols-outlined">grid_view</span>
            <span>Subdivide</span>
          </button>
          <button type="button" className="mesh-editor-icon-btn" onClick={handleBridge} disabled={bridgeDisabled} title="Bridge selected hole segments">
            <span className="material-symbols-outlined">alt_route</span>
            <span>Bridge</span>
          </button>
          <button type="button" className="mesh-editor-icon-btn" onClick={handleFillHole} disabled={fillDisabled} title="Fill selected hole">
            <span className="material-symbols-outlined">layers_clear</span>
            <span>Fill hole</span>
          </button>
        </div>
      </div>

      <div className="mesh-editor-panel__notes">
        <span className="mesh-editor-panel__hint">Left mouse drag selects with a rectangle. Shift+drag adds or removes items.</span>
        <span className="mesh-editor-panel__hint">Middle mouse drag rotates the mesh.</span>
      </div>
    </>
  )
}
