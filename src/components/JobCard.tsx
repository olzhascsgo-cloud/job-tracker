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
        {job.notes &&  <p>Notes: {job.notes}</p>}
        
      <h3>{job.company}</h3>
      <p>{job.position}</p>
      <span>{job.status}</span>
      <span>{job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "No date"}</span>
      
      <div className="actions">
        <label>Move to:</label>

        <select
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
        <button onClick={() => onDelete(job.id)}>Delete</button>
      </div>
    </div>
  );
}

export default JobCard;