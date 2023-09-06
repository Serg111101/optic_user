import './AddModal.scss'
import { useState } from 'react'
import { fetchEmployees, fetchEmployeesAdd, fetchEmployeesEdit } from '../../store/action/EmployeesAction'
import { useAppDispatch } from "../../hooks/redux";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Password from 'antd/es/input/Password';
const URL = process.env.REACT_APP_BASE_URL;

export const AddModal = ({ setAddbutton,limit,page,setPage}: any,) => {
 
  
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [surname, setSurname] = useState('')
    const [position, setPosition] = useState('')
    const [password, setPassword] = useState('')
    const [img,setImg] =useState('')
    async function uploadImageHandleradd(e: any) {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        if (formData.has("image")) {
          try {
            const response = await axios.post(`${URL}api/v1/tasks/addEmployesPicture`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
    
            setImg(response.data.dirname);
          } catch (error) {
            return "Server request is failed";
          }
        }
    
      }
    async function AddEmployees() {
        const newEmployees: any = {
            name,
            surname,
            email,
            picture:img,
            position,
            password
        }

        await dispatch(fetchEmployeesAdd(newEmployees))
        await dispatch(fetchEmployees(page,limit,setPage))
        setAddbutton("")

    }

    return (
        <div className='ADDModal'>
            <form className='addForm' >
                <div><label>Name:</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div><label>Email:</label><input type="text" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><label>Surname:</label><input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} /></div>
                <div><label>Position:</label><input type="text" value={position} onChange={(e) => setPosition(e.target.value)} /></div>
                <div><label>Password:</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <div><label htmlFor='file'>Upload img:</label> {img? <img src={img}/> :<input
                                value={""}
                                type="file"
                                onChange={(e) => {
                                    uploadImageHandleradd(e);
                                }}
                                accept="image/*"
                                id="file"
                                name="file"
                                style={{ display: "none" }}
                              />}</div>

                <button onClick={() => AddEmployees()}>Save To Add</button>
                <button onClick={() => setAddbutton("")}>Cancel</button>
            </form>
        </div>
    )
}