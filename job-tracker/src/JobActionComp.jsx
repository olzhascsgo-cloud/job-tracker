function JobActionsComponent(props) {
  return (
    <div className="job-actions">
      <button onClick={() => props.onDelete(props.job.id)}>
        Delete
      </button>

      <button onClick={() => props.onEdit(props.job.id)}>
        Edit
      </button>
    </div>
  );
}
export default JobActionsComponent