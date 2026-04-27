import { Job, JobStatus } from "../types/job";


type Props = {
  
  job: Job;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onChangeStatus: (id: number, newStatus: JobStatus) => void;
};

function JobCard({ job, onDelete, onEdit, onChangeStatus }: Props) {
 
  return (
    <div className="job-card">
  <div className="job-card-header">
    <h3>{job.company}</h3>
    <span className="job-status">{job.status}</span>
  </div>

  <p className="job-position">{job.position}</p>

  {job.notes && (
    <p className="job-notes">Notes: {job.notes}</p>
  )}

  <p className="job-date">
    {job.createdAt
      ? new Date(job.createdAt).toLocaleDateString()
      : "No date"}
  </p>
      
      <div className="actions">
        <label>Move to:</label>

        <select className={`job-status ${job.status}`}
          value={job.status}
          onChange={(e) =>
            onChangeStatus(job.id, e.target.value as JobStatus)
          }
        >
          <option value="applied">applied</option>
          <option value="invited">invited</option>
          <option value="interview">interview</option>
          <option value="offer">offer</option>
          <option value="rejected">rejected</option>
        </select>

        <button onClick={() => onEdit(job.id)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </div>
  );
}

export default JobCard;