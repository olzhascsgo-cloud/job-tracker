import { Job } from "../types/job";

type Props = {
  job: Job;
  onDelete: (id:number)=>void;
  onEdit: (id:number)=>void;
};

function JobCard({
  job,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="job-card">
      <h3>{job.company}</h3>
      <p>{job.position}</p>
      <span>{job.status}</span>

      <div>
        <button
          onClick={() => onEdit(job.id)}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(job.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default JobCard;