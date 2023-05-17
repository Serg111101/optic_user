import "./Aaa.scss";
import { useAppDispatch } from "../../hooks/redux";
import { fetchOrders } from "../../store/action/OrderAction";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchError4 } from "../../store/slices/HomeSlice";
const URL = process.env.REACT_APP_BASE_URL

export const Step5 = ({ step5, setStep5, totals, setTotals, orders }: any) => {
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
  const [fin, setFin] = useState("");

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
  const [test1, setTest1] = useState(headArr[11]);
  // const [version,setVersion] = useState("")

  function aaaa1(testing: any) {
    orders?.map((el: any) => {
      if (el.column_name === testing) {
        setTotals([
          ...totals.filter((elem: any) => {
            if (elem.table_name !== el.table_name) {
              return el;
            }
          }),
          el,
        ]);
      }
    });
  }


  let finn=''
  for (let i = 0; i < arrr2.length; i++) {
        if(arrr2[i]=== arrr2[arrr2.length - 1]) {
          finn = arrr2[i].column_name; 
        }
  }


  function find(){
    totals.map((el:any)=>{
      if(el.columnName==finn){  
        setVal(true)
      }
    })
  }
  
  async function total(order: any) {
    try{
    const response = await axios({
      method: "post",
      url: `${URL}api/v1/superAdmin/insertValues`,
      data: totals,
    });
    console.log(response);
    
    
    
    
  }
  catch(error){
    dispatch(fetchError4(error as Error));
}

  }

  return (
    <div className="Step2">
      <div className="Aaa">
        <div>
          <select
            onChange={(e) => {
              aaaa1(e.target.value);
              setTest1(e.target.value);
            }}
          >
            <option value={headArr[11]}>{headArr[11]}</option>
            {arrr2.map((item: any, index: number) => (
              <option value={item.column_name} key={item.id}>
                {item.column_name}
              </option>
            ))}
          </select>

          {test1 !== headArr[11] && <h2>{headArr[12]}</h2>}
          {test1 !== headArr[11] &&
            arrr2.map(
              (item: any, index: number) =>
                input.includes(index) && (
                  <div key={item.id}>
                    <label>{item.column_name}</label>
                    <input
                      type="text"
                      onChange={(e: any) => {
                        addOrder1(
                          item.id,
                          item.table_name,
                          item.column_name,
                          e.target.value
                        );
                        setFin(e.target.value);
                        setTimeout(() => setInput([...input, index + 1]), 100);
                        find()
                      }}
                    />
                  </div>
                )
            )}
        </div>

        {val&& (
          <button
            onClick={() => {
              total(totals);
            }}
          >
            save
          </button>
        )}
      </div>
    </div>
  );
};
