import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNavigate } from 'react-router-dom';
import { IEmployees, ITasks } from '../../models/model';
import { fetchFullEmployees, fetchTasksEdit ,fetchTasks} from '../../store/action/TasksAction';
import './modal.scss'

export const EditTasks = ({ element,setEditItem,page,limit,setPage }: ITasks | any) => {

  const { EmployeesID } = useAppSelector(state => state.Tasks)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState(element?.tasks_name)
  const [employeeId, setEmployeeId] = useState<string>(element?.id)
  const [description, setDescription] = useState(element?.tasks_description)
  const [startDate, setStartDate] = useState(element?.tasks_start)
  const [endDate, setEndDate] = useState(element?.tasks_end)

  useEffect(() => {
    dispatch(fetchFullEmployees())
  }, [dispatch])

  async function EditTasks() {
    await dispatch(fetchTasksEdit(element.id, {
      
      tasks_name:name,
      tasks_description:description,
      tasks_start:startDate,
      tasks_end:endDate
    }))
    await dispatch(fetchTasks(page,limit,setPage))
    setEditItem("")
  }

  return (
    <div className='editTasks'>
      <div className='input_boxTask'>
        <div> 
          <label>name</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        </div>
   

        <div>
        <label>description</label>
      <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
        <label>startDate</label>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

        </div>
        <div>
        <label>endDate</label>
        <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

        </div>
        <div>
        {/* <label>Employee</label>
        <select name="" id="" value={employeeId}  onChange={(e)=>setEmployeeId(e.target.value)}>
        <option value="" selected disabled hidden>Choose here</option>
              
                {EmployeesID?.map((el:IEmployees)=>
              
                    <option key={el.id} value={el.id} >{el?.name} {el.surname}</option>
                )}
            </select> */}
        </div>
     

      <button onClick={() => {EditTasks()}}>Save</button>
      <button onClick={() => setEditItem("")}>Cancel</button>
      </div>
    </div>
  )
}