
import useToast from "./toast/useToast"
import { JobStatus } from "./types/job"

type FormProps = {
      company: string
      position: string
      status: JobStatus
      editingId: number | null
      setCom: React.Dispatch<React.SetStateAction<string>>
      setPos: React.Dispatch<React.SetStateAction<string>>
      setStatus: React.Dispatch<React.SetStateAction<JobStatus>>
      onSubmit: (event: React.FormEvent<HTMLFormElement>)=> void
     }
     



function FormComponent(props: FormProps) {
const toast = useToast()

       
  return (
                   <form onSubmit= {(e)=>{
                    props.onSubmit(e)
                    toast.addToast("success","Сохранено!")
                  }}> 
                    <div>
                     <label>Company</label> 
                     <input value={props.company}  onChange={(e) => props.setCom(e.target.value)} /> </div> 
                     <div>
                       <label>Position</label>
                        <input value={props.position}  onChange={(e) => props.setPos(e.target.value)} /> 
                        </div>

                        
                         <div>
                            <select value={props.status} onChange={(e) => props.setStatus(e.target.value as JobStatus)}> 
                          <option value="invited">invited</option>
                           <option value="applied">applied</option> 
                           <option value="applied">interview</option> 
                           <option value="applied">rejected</option> 
                           <option value="offer">offer</option> </select> 
                           </div>
                          <button type="submit">
                              {props.editingId ? "Update" : "Save"}
      </button> </form> 
                           
)}

export default FormComponent