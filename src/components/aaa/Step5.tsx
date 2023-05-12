import './Aaa.scss'
import { useAppDispatch } from "../../hooks/redux";
import { fetchOrders } from "../../store/action/OrderAction";
import { useEffect, useState } from "react";



export const Step5 = ({step5,setStep5,totals,setTotals,orders}:any) => {
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
    const [fin,setFin] = useState("");

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
      if (el.table_name === headArr[10]) {
        arrr.push(el);
      }
    });
    let arrr1: any = [];
    orders?.map((el: any) => {
      if (el.table_name === headArr[11]) {
        arrr1.push(el);
      }
    });
    let arrr2: any = [];
    orders?.map((el: any) => {
      if (el.table_name === headArr[12]) {
        arrr2.push(el);
      }
    });

    
    const [test, setTest] = useState(headArr[10]);  
    const [test1,setTest1] = useState(headArr[11]);
    // const [version,setVersion] = useState("")


    function aaaa() {
      orders?.map((el: any) => {
        if (el.column_name === test) {
          setTotals([...totals, el]);
        }
        if (el.column_name === test1) {
          setTotals([...totals, el]);
        }
        
        

      });
    }
    
    function mapp() {
      totals.map((el: any) => {
        if (el.columnName === fin) {
          if (el.value == "") {
            setVal(false);
          } else if (el.value !== "" || el.value !== null) {
            setVal(true);
          }
        }
      });
    }
    useEffect(() => {
      mapp();
    }, [val, totals]);
   
  return (
    <div className='Step2'>
        <div className="Aaa">
            <div>
              {
                <div>
                  <h2>{headArr[10]}</h2>
                  <div>
                    <select placeholder={headArr[10]} onChange={
                      (e) => {
                        setTest(e.target.value);
                        // setVersion(e.target.value);
                      }

                      }>
                      <option value={headArr[5]} >
                        {headArr[10]}
                      </option>
                      {arrr.map((item: any, index: number) => (
                        <option value={item.column_name} key={item.id}>
                          {item.column_name}
                        </option>
                      )
                      )}
                    </select>
                        {
                            arrr.map((el:any,i:number)=> 
                                test == el.column_name &&
                                (<img src={el.value} alt={el.column_name} key={el.id} />)
                            )
                        }

                      </div>
                      </div>
                      
                      }

                    {test !== headArr[10] && <h2>{headArr[11]}</h2>}
                    {
                    test !== headArr[10] &&
                    <select onChange={
                      (e) => {
                        setTest1(e.target.value);
                        // setFin(e.target.value)
                      }

                      }>
                      <option value={headArr[11]} >
                        {headArr[11]}
                      </option>
                      {arrr2.map((item: any, index: number) => (
                        <option value={item.column_name} key={item.id}>
                          {item.column_name}
                        </option>
                      ))}
                    </select>
                      }



                    {test1 !==  headArr[11]  &&     <h2>{headArr[12]}</h2>}
                {
                    test1 !== headArr[11] && 
                      
                    arrr2.map((item: any, index: number) =>
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
                                        setFin(e.target.value)
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
           


            {fin.length>0&& (
              <button
                onClick={() => {
                  aaaa();
                //   setStep5(true);
                }}
              >
                save
              </button>
            )}
          </div>
    </div>
  )
}

