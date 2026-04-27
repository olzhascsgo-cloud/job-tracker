 export type JobStatus = "applied" | "interview" | "invited" | "rejected" | "offer";


export type SortOption =
  | "newest"
  | "oldest"
  | "company-asc"
  | "company-desc";

  export type Job = {
  id: number;
  company: string;
  position: string;
  status: JobStatus;
  notes?: string;
  createdAt?: string;
};