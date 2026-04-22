
import { useState, FormEvent } from "react"; 
import FormComponent from "./form";
import Applications from "./application";
import ToastProvider from "./toast/ToastProvider";
import { Job, JobStatus } from "./types/job";
import useLocalStorage from "./hooks/useLocalStorage";



function App() { 
 
  const [company, setCom] = useState<string>(""); 
  const [position, setPos] = useState<string>(""); 
  const [status, setStatus] = useState<JobStatus>("applied")
   const[filterApp, setFilter] = useState<JobStatus | "all">("all") 
   const [jobs, setJobs] = useLocalStorage<Job[]>("jobs",[{
       id: 1, company: "Google", position: "Frontend Dev", status: "offer" },
     { id: 2, company: "Yandex", position: "React Dev", status: "applied"}, ]);
    const [editingId, setEditingId] = useState<number | null>(null);
    
  const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
  event.preventDefault()

  if(!company.trim() || !position.trim()){
    alert("заполни поля")
    return
  }
   const newJob: Job = { id: Date.now(), company, position, status };
         if (editingId !== null) { 
          setJobs((prev) => prev.map((item) => 
            item.id === editingId 
          ? { ...item, company, position, status} 
          : item ) ); 
          setEditingId(null); } 
          else {
           
            setJobs((prev) => [...prev, newJob]); }
            
           setCom(""); 
           setPos("") ;
}
const deleteJob = (id: number) => {
  setJobs(prev => prev.filter(item => item.id !== id));
};

const editJob = (id: number) => {
  const edJob = jobs.find(job => job.id === id);
  if (!edJob) return;

  setCom(edJob.company);
  setPos(edJob.position);
  setEditingId(edJob.id);
  setStatus(edJob.status);
};
       
          return  (
    
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
   
    
  );; }
               export default App;


       
      /*function useLocalStorage (key: string, defaultValue: T) {
       const [value, setValue] = useState<Job[]>(() => {
        const saved = localStorage.getItem(key)

       
      if(!saved) return defaultValue

      return JSON.parse(saved)
  });
      useEffect(() => {

    localStorage.setItem(key, JSON.stringify(value))

      }, [key, value]);
      return [value, setValue] as const
      };
        


      
      
      
      
      */

