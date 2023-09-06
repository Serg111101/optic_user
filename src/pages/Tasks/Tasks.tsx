import React, { useEffect, useState } from 'react';
import './Tasks.scss';
import { fetchTasks, fetchTasksDelete, fetchSearchTasks } from '../../store/action/TasksAction';
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { ITasks } from '../../models/model';
import { useNavigate } from 'react-router-dom';
import { AddTasks } from '../../components/addTasks';
import { EditTasks } from '../../components/editTasks';

export const Tasks = () => {
  const { Tasks } = useAppSelector(state => state.Tasks);
  const { SearchTasks } = useAppSelector(state => state.Tasks);
  const [editItem, setEditItem] = useState<ITasks | undefined>();
  const [addbutton, setAddbutton] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [searchItem, setSearchItem] = useState<string>('');
  const [limit, setLimit] = useState(5);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [all,setAll] = useState(false)

  useEffect(()=> {
    setSearchItem('');
    setSearch('')
  
    dispatch(fetchTasks(page, limit, setPage));

  }, [dispatch, page,all,]);

let auth:any
  if(localStorage.getItem('auth')){
    let log:any = localStorage.getItem('auth')
     auth = JSON.parse(log)
   }

  function backPage() {
    setPage(prevPage => prevPage - 1);
  }

  function nextPage() {
    setPage(prevPage => prevPage + 1);
  }

  async function DeleteTasks(id: number) {
    await dispatch(fetchTasksDelete(id));
    dispatch(fetchTasks(page, limit, setPage));
  }

  function searchTasks() {
    dispatch(fetchSearchTasks(searchItem, search));
  }

  return (
    <>
      <div className='Tasks'>
        <div className='searchTasks'>
          <span>Search in:</span>
          <select name="" id="" onChange={(e) => setSearchItem(e.target.value)}>
            <option value="tasks_name" hidden>Choose here</option>
            <option value="tasks_name">Name</option>
            <option value="tasks_description">Description</option>
            <option value="tasks_start">StartDate</option>
            <option value="tasks_end">EndDate</option>
          </select>
          {searchItem==="startDate" || searchItem==="endDate" ? <input type="date" onChange={(e) => setSearch(e.target.value)} />: 
          <input type="search"  onChange={(e) => setSearch(e.target.value)} />}
          <button onClick={searchTasks}>Search</button>
          {SearchTasks && <button onClick={() => {setAll(!all)}}>See All</button>}
        </div>
        <div className='Tasks_container'>
          {SearchTasks?.length > 0 && !all ? (
            SearchTasks?.map((el: ITasks) => (
              <div key={el?.id} className='Tasks_item'>
                <div className='Tasks_field'>Id: {el?.id}</div>
                <div className='Tasks_field'>EmployeeId: {el?.id}</div>
                <div className='Tasks_field'>Name: {el?.tasks_name}</div>
                <div className='Tasks_field'>Description: {el?.tasks_description}</div>
                <div className='Tasks_field'>StartDate: {el?.tasks_start}</div>
                <div className='Tasks_field'>EndDate: {el?.tasks_end}</div>
                <div className='Tasks_buttons'>
                  <button onClick={() => setEditItem(el)}>Edit</button>
                  <button onClick={() => DeleteTasks(el.id)}>Delete</button>
                </div>  
              </div>
            ))
          ) : (
            Tasks?.map((el: ITasks) => (
              <div key={el?.id} className='Tasks_item'>
                {/* <div className='Tasks_field'>Name: {}</div> */}
                <div className='Tasks_field'>Employe Name: {el?.name}</div>
                <div className='Tasks_field'>Name: {el?.tasks_name}</div>
                <div className='Tasks_field'>Description: {el?.tasks_description}</div>
                <div className='Tasks_field'>StartDate: {el?.tasks_start}</div>
                <div className='Tasks_field'>EndDate: {el?.tasks_end}</div>
                <div className='Tasks_buttons'>
                { auth?.role==="tasks_admin" &&   <button onClick={() => setEditItem(el)}>Edit</button>}
                { auth?.role==="tasks_admin" &&   <button onClick={() => DeleteTasks(el.id)}>Delete</button>}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="buttonContainer">
          <button onClick={backPage}>back</button>
          <button onClick={nextPage}>next</button>
          { auth?.role==="tasks_admin" &&   <button onClick={() => { setAddbutton(true) }}>Add Tasks</button>}
        </div>
        {editItem && <EditTasks element={editItem} setEditItem={setEditItem} page={page} limit={5} setPage={setPage} />}
        {addbutton && <AddTasks setAddbutton={setAddbutton} page={page} limit={5} setPage={setPage} />}
      </div>
    </>
  );
};
