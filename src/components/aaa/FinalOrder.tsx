import React from 'react'
import "./Aaa.scss";
import { useNavigate } from 'react-router-dom';

export default function FinalOrder({ total }: any) {

  const navigate=useNavigate()
  let arr1 = total?.map((item: any) => {
    if (item.is_active === null) {

      return item.table_name
    }
  }
  )
  let arr2 = total?.map((item: any) => {
    if (item.is_active !== null) {

      return item.table_name
    }
  }
  )
  function removeDuplicates(arr1: any[]) {
    let headArr: any = [];
    for (let i = 0; i < arr1.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }
  const arr:any=sessionStorage.getItem('arr')
  const array=JSON.parse(arr)
  const headArr = removeDuplicates(arr1);
  const headArr2 = removeDuplicates(arr2);
  console.log(array);
  function EditTotal(table_name:string){
    array?.map((elem:any,index:number)=>{
      if(elem===table_name){
        if(index===0){
          sessionStorage.setItem('step2','false')
          sessionStorage.setItem('step3','false')
          sessionStorage.setItem('step4','false')
          sessionStorage.setItem('step5','false')
          sessionStorage.setItem('final','false')
          navigate(0)
        }
        console.log(elem,index);
        
      }
    })
    // sessionStorage.setItem('step3','false')
    // sessionStorage.setItem('step4','false')
    // sessionStorage.setItem('step5','false')
    // sessionStorage.setItem('final','false')
  }
  return (
    <div className='FinalOrder'>
      <h1>Your Order List </h1>
      <div className='FinalOrder_info'>
        {
          headArr?.map((el: any) =>
            el !== undefined && <div className='headDiv'>
              <h2>{el}</h2>
              <div className='totalDiv'>
                {total.map((elem: any) =>
                  elem.table_name === el && 
                  <div className='totalhead'>
                    {elem.is_active === null ?
                      <div className='totalItem' onClick={()=>EditTotal(elem.table_name)} style={{ display: 'flex', alignItems: 'center' ,justifyContent: 'space-between'}}><h3>{elem.column_name }</h3> <span>{ elem.value}</span></div>:<div style={{ display: 'flex', alignItems: 'center' ,justifyContent: 'space-between'}}><h3>{elem.table_name}</h3><span>{elem.column_name}</span></div>}
                  </div>)}
              </div>
            </div>
          )
          }
          <div className='headDiv'>
              <h2>All</h2>
          {
          headArr2?.map((el:any)=>
            el !==undefined && 
                <div className="totalDiv">
                  {total?.map((elem:any)=>
                  elem.table_name === el&&elem.value===null&&
                  <div className='totalhead'>
                    {elem.is_active !== null && 
                    <div style={{ display: 'flex', alignItems: 'center' ,justifyContent: 'space-between'}}><h3>{elem.table_name}</h3><span>{elem.column_name}</span></div>}
                  </div>
                  )

                  }

                </div>
          )
        }
         {
          headArr2?.map((el:any)=>
            el !==undefined && 
                <div className="totalDiv">
                  {total?.map((elem:any)=>
                  elem.table_name === el&&elem.value !== null&&elem.is_active !==null&&
                  <div className='totalhead'>
                    
                    <div style={{ display: 'flex', alignItems: 'center' ,justifyContent: 'space-between'}}><h3>{elem.table_name}</h3><span>{elem.column_name}</span></div>
                    <img src={elem.value} alt="" />
                  </div>
                  )

                  }

                </div>
          )
        }
        </div>
      </div>
      <div className='buttons'>
          {/* <button onClick={()=>{EditTotal()}}>Edit</button> */}
          <button>Save</button>
          <button>next</button>
        </div>
    </div>
  )
}
