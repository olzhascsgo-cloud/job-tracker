 export type JobStatus = "applied" | "interview" | "invited" | "rejected" | "offer";

  export type Job = {
  id: number;
  company: string;
  position: string;
  status: JobStatus;
};