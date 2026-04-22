import { useState } from "react";
import FormComponent from "./components/FormComponent";
import Applications from "./components/Applications";
import ToastProvider from "./toast/ToastProvider";
import useLocalStorage from "./hooks/useLocalStorage";
import { Job, JobStatus } from "./types/job";

function App() {
  const [company, setCom] = useState<string>("");
  const [position, setPos] = useState<string>("");
  const [status, setStatus] = useState<JobStatus>("applied");

  const [filterApp, setFilter] = useState<JobStatus | "all">("all");

  const [jobs, setJobs] = useLocalStorage<Job[]>("jobs", [
    {
      id: 1,
      company: "Google",
      position: "Frontend Dev",
      status: "offer",
    },
    {
      id: 2,
      company: "Yandex",
      position: "React Dev",
      status: "applied",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (!company.trim() || !position.trim()) {
      return;
    }

    const newJob: Job = {
      id: Date.now(),
      company,
      position,
      status,
    };

    if (editingId !== null) {
      setJobs((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                company,
                position,
                status,
              }
            : item
        )
      );

      setEditingId(null);
    } else {
      setJobs((prev) => [...prev, newJob]);
    }

    setCom("");
    setPos("");
    setStatus("applied");
  };

  const deleteJob = (id: number): void => {
    setJobs((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const editJob = (id: number): void => {
    const edJob = jobs.find((job) => job.id === id);

    if (!edJob) return;

    setCom(edJob.company);
    setPos(edJob.position);
    setStatus(edJob.status);
    setEditingId(edJob.id);
  };

  return (
    <ToastProvider>
      <FormComponent
        company={company}
        position={position}
        status={status}
        editingId={editingId}
        setCom={setCom}
        setPos={setPos}
        setStatus={setStatus}
        onSubmit={onSubmit}
      />

      <Applications
        jobs={jobs}
        filterApp={filterApp}
        setFilter={setFilter}
        onDelete={deleteJob}
        onEdit={editJob}
      />
    </ToastProvider>
  );
}

export default App;



