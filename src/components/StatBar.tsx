import { Job, JobStatus } from "../types/job";

type Props = {
  label: JobStatus;
  count: number;
  total: number;
};

function StatBar(props: Props) {
  const percent =
    props.total === 0
      ? 0
      : Math.round((props.count / props.total) * 100);
  
  return (
    <div>
      
      <h3>
        {props.label}: {props.count} ({percent}%)
      </h3>

      <div
        style={{
          width: "100%",
          height: "10px",
          backgroundColor: "#ddd",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            backgroundColor: "green",
          }}
        />
      </div>
    </div>
  );
}

export default StatBar;