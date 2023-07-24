/*eslint-disable*/

import React, { useState } from 'react'
import "./Steps.scss";
import { useNavigate } from 'react-router-dom';
import { DownCircleOutlined,UpCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

const URL = process.env.REACT_APP_BASE_URL


export default function FinalOrder({ total }: any) {

  const [active,setActive]=useState(true)
  const [active1,setActive1]=useState(false)
let price=0
const order:any = sessionStorage.getItem('orders')
const totals = JSON.parse(order) 
  
  const navigate=useNavigate()
  let arr1 = totals?.filter((item: any) => 
    item.is_active === null
  )
  let arr2 = totals?.filter((item: any) => {
    if (item.is_active == true) {

      return item
    }
  }
  )
  function removeDuplicates(arr1: any[]) {
    let headArr: any = [];
    for (let i = 0; i < arr1.length; i++) {
      if (!headArr.includes(arr1[i].table_name)) {
        headArr.push(arr1[i].table_name);
      }
    }
    return headArr;
  }

  const headArr = removeDuplicates(arr1);
  const headArr2 = removeDuplicates(arr2);
 
  
 
  
  function EditTotal(table_name:string){
    
    
    headArr2?.map((el:any,index:number)=>{
      
      
      if(el===table_name){
        if(index===0){
          sessionStorage.setItem('step2','false')
          sessionStorage.setItem('step3','false')
          sessionStorage.setItem('step4','false')
          sessionStorage.setItem('final','false')
          navigate(0)
        }else if(index===1||index===2){
          sessionStorage.setItem('step3','false')
          sessionStorage.setItem('step4','false')
          sessionStorage.setItem('final','false')
          navigate(0)
        }else if(index===3||index===4||index===5||index===6||index===7){
          sessionStorage.setItem('step4','false')
          sessionStorage.setItem('final','false')
          navigate(0)
        }else if(index>7){
          sessionStorage.setItem('final','false')
          navigate(0)
        }

      }
    })
    headArr?.map((el:any,index:number)=>{
      
      
      if(el===table_name){
        if(index===1){
          sessionStorage.setItem('step2','false')
          sessionStorage.setItem('step3','false')
          sessionStorage.setItem('step4','false')
          sessionStorage.setItem('final','false')
          navigate(0)
        }
      }
    })
  }

  async function PriceFunc() { 
  
    // const res:any=await axios.post(URL + 'api/v1/superAdmin/insertValues',total)
    arr2?.map((element:any,index:number)=>{
              if(element?.price_user!==null &&index!==totals.length){
                price += element?.price_user
              }
              return price
            })
    
    localStorage.setItem('price',JSON.stringify(price))
    // setPrice(res.data[0].price_user)
    
    
  }

  PriceFunc()
  
  async function SaveFile(){
    const res:any=await axios.post(URL+'api/v1/superAdmin/insertValues',total)
    
    navigate('/Rate')
  
      
  }

  return (
    <div className='FinalOrder'>
      <h1>Your Order List </h1>
      <div className='FinalOrder_info'>
        {
          headArr?.map((el: any) =>
            el !== undefined && <div className='headDiv' style={{boxShadow:active?'0px 0px 20px':''}}>
              <h2>{el} {!active?<DownCircleOutlined onClick={()=>{setActive(true)}}/>:<UpCircleOutlined onClick={()=>{setActive(false)}} />}</h2>
              
              <div className={active?'totalDiv active':'totalDiv'}>
                {arr1.map((elem: any) =>
                  elem.table_name === el && 
                  <div className='totalhead' >
                    {elem.is_active === null ?
                      <div className='totalItem' ><h3>{elem.column_name }</h3> <span>{ elem.value}</span></div>:
                      <div className='totalItem' ><h3>{elem.table_name}</h3><span>{elem.column_name}</span></div>}
                  </div>
                  
                  )}
                  <button className='btn_edit' onClick={()=>EditTotal(el)}>Edit</button>
              </div>
            </div>
          )
          }
          <div className='headDiv' style={{boxShadow:active1?'0px 0px 20px':''}}>
              <h2>All{!active1?<DownCircleOutlined onClick={()=>{setActive1(true)}}/>:<UpCircleOutlined onClick={()=>{setActive1(false)}} />}</h2>
          {
          headArr2?.map((el:any)=>
            el !==undefined && 
                <div className={active1?'totalDiv active':'totalDiv'}>
                  {arr2?.map((elem:any)=>
                  elem.table_name === el&&elem.value===null&&
                  <div className='totalhead'>
                    {elem.is_active !== null && 
                    <div className='totalItem' onClick={()=>EditTotal(elem.table_name)}><p className='totalItem_edit'>E d i t</p><h3>{elem.table_name}</h3><span>{elem.column_name}</span></div>}
                    {elem?.price_user&&<p>{elem.price_user+'$'}</p>}
                  </div>
                  )

                  }

                </div>
          )
        }
         {
          headArr2?.map((el:any)=>
            el !==undefined && 
                <div className={active1?'totalDiv active':'totalDiv'}>
                  {arr2?.map((elem:any)=>
                  elem.table_name === el&&elem.value !== null&&elem.is_active !==null&&
                  <div className='totalhead'>
                    
                    <div className='totalItem' onClick={()=>EditTotal(elem.table_name)}><p className='totalItem_edit'>E d i t</p><h3>{elem.table_name}</h3><img src={elem.value} alt="" /><span>{elem.column_name}</span></div>
                    
                  </div>
                  )

                  }

                </div>
          )
        }
        </div>
      </div>
      <div className='total_price'>
       {price>0 && <h5>Total price: <span>{price}</span>$</h5>}
      </div>
      <div className='buttons'>
          {/* <button>Save</button> */}
          <button onClick={()=>{SaveFile()}}>Save and next to shipping</button>
        </div>
    </div>
  )
}
