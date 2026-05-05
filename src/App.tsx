import { useState, useEffect } from "react";
import FormComponent from "./components/FormComponent";
import Applications from "./components/Applications";
import ToastProvider from "./toast/ToastProvider";
import { Job, JobStatus } from "./types/job";
import JobBoard from "./components/JobBoard";
import JobStats from "./components/JobStats";
import { getJobs, createJob, updateJob, deleteJobApi } from "./api/jobsApi";
import "./App.css"

function App() {
  const [company, setCom] = useState<string>("");
  const [position, setPos] = useState<string>("");
  const [status, setStatus] = useState<JobStatus>("applied");
  const [notes, setNotes] = useState<string>("")
  const [filterApp, setFilter] = useState<JobStatus | "all">("all");
  const [viewMode, setViewMode] = useState<"list" | "board">("list");
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError]= useState<string | null>(null)
 
  const [editingId, setEditingId] = useState<number | null>(null);
   useEffect(() => {
    const loadJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getJobs();
        setJobs(data);
      } catch (err: unknown) {
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);



  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true)
         
       if (!company.trim() || !position.trim()) {
      alert("заполни поля");
      return;
    }
        if (editingId !== null) {
          const existingJob = jobs.find(j=> j.id === editingId)
          if (!existingJob) return
          
            const updatedJob: Job = {
               ...existingJob,
              company,
               position,
                status,
                  notes,
                };
      
      const savedJob = await updateJob(editingId, updatedJob)
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingId
            ? savedJob
            : job
        )
      );

      setEditingId(null);
    } else {
      const newJob: Job = {
      id: Date.now(),
      company,
      position,
      status,
      notes,  
      createdAt: new Date().toISOString()
    };
       
      const savedJob = await createJob(newJob)

       setJobs(prev => [...prev, savedJob]);
    }

    setCom("");
    setPos("");
    setStatus("applied");
    setNotes("")  
  
  
  }
  catch (err: unknown) {
    setError("Не удалось сохранить");
  } finally {
    setLoading(false);
  }
};

   


  
  const deleteJob = async (id: number) => {
    try{
      setLoading(true)
      setError(null)
      await deleteJobApi(id)
    setJobs((prev) => prev.filter((item) => item.id !== id));
    }
    catch(err: unknown){
        setError("Не удалось удалить");
  } finally {
    setLoading(false);
  }
};

  const editJob =  (id: number) => {
    const job = jobs.find((j) => j.id === id);
    if (!job) return;

   
    setCom(job.company);
    setPos(job.position);
    setEditingId(job.id);
    setStatus(job.status);
    setNotes(job.notes ?? "");
  };

  const changeJobStatus = async (id: number, newStatus: JobStatus) => {
    const existingJob = jobs.find((job)=> job.id === id)
    if(!existingJob) return
    try {
      setLoading(true);
      setError(null);

      const updatedJob: Job = {
        ...existingJob,
        status: newStatus,
      };

      const savedJob = await updateJob(id, updatedJob);

      setJobs((prev) =>
        prev.map((job) => (job.id === id ? savedJob : job))
      );
    } catch (err: unknown) {
      setError("Не удалось изменить статус");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="app">
    <ToastProvider>
       {error && <p className="error-message">{error}</p>}
        {loading && <p className="loading-message">Loading...</p>}

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
        loading={loading}
        
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