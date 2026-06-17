// ComfyUI workflow dropdown, shared by the AI control panels. Presentational.
export default function WorkflowSelect({ workflows, selectedWorkflowId, onChange, disabled }) {
  return (
    <label className="image-editor-label">
      ComfyUI Workflow
      <select
        className="image-editor-input"
        value={selectedWorkflowId}
        onChange={event => onChange(event.target.value)}
        disabled={disabled}
      >
        {workflows.length === 0 ? (
          <option value="">No compatible workflows</option>
        ) : [...workflows].sort((a, b) => (a.name || '').localeCompare(b.name || '')).map(workflow => (
          <option key={workflow.id} value={workflow.id}>{workflow.name}</option>
        ))}
      </select>
    </label>
  )
}
