import "./Aaa.scss";
import { useEffect, useState } from "react";
import { Step4 } from "./Step4";
import { useAppDispatch } from "../../hooks/redux";
import { fetchOrders } from "../../store/action/OrderAction";

export const Step3 = ({
  step4,
  step5,
  setStep4,
  setStep5,
  totals,
  setTotals,
  orders,
}: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  const [input, setInput] = useState([0]);
  const [val, setVal] = useState(false);
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
  const [fin,setFin] = useState(false);

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
    if (el.table_name === headArr[3]) {
      arrr.push(el);
    }
  });
  let arrr1: any = [];
  orders?.map((el: any) => {
    if (el.table_name === headArr[4]) {
      arrr1.push(el);
    }
  });
  const [test, setTest] = useState(headArr[3]); 
  // const [test1, setTest1] = useState(headArr[4]); 
   
  function aaaa1(testing:any) {
    orders?.map((el: any) => {
      if (el.column_name === testing) {
        setTotals([...totals.filter((elem:any)=>{
          if(elem.table_name !== el.table_name){
            return el
          }
        }),el])
      }
    });
  }
 
   
  return (
    <div>
      {step4 ? (
        <Step4
          step5={step5}
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
                  <h2>{headArr[3]}</h2>
                  <div>
                    <select onChange={
                      (e) => {
                        setTest(e.target.value)
                        aaaa1(e.target.value);
                        
                      }

                      }>
                      <option value={headArr[3]} >
                        {headArr[3]}
                      </option>
                      {arrr.map((item: any, index: number) => (
                        <option value={item.column_name} key={item.id}>
                          {item.column_name}
                        </option>
                      ))}
                    </select>
                    {test !== headArr[3] && <h2>{headArr[4]}</h2>}
                    {test !== headArr[3] &&
                      arrr1?.map((item: any, index: number) => 
                        item?.price_user == null? 
                        
                          // input.includes(index) && 
                          
                              <div key={item.id}>
                              <label key={item.id} >{item.column_name}</label>
  
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
                          
                        
                    :
                    <select key={item.id} onChange={(e) => {aaaa1(e.target.value)}}>
                    <option value={headArr[3]} key={headArr[3]}>
                      {headArr[3]}
                    </option>
                   
                      <option value={item.column_name} key={item.id}>
                        {item.column_name}
                      </option>
                    
                  </select>
                      )
                      }
                  </div>
                </div>
              }
            </div>
            { test!== headArr[3]&&
              <button
                onClick={() => {
                  
                  setStep4(true);
                }}
              >
                save
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
};
