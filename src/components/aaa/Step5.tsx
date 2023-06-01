import "./Aaa.scss";
import { useAppDispatch } from "../../hooks/redux";
import { fetchOrders } from "../../store/action/OrderAction";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchError4 } from "../../store/slices/HomeSlice";
import { useNavigate } from 'react-router-dom'
const URL = process.env.REACT_APP_BASE_URL

export const Step5 = ({ step5,final, setStep5,setFinal, totals, setTotals, orders }: any) => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const [butt,setButt]=useState(false)
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

  let arr: any = sessionStorage?.getItem('step5_1')
  const [arrr, setArrr] = useState(JSON?.parse(arr))
  useEffect(() => {
    if (arr == null || arr == '[]') {
      const arr2: any = []
      sessionStorage.removeItem('step5_1')

      orders?.map((el: any) => {

        if (el.table_name == headArr[11]) {
          arr2.push(el)
        }

      })
      sessionStorage.setItem('step5_1', JSON.stringify(arr2))
    }
  }, [orders, headArr, arr])

  useEffect(() => {

    if (arr !== null && arr !== '[]' && arrr === null) {
      setArrr(JSON.parse(arr))
    }

  }, [arr, arrr])

  function addOrder1(value: string) {
    if (arrr) {
      const ar1 = arrr?.filter((el: any) => {
        if (el.column_name == value) {
          el.is_active = true
          return el
        }
      })
      const ar2 = [...ar1, ...arrr?.filter((el: any) => {
        if (el.column_name !== value) {
          el.is_active = false
          return el
        }
      })]
      sessionStorage.setItem('step5_1', JSON.stringify(ar2))
      let x: any = sessionStorage.getItem('step5_1')
      setArrr(JSON.parse(x))
    }
  }




  let arr2: any = sessionStorage?.getItem('step5_2')
  const [arrr2, setArrr2] = useState(JSON?.parse(arr2))
  useEffect(() => {
    if (arr2 == null || arr2 == '[]') {
      const arr2: any = []
      sessionStorage.removeItem('step5_2')

      orders?.map((el: any) => {

        if (el.table_name == headArr[12]) {
          arr2.push(el)
        }

      })
      sessionStorage.setItem('step5_2', JSON.stringify(arr2))
    }
  }, [orders, headArr, arr2])

  useEffect(() => {

    if (arr2 !== null && arr2 !== '[]' && arrr2 === null) {
      setArrr2(JSON.parse(arr2))
    }

  }, [arr2, arrr2])

  function addOrder2(id: number, e: any) {
    if (arrr2) {
      let ar2 = arrr2?.map((el: any) => {
        if (el.id == id) {
          el.value = e
        }
        return el
      })
      sessionStorage.setItem('step5_2', JSON.stringify(ar2))
      let x: any = sessionStorage.getItem('step5_2')
      setArrr2(JSON.parse(x))
    }
  }
  useEffect(()=>{
    saveButton()
  },[arrr2])
  
  function saveButton(){
    
    if(arrr2?.length>0){
      // arrr?.map((item:any)=>{
        for(let i=0;i<arrr2.length;i++){
  
          if(arrr2[i]?.value?.length >0 ){
            setButt(true)
    
          }else{
            setButt(false)
            break
          }
        }
      
    }
  }
  // function addOrder1(id: number, table: string, col: string, e: any) {
  //   const newTotals = totals.filter((item: any) => item.columnName !== col);
  //   setTotals([
  //     ...newTotals,
  //     {
  //       id: id,
  //       tableName: table,
  //       columnName: col,
  //       value: e,
  //     },
  //   ]);
  // }

  // let arrr1: any = [];
  // let arrr2: any = [];

  // orders?.map((el: any) => el.table_name === headArr[11] &&  arrr1.push(el));
  // orders?.map((el: any) => el.table_name === headArr[12] &&  arrr2.push(el));

  // const [test1, setTest1] = useState(headArr[11]);

  // function aaaa1(testing: any) {
  //   orders?.map((el: any) => el.column_name === testing && setTotals([...totals.filter((elem: any) => 
  //           elem.table_name !== el.table_name && el ),
  //         el,
  //       ])

  //   );
  // }


  // let finn=''
  // for (let i = 0; i < arrr2.length; i++) {
  //       if(arrr2[i]=== arrr2[arrr2.length - 1]) {
  //         finn = arrr2[i].column_name; 
  //       }
  // }


  // function find(){
  //   totals.map((el:any)=>el.columnName === finn && setVal(true))
  // }

  //   async function total() {
  //     try{
  //     await axios({
  //       method: "post",
  //       url: `${URL}api/v1/superAdmin/insertValues`,
  //       data: totals,
  //     });
  //     // console.log(response);
  //   }
  //   catch(error){
  //     dispatch(fetchError4(error as Error));
  // }


  // }
  function navv() {
    if (final == false) {
      sessionStorage.setItem("final", "true");
      const finalSession: any = sessionStorage.getItem("final");
      final = JSON.parse(finalSession);
      setFinal(final)
      sessionStorage.setItem("arr", JSON.stringify(headArr));

    }
  }
  function navving() {
    if (step5 == true) {
      sessionStorage.removeItem("setp5");
      sessionStorage.setItem("step5", "false");
      const stepp5: any = sessionStorage.getItem("step5");
      step5 = JSON.parse(stepp5);
      setStep5(step5)
    }
  }

  return (
    <div className="Step2">
      <div className="Aaa">
        <div>
          <select
            onChange={(e) => {
              addOrder1(e.target.value);
            }}>
            {arrr?.map((item: any) => (
              <option value={item.column_name} key={item.id}>
                {item.column_name}
              </option>
            ))}
          </select>

          <h2>{headArr[12]}</h2>
          {
            arrr2?.map((item: any, index: number) =>
              <div key={item.id}>
                <label>{item.column_name}</label>
                <input
                  value={item.value}
                  type="text"
                  onChange={(e: any) => {
                    addOrder2(item.id,e.target.value);
                    saveButton()
                  }}
                />
              </div>)
          }
        </div>
        <div className="Step5_buttons">
        <button onClick={()=>navving()}>Go back</button>
        <button   onClick={()=>{navv()}} > Next </button> 
      </div>
      </div>
    </div>
  );
};
