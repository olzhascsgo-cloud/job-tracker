
import useToast from "../toast/useToast"
import { JobStatus } from "../types/job"

type FormProps = {
      company: string
      position: string
      status: JobStatus
      editingId: number | null
      setCom: React.Dispatch<React.SetStateAction<string>>
      setPos: React.Dispatch<React.SetStateAction<string>>
      setStatus: React.Dispatch<React.SetStateAction<JobStatus>>
      onSubmit: (event: React.FormEvent<HTMLFormElement>)=> void
      notes: string
      setNotes: React.Dispatch<React.SetStateAction<string>>
     }
     



function FormComponent(props: FormProps) {
const toast = useToast()

       
  return (
                 
                   <form onSubmit= {(e)=>{
                    props.onSubmit(e)
                    toast.addToast("success","Сохранено!")
                  }}> 
                    <div className="job-form">
                      <div className="form-row">
                      <label>Notes</label>
                      <textarea placeholder = "Notes" value={props.notes} onChange={(e)=> props.setNotes(e.target.value)}></textarea>
                      </div>
                      <div className="form-row">
                      <label>Company</label> 
                     <input placeholder="company" value={props.company}  onChange={(e) => props.setCom(e.target.value)} /> </div> 
                     <div className="form-row">
                       <label>Position</label>
                        <input placeholder="Position" value={props.position}  onChange={(e) => props.setPos(e.target.value)} /> 
                        </div>

                        
                         <div className="form-actions">
                            <select value={props.status} onChange={(e) => props.setStatus(e.target.value as JobStatus)}> 
                          <option value="invited">invited</option>
                           <option value="applied">applied</option> 
                           <option value="interview">interview</option> 
                           <option value="rejected">rejected</option> 
                           <option value="offer">offer</option> </select> 
                           
                          <button type="submit">
                              {props.editingId ? "Update" : "Save"}
                              
      </button>
      </div>
      </div> </form> 
      
                           
)}

export default FormComponent