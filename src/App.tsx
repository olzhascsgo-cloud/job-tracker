import { useState } from "react";
import FormComponent from "./components/FormComponent";
import Applications from "./components/Applications";
import ToastProvider from "./toast/ToastProvider";
import { Job, JobStatus } from "./types/job";
import useLocalStorage from "./hooks/useLocalStorage";
import JobBoard from "./components/JobBoard";
import JobStats from "./components/JobStats";
import "./App.css"

function App() {
  const [company, setCom] = useState<string>("");
  const [position, setPos] = useState<string>("");
  const [status, setStatus] = useState<JobStatus>("applied");
  const [notes, setNotes] = useState<string>("")
  const [filterApp, setFilter] = useState<JobStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [jobs, setJobs] = useLocalStorage<Job[]>("jobs", [
    {
      id: 1,
      company: "Google",
      position: "Frontend Dev",
      status: "offer",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      company: "Yandex",
      position: "React Dev",
      status: "applied",
      createdAt: new Date().toISOString()
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!company.trim() || !position.trim()) {
      alert("заполни поля");
      return;
    }

    const newJob: Job = {
      id: Date.now(),
      company,
      position,
      status,
      notes,
      createdAt: new Date().toISOString()
    };

    if (editingId !== null) {
      setJobs((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? { ...item, company, position, status, notes }
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
    setNotes("")  };

  const deleteJob = (id: number) => {
    setJobs((prev) => prev.filter((item) => item.id !== id));
  };

  const editJob = (id: number) => {
    const edJob = jobs.find((job) => job.id === id);
    if (!edJob) return;

    setCom(edJob.company);
    setPos(edJob.position);
    setEditingId(edJob.id);
    setStatus(edJob.status);
    setNotes(edJob.notes ?? "");
  };

  const changeJobStatus = (id: number, newStatus: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  return (
    <div className="app">
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
        notes = {notes}
        setNotes = {setNotes}
        
      />

      <JobStats jobs={jobs} />
      <div className="view-toggle">
       <button onClick={() => setViewMode("list")}>
    List
  </button>

  <button onClick={() => setViewMode("board")}>
    Board
  </button>
</div>
     {viewMode === "board" ? (
  <JobBoard
    jobs={jobs}
    onDelete={deleteJob}
    onEdit={editJob}
    onChangeStatus={changeJobStatus}
  />
) : (
  <Applications
    jobs={jobs}
    filterApp={filterApp}
    setFilter={setFilter}
    onDelete={deleteJob}
    onEdit={editJob}
    onChangeStatus={changeJobStatus}
  />
)}
    </ToastProvider>
    </div>
  );
}

export default App;