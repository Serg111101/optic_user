import React, { useState } from 'react'
import "./Aaa.scss";
import { useNavigate } from 'react-router-dom';
import { DownCircleOutlined,UpCircleOutlined } from '@ant-design/icons';
import axios from 'axios';

export default function FinalOrder({ total }: any) {

  const [active,setActive]=useState(false)
  const [active1,setActive1]=useState(false)
  let price:any = 0

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
        }else if(index===1 ||index===2){
          sessionStorage.setItem('step3','false')
          sessionStorage.setItem('step4','false')
          sessionStorage.setItem('step5','false')
          sessionStorage.setItem('final','false')
          navigate(0)
        }else if(index===3 ||index===4){
          sessionStorage.setItem('step4','false')
          sessionStorage.setItem('step5','false')
          sessionStorage.setItem('final','false')
          navigate(0)
        }else if(index===5 ||index===6 ||index ===7||index === 8 ||index === 9||index===10){
          sessionStorage.setItem('step5','false')
          sessionStorage.setItem('final','false')
          navigate(0)
        }else if(index===11 ||index===12){
          sessionStorage.setItem('final','false')
          navigate(0)
        }
        
      }
    })
    // sessionStorage.setItem('step3','false')
    // sessionStorage.setItem('step4','false')
    // sessionStorage.setItem('step5','false')
    // sessionStorage.setItem('final','false')
  }
  function PriceFunc() {   
      total?.map((element:any,index:number)=>{
        if(element?.price_user!==null &&index!==total.length){
          price += element?.price_user
        }
        return price
      })
  }

  PriceFunc()
  console.log(active);
  
  async function SaveFile(){
    const res:any=await axios.post('http://localhost:3003/api/v1/superAdmin/insertValues',total)
    console.log(res);
      
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
                {total.map((elem: any) =>
                  elem.table_name === el && 
                  <div className='totalhead' >
                    {elem.is_active === null ?
                      <div className='totalItem' onClick={()=>EditTotal(elem.table_name)}><p className='totalItem_edit'>E d i t</p><h3>{elem.column_name }</h3> <span>{ elem.value}</span></div>:<div className='totalItem' onClick={()=>EditTotal(elem.table_name)}><p className='totalItem_edit'>E d i t</p><h3>{elem.table_name}</h3><span>{elem.column_name}</span></div>}
                  </div>)}
              </div>
            </div>
          )
          }
          <div className='headDiv' style={{boxShadow:active1?'0px 0px 20px':'0 0 0'}}>
              <h2>All{!active1?<DownCircleOutlined onClick={()=>{setActive1(true)}}/>:<UpCircleOutlined onClick={()=>{setActive1(false)}} />}</h2>
          {
          headArr2?.map((el:any)=>
            el !==undefined && 
                <div className={active1?'totalDiv active':'totalDiv'}>
                  {total?.map((elem:any)=>
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
                  {total?.map((elem:any)=>
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
        <h5>Total price: <span>{price}</span>$</h5>
      </div>
      <div className='buttons'>
          {/* <button>Save</button> */}
          <button onClick={()=>{SaveFile()}}>Save and next to shipping</button>
        </div>
    </div>
  )
}
