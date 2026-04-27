
import { Job, JobStatus } from "../types/job";

type Props = {
  jobs: Job[]
  filterApp: JobStatus | "all"
  setFilter: (value: JobStatus | "all") => void
  onDelete: (id:number) => void
  onEdit: (id:number) => void
  onChangeStatus: (id: number, newStatus: JobStatus) => void;
}

function Applications(props: Props) {
     const filteredJobs = props.filterApp === "all"
     ? props.jobs
     : props.jobs.filter(job => job.status === props.filterApp)
     
     
   
  return (                  <div>
                            <h2>My Applications</h2> 
                          <select value={props.filterApp} 
                          onChange={(e)=> props.setFilter(e.target.value as JobStatus)}>
                             <option value="all">all</option>
                          <option value="invited">invited</option>
                           <option value="applied">applied</option> 
                           <option value="interview">interview</option>
                           <option value="rejected">rejected</option>
                           <option value="offer">offer</option> </select> 
                           
                                {filteredJobs.length === 0 ? (<p>Нет вакансий</p>)
                                :
                                (filteredJobs.map((job) => (
                                     
                                 <div key={job.id} >
                                  {job.company} - {job.position}
                                  
                                    
                               <button onClick={() => props.onDelete(job.id)}>
                                              Delete
                                            </button>

                              <button onClick={() => props.onEdit(job.id)}>
                                                  Edit
                                              </button>
                                               </div>
                                ))
                                )}
                                </div>
                              )
                              }

export default Applications; 