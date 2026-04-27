import StatBar from "./StatBar";
import { Job, JobStatus } from "../types/job";

type Props = {
  jobs: Job[];
};

function JobStats(props: Props) {
  const statuses: JobStatus[] = [
    "applied",
    "invited",
    "interview",
    "offer",
    "rejected",
  ];

  const initialValue = {
    applied: 0,
    invited: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  };

  const stats = props.jobs.reduce((acc, curr) => {
    if (curr.status === "applied") {
      return { ...acc, applied: acc.applied + 1 };
    } else if (curr.status === "invited") {
      return { ...acc, invited: acc.invited + 1 };
    } else if (curr.status === "interview") {
      return { ...acc, interview: acc.interview + 1 };
    } else if (curr.status === "offer") {
      return { ...acc, offer: acc.offer + 1 };
    } else if (curr.status === "rejected") {
      return { ...acc, rejected: acc.rejected + 1 };
    }

    return acc;
  }, initialValue);

   const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const appliedThisWeek = props.jobs.filter(job =>
  job.createdAt &&
  new Date(job.createdAt) >= weekAgo
).length;

  const totalJobs = props.jobs.length;

  return (
    <div className="stats">
      <h2>Stats</h2>
        <p>Total applications: {totalJobs}</p>
        <p>Applied this week: {appliedThisWeek}</p>
      {statuses.map((status) => (
        <StatBar
          key={status}
          label={status}
          count={stats[status]}
          total={totalJobs}
        />
      ))}
    </div>
  );
}

export default JobStats;