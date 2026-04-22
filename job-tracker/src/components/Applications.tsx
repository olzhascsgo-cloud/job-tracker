import JobCard from "./JobCard";
import {
  Job,
  JobStatus, SortOption
} from "../types/job";
import {
  useState,
  useEffect,
} from "react";

type Props = {
  jobs: Job[];
  filterApp: JobStatus | "all";
  setFilter: (
    value: JobStatus | "all"
  ) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

function Applications(props: Props) {
  const filteredJobs =
    props.filterApp === "all"
      ? props.jobs
      : props.jobs.filter(
          (job) =>
            job.status === props.filterApp
        );

  const [search, setSearch] =
    useState<string>("");

  const [debouncedSearch,
    setDebouncedSearch] =
    useState<string>(search);
    const [sortBy, setSort] = useState<SortOption>("newest")

  const term =
    debouncedSearch.toLowerCase();

  const searchJobs = filteredJobs.filter(
    (job) =>
      job.company
        .toLowerCase()
        .includes(term) ||
      job.position
        .toLowerCase()
        .includes(term)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);
  
  const sortedJobs = [...searchJobs]

  if (sortBy === "newest"){
     sortedJobs.sort((a, b) => b.id - a.id)
  } 
 else if (sortBy === "oldest"){
     sortedJobs.sort((a, b) => a.id - b.id)
  }
  else if (sortBy === "company-asc"){
    
    sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
  }
  else if (sortBy === "company-desc"){
    
      sortedJobs.sort((a, b) => b.company.localeCompare(a.company));
  }


  return (
    <div>
      <h2>My Applications</h2>

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search"
      />

      <select
        value={props.filterApp}
        onChange={(e) =>
          props.setFilter(
            e.target.value as
              | JobStatus
              | "all"
          )
        }
      >
        <option value="all">all</option>
        <option value="invited">invited</option>
        <option value="applied">applied</option>
        <option value="interview">interview</option>
        <option value="rejected">rejected</option>
        <option value="offer">offer</option>
      </select>

       <select
        value={sortBy}
        onChange={(e) =>
          setSort(
            e.target.value as
            | SortOption 
          )
        }
      >
        <option value="newest">newest</option>
        <option value="oldest">oldest</option>
        <option value="company-asc">company-asc</option>
        <option value="company-desc">company-desc</option>
      </select>

      {sortedJobs.length === 0 ? (
        <p>Нет вакансий</p>
      ) : (
        sortedJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={props.onDelete}
            onEdit={props.onEdit}
          />
        ))
      )}
    </div>
  );
}

export default Applications;