import { Job } from "../types/job";

const API_URL = "http://localhost:3001/jobs";

export const getJobs = async (): Promise<Job[]> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Ошибка загрузки");
  }

  return res.json();
};

export const createJob = async (newJob: Job): Promise<Job> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newJob),
  });

  if (!res.ok) {
    throw new Error("Ошибка создания");
  }

  return res.json();
};

export const updateJob = async (id: number, updatedJob: Job): Promise<Job> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedJob),
  });

  if (!res.ok) {
    throw new Error("Ошибка обновления");
  }

  return res.json();
};

export const deleteJobApi = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Ошибка удаления");
  }
};