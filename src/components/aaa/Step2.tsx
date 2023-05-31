import "./Aaa.scss";
import { useState, useEffect } from "react";
import { Step3 } from "./Step3";
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppDispatch } from "../../hooks/redux";

export const Step2 = ({
  step2,
  step3,
  step4,
  step5,
  final,
  setStep2,
  setStep3,
  setStep4,
  setStep5,
  setFinal,
  totals,
  setTotals,
  orders,
}: any) => {

  const dispatch = useAppDispatch();
  // const [input, setInput] = useState([0]);
  // const [val, setVal] = useState<any>(false)



  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);



  let arr1 = orders?.map((item: any) => item.table_name);
  function removeDuplicates(arr1: any[]) {
    let headArr: any = [];
    for (let i = 0; i < arr1?.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }
  const headArr = removeDuplicates(arr1);



  let arr: any = sessionStorage?.getItem('step2_1')
  const [arrr, setArrr] = useState(JSON?.parse(arr))
  const [butt,setButt]=useState(false)
  useEffect(() => {
    if (arr == null || arr == '[]') {
      const arr2: any = []
      sessionStorage.removeItem('step2_1')

      orders?.map((el: any) => {

        if (el.table_name == headArr[1]) {
          arr2.push(el)
        }

      })
      sessionStorage.setItem('step2_1', JSON.stringify(arr2))
    }
  }, [orders, headArr, arr])

  useEffect(() => {

    if (arr !== null && arr !== '[]' && arrr === null) {
      setArrr(JSON.parse(arr))
    }

  }, [arr, arrr])
  console.log(arrr);
  
useEffect(()=>{
  saveButton()
},[arrr])

function saveButton(){
  
  if(arrr2?.length>0){
      for(let i=0;i<arrr2?.length;i++){

        if(arrr2[i]?.value?.length >0 ){
          setButt(true)

        }else{
          setButt(false)
          break
        }
      }
    
  }
}

  function addOrder1(value:string) {
    if (arrr) {
      const ar1 = arrr?.filter((el: any) => {
        if(el.column_name == value){
          el.is_active=true
          return el
        }
      })
      const ar2 = [...ar1,...arrr?.filter((el: any) => {
        if(el.column_name !== value){
          el.is_active=false
          return el
        }
      })]
      sessionStorage.setItem('step2_1', JSON.stringify(ar2))
      let x: any = sessionStorage.getItem('step2_1')
      setArrr(JSON.parse(x))
    }
  }
  
  function addOrder2(id: number, e: any) {
    if (arrr2) {
      let ar2 = arrr2?.map((el: any) => {
        if (el.id == id) {
          el.value = e
        }
        return el
      })
      sessionStorage.setItem('step2_2', JSON.stringify(ar2))
      let x: any = sessionStorage.getItem('step2_2')
      setArrr2(JSON.parse(x))
    }
  }

  let arr2: any = sessionStorage?.getItem('step2_2')
  const [arrr2, setArrr2] = useState(JSON?.parse(arr2))

  useEffect(() => {
    if (arr2 == null || arr2 == '[]') {
      const arr2: any = []
      sessionStorage.removeItem('step2_2')

      orders?.map((el: any) => {

        if (el.table_name == headArr[2]) {
          arr2.push(el)
        }

      })
      sessionStorage.setItem('step2_2', JSON.stringify(arr2))
    }
  }, [orders, headArr, arr2])

  useEffect(() => {

    if (arr2 !== null && arr2 !== '[]' && arrr === null) {
      setArrr2(JSON.parse(arr2))
    }

  }, [arr2, arrr2])

  const [test, setTest] = useState(headArr[1]);

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

  // let arrr: any = [];
  // let arrr1: any = [];

  // orders?.map((el: any) => el.table_name === headArr[1] && arrr.push(el));
  // orders?.map((el: any) => el.table_name === headArr[2] && arrr1.push(el));




  // let fin = ''
  // for (let i = 0; i < arrr1.length; i++) {
  //   if (arrr1[i] === arrr1[arrr1.length - 1]) {
  //     fin = arrr1[i].column_name;
  //   }
  // }



  // function addOrder2(testing: any) {
  //   arrr?.map((el: any) => {
  //     if (el.column_name === testing) {
  //       // const newTotals = totals.filter((item: any) => item.columnName !== col);
  //       const strTotals: any = JSON.stringify([...totals.filter((elem: any) =>
  //         elem.table_name !== el.table_name && el), el])
  //       sessionStorage.removeItem('totals')
  //       sessionStorage.setItem('totals', strTotals)
  //       const sessionTotals: any = sessionStorage.getItem('totals')
  //       setTotals(JSON.parse(sessionTotals))
  //     }
  //   }
  //   )
  //   // setTotals([...totals.filter((elem:any)=>
  //         // elem.table_name !== el.table_name && el),el]))
  // }
  // function find() {
  //   totals.map((el: any) => el.columnName === fin && setVal(true))
  // }

  function navv() {
    if (step3 == false) {
      sessionStorage.removeItem("setp3");
      sessionStorage.setItem("step3", "true");
      const stepp3: any = sessionStorage.getItem("step3");
      step3 = JSON.parse(stepp3);
      setStep3(step3)
    }
  }
  function navving() {
    if (step2 == true) {
      sessionStorage.removeItem("setp2");
      sessionStorage.setItem("step2", "false");
      const stepp2: any = sessionStorage.getItem("step2");
      step2 = JSON.parse(stepp2);
      setStep2(step2)
    }
  }

  return (
    <div>
      {step3 ? (
        <Step3
          step3={step3}
          step4={step4}
          step5={step5}
          final={final}
          setStep3={setStep3}
          setStep4={setStep4}
          setStep5={setStep5}
          setFinal={setFinal}
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

                  <div className="selectDiv" >
                    <select 
                    onChange={
                      (e) => { addOrder1(e.target.value);
                         setTest(e.target.value)
                         }}
                      >
                        {/* <option value={headArr[1]}>{headArr[1]}</option> */}
                      {arrr?.map((item: any, index: number) => (
                        <option
                          value={item.column_name}
                          key={item.id}
                        >

                          {item.column_name + ":  "}
                          {"amunt  " + item.price_user}

                        </option>
                      ))}
                    </select>

                     <h2>{headArr[2]}</h2>
                    {
                      arrr2?.map((item: any, index: number) =>
                          <div key={item.id}>
                            <label>{item.column_name}</label>
                            <input
                              value={item.value}
                              type="text"
                              onChange={(e: any) => {
                                addOrder2(
                                  item.id,
                                  e.target.value
                                );
                                saveButton()
                                }}/>
                          </div>
                      )
                    }
                  </div>
                </div>
              }
            </div>
          <button onClick={() => {navv()}} disabled={!butt} > save </button> 
          <button onClick={() => { navving() }}>go back</button>

            {/* {val && (<>
              <button onClick={() => { navv() }}>save</button>
            </>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};
