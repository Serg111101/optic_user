/*eslint-disable*/

import "./Aaa.scss";
import { useState, useEffect } from "react";
import { Step3 } from "./Step3";
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppDispatch } from "../../hooks/redux";

export const Step2 = ({
  step3,
  step4,
  step5,
  setStep3,
  setStep4,
  setStep5,
  totals,
  setTotals,
  orders,
}: any) => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState([0]);
  const [val, setVal] = useState(false)
  
  

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);



  let arr1 = orders?.map((item: any) => item.table_name);
  function removeDuplicates(arr1: any[]) {
    let headArr: any = [];
    for (let i = 0; i < arr1.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }
  const headArr = removeDuplicates(arr1);


  function addOrder1(id: number, table: string, col: string, e: any) {
    const newTotals = totals.filter((item: any) => item.columnName !== col);
    setTotals([
      ...newTotals,
      {
        id: id,
        tableName: table,
        columnName: col,
        value: e,
      },
    ]);
  }

  let arrr: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[1]) {
      arrr.push(el);
    }
  });

  let arrr1: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[2]) {
      arrr1.push(el);
    }
  });


  const [test,setTest] = useState(headArr[1]);
  

  let fin=''
  for (let i = 0; i < arrr1.length; i++) {
        if(arrr1[i]=== arrr1[arrr1.length - 1]) {
          fin = arrr1[i].column_name; 
        }
  }

  function aaaa(){
    orders?.map((el:any)=>{
      if(el.column_name===test){
        setTotals([
          ...totals,
          el
        ]);
      }

    })
  }

  function mapp(){
    totals.map((el:any)=> {
      
      
      if(el.columnName === fin){
        
        if(el.value == ""){
          setVal(false)
        } else if(el.value !== "" || el.value !== null){
            setVal(true)
          }

      }
        
    })

  }
 useEffect(()=>{

   mapp()          

 },[val,totals])

//  console.log(orders);
 

  
  return (
    <div>
      {step3 ? (
        <Step3
          step4={step4}
          step5={step5}
          setStep4={setStep4}
          setStep5={setStep5}
          totals={totals}
          setTotals={setTotals}
          orders={orders}
        />
      ) : (
        <div className="Step2">
          <div className="Aaa">
         

            <div>
              {
                <div>
                  <h2>{headArr[1]}</h2>

                  <div>
                    <select onChange={
                      (e)=>setTest(e.target.value)}>
                        <option value={headArr[1]} 
                        key={headArr[1]}
                        >{headArr[1]}</option>
                      {arrr.map((item: any, index: number) => (
                        <option
                          value={item.column_name}
                          key={item.id}
                        >
                          
                          {item.column_name}
                        </option>
                      ))}
                    </select>

                  {test !==  headArr[1]  &&     <h2>{headArr[2]}</h2>}
                {
                    test !== headArr[1] && 
                      
                    arrr1.map((item: any, index: number) =>
                        input.includes(index) && (
                          <div key={item.id}>
                            <p>{item.column_name}</p>
                            <input
                              type="text"
                              onChange={(e: any) => {
                                addOrder1(
                                  item.id,
                                  item.table_name,
                                  item.column_name,
                                  e.target.value
                                );

                                setTimeout(
                                  () => setInput([...input, index + 1]),
                                  100
                                );
                              }}
                            />
                          </div>
                        )
                    )


              }
                  </div>
                </div>
              }
            </div>

            {val &&  (
              <button onClick={() =>{aaaa(); setStep3(true)}}>save</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
