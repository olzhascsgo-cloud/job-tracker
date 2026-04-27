import JobCard from "./JobCard";
import { Job, JobStatus } from "../types/job";

type Props = {
  jobs: Job[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onChangeStatus: (id: number, newStatus: JobStatus) => void;
};

function JobBoard(props: Props) {
  const statuses: JobStatus[] = [
    "applied",
    "invited",
    "interview",
    "offer",
    "rejected",
  ];

  return (
    <div className="job-board">
      {statuses.map((status) => (
        <div key={status} className="job-column">
          <h3>{status}</h3>

          {props.jobs
            .filter((job) => job.status === status)
            .map((job) => (
              <JobCard
                
                key={job.id}
                job={job}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
                onChangeStatus={props.onChangeStatus}
              />
            ))}
        </div>
      ))}
    </div>
  );
}

export default JobBoard;