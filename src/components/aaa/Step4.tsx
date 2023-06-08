import "./Aaa.scss";
import { Step5 } from "./Step5";
import { useAppDispatch } from "../../hooks/redux";
import { fetchOrders } from "../../store/action/OrderAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FinalOrder from "./FinalOrder";

export const Step4 = ({
  headArr,
  stepArr,
  setStepArr,
  step4,
  step5,
  final,
  setStep4,
  setStep5,
  setFinal,
  totals,
  setTotals,
  orders,
}: any) => {
  let arr: any = sessionStorage.getItem('orders')
  useEffect(() => {
    if (arr !== null && arr !== '[]' && stepArr === null) {
      setStepArr(JSON.parse(arr))
    }
  }, [stepArr, arr])
  // const navigate = useNavigate()
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [dispatch]);

  // let arr1 = orders?.map((item: any) => item.table_name);
  // function removeDuplicates(arr1: any[]) {
  //   let headArr: any = [];
  //   for (let i = 0; i < arr1.length; i++) {
  //     if (!headArr.includes(arr1[i])) {
  //       headArr.push(arr1[i]);
  //     }
  //   }
  //   return headArr;
  // }
  // // const headArr = removeDuplicates(arr1);
  // const [butt, setButt] = useState(false)

  // let arr: any = sessionStorage?.getItem('step4_1')
  // const [arrr, setArrr] = useState(JSON?.parse(arr))
  // useEffect(() => {
  //   if (arr == null || arr == '[]') {
  //     const arr2: any = []
  //     sessionStorage.removeItem('step4_1')

  //     orders?.map((el: any) => {

  //       if (el.table_name == headArr[5]) {
  //         arr2.push(el)
  //       }

  //     })
  //     sessionStorage.setItem('step4_1', JSON.stringify(arr2))
  //   }
  // }, [orders, headArr, arr])

  // useEffect(() => {

  //   if (arr !== null && arr !== '[]' && arrr === null) {
  //     setArrr(JSON.parse(arr))
  //   }

  // }, [arr, arrr])

  // function addOrder1(value: string) {
  //   if (arrr) {
  //     const ar1 = arrr?.filter((el: any) => {
  //       if (el.column_name == value) {
  //         el.is_active = true
  //         return el
  //       }
  //     })
  //     const ar2 = [...ar1, ...arrr?.filter((el: any) => {
  //       if (el.column_name !== value) {
  //         el.is_active = false
  //         return el
  //       }
  //     })]
  //     sessionStorage.setItem('step4_1', JSON.stringify(ar2))
  //     let x: any = sessionStorage.getItem('step4_1')
  //     setArrr(JSON.parse(x))
  //   }
  // }






  // let arr2: any = sessionStorage?.getItem('step4_2')
  // const [arrr2, setArrr2] = useState(JSON?.parse(arr2))
  // useEffect(() => {
  //   if (arr2 == null || arr2 == '[]') {
  //     const arr2: any = []
  //     sessionStorage.removeItem('step4_2')

  //     orders?.map((el: any) => {

  //       if (el.table_name == headArr[6]) {
  //         arr2.push(el)
  //       }

  //     })
  //     sessionStorage.setItem('step4_2', JSON.stringify(arr2))
  //   }
  // }, [orders, headArr, arr2])

  // useEffect(() => {

  //   if (arr2 !== null && arr2 !== '[]' && arrr2 === null) {
  //     setArrr2(JSON.parse(arr2))
  //   }

  // }, [arr2, arrr2])

  // function addOrder2(value: string) {
  //   if (arrr2) {
  //     const ar1 = arrr2?.filter((el: any) => {
  //       if (el.column_name == value) {
  //         el.is_active = true
  //         return el
  //       }
  //     })
  //     const ar2 = [...ar1, ...arrr2?.filter((el: any) => {
  //       if (el.column_name !== value) {
  //         el.is_active = false
  //         return el
  //       }
  //     })]
  //     sessionStorage.setItem('step4_2', JSON.stringify(ar2))
  //     let x: any = sessionStorage.getItem('step4_2')
  //     setArrr2(JSON.parse(x))
  //   }
  // }





  // let arr3: any = sessionStorage?.getItem('step4_3')
  // const [arrr3, setArrr3] = useState(JSON?.parse(arr3))
  // useEffect(() => {
  //   if (arr3 == null || arr3 == '[]') {
  //     const arr2: any = []
  //     sessionStorage.removeItem('step4_3')

  //     orders?.map((el: any) => {

  //       if (el.table_name == headArr[7]) {
  //         arr2.push(el)
  //       }

  //     })
  //     sessionStorage.setItem('step4_3', JSON.stringify(arr2))
  //   }
  // }, [orders, headArr, arr3])

  // useEffect(() => {

  //   if (arr3 !== null && arr3 !== '[]' && arrr3 === null) {
  //     setArrr3(JSON.parse(arr3))
  //   }

  // }, [arr3, arrr3])

  // function addOrder3(value: string) {
  //   if (arrr3) {
  //     const ar1 = arrr3?.filter((el: any) => {
  //       if (el.column_name == value) {
  //         el.is_active = true
  //         return el
  //       }
  //     })
  //     const ar2 = [...ar1, ...arrr3?.filter((el: any) => {
  //       if (el.column_name !== value) {
  //         el.is_active = false
  //         return el
  //       }
  //     })]
  //     sessionStorage.setItem('step4_3', JSON.stringify(ar2))
  //     let x: any = sessionStorage.getItem('step4_3')
  //     setArrr3(JSON.parse(x))
  //   }
  // }




  // let arr4: any = sessionStorage?.getItem('step4_4')
  // const [arrr4, setArrr4] = useState(JSON?.parse(arr4))
  // useEffect(() => {
  //   if (arr4 == null || arr4 == '[]') {
  //     const arr2: any = []
  //     sessionStorage.removeItem('step4_4')

  //     orders?.map((el: any) => {

  //       if (el.table_name == headArr[8]) {
  //         arr2.push(el)
  //       }

  //     })
  //     sessionStorage.setItem('step4_4', JSON.stringify(arr2))
  //   }
  // }, [orders, headArr, arr4])

  // useEffect(() => {

  //   if (arr4 !== null && arr4 !== '[]' && arrr4 === null) {
  //     setArrr4(JSON.parse(arr4))
  //   }

  // }, [arr4, arrr4])

  // function addOrder4(value: string) {
  //   if (arrr4) {
  //     const ar1 = arrr4?.filter((el: any) => {
  //       if (el.column_name == value) {
  //         el.is_active = true
  //         return el
  //       }
  //     })
  //     const ar2 = [...ar1, ...arrr4?.filter((el: any) => {
  //       if (el.column_name !== value) {
  //         el.is_active = false
  //         return el
  //       }
  //     })]
  //     sessionStorage.setItem('step4_4', JSON.stringify(ar2))
  //     let x: any = sessionStorage.getItem('step4_4')
  //     setArrr4(JSON.parse(x))
  //   }
  // }




  // let arr5: any = sessionStorage?.getItem('step4_5')
  // const [arrr5, setArrr5] = useState(JSON?.parse(arr5))
  // useEffect(() => {
  //   if (arr5 == null || arr5 == '[]') {
  //     const arr2: any = []
  //     sessionStorage.removeItem('step4_5')

  //     orders?.map((el: any) => {

  //       if (el.table_name == headArr[9]) {
  //         arr2.push(el)
  //       }

  //     })
  //     sessionStorage.setItem('step4_5', JSON.stringify(arr2))
  //   }
  // }, [orders, headArr, arr5])

  // useEffect(() => {

  //   if (arr5 !== null && arr5 !== '[]' && arrr5 === null) {
  //     setArrr5(JSON.parse(arr5))
  //   }

  // }, [arr5, arrr5])

  // function addOrder5(value: string) {
  //   if (arrr5) {
  //     const ar1 = arrr5?.filter((el: any) => {
  //       if (el.column_name == value) {
  //         el.is_active = true
  //         return el
  //       }
  //     })
  //     const ar2 = [...ar1, ...arrr5?.filter((el: any) => {
  //       if (el.column_name !== value) {
  //         el.is_active = false
  //         return el
  //       }
  //     })]
  //     sessionStorage.setItem('step4_5', JSON.stringify(ar2))
  //     let x: any = sessionStorage.getItem('step4_5')
  //     setArrr5(JSON.parse(x))
  //   }
  // }



  // let arr6: any = sessionStorage?.getItem('step4_6')
  // const [arrr6, setArrr6] = useState(JSON?.parse(arr6))
  // useEffect(() => {
  //   if (arr6 == null || arr6 == '[]') {
  //     const arr2: any = []
  //     sessionStorage.removeItem('step4_6')

  //     orders?.map((el: any) => {

  //       if (el.table_name == headArr[10]) {
  //         arr2.push(el)
  //       }

  //     })
  //     sessionStorage.setItem('step4_6', JSON.stringify(arr2))
  //   }
  // }, [orders, headArr, arr6])

  // useEffect(() => {

  //   if (arr6 !== null && arr6 !== '[]' && arrr6 === null) {
  //     setArrr6(JSON.parse(arr6))
  //   }

  // }, [arr6, arrr6])

  // function addOrder6(value: string) {
  //   if (arrr6) {
  //     const ar1 = arrr6?.filter((el: any) => {
  //       if (el.column_name == value) {
  //         el.is_active = true
  //         return el
  //       }
  //     })
  //     const ar2 = [...ar1, ...arrr6?.filter((el: any) => {
  //       if (el.column_name !== value) {
  //         el.is_active = false
  //         return el
  //       }
  //     })]
  //     sessionStorage.setItem('step4_6', JSON.stringify(ar2))
  //     let x: any = sessionStorage.getItem('step4_6')
  //     setArrr6(JSON.parse(x))
  //   }
  // }
  // // useEffect(()=>{
  // //   saveButton()
  // // },[arrr])

  // // function saveButton(){

  // //   if(arrr2?.length>0){
  // //       for(let i=0;i<arrr2?.length;i++){
  // //         if(arrr2[i]?.value !== null ){
  // //           if(arrr2[i]?.value?.length >0 ){
  // //             setButt(true)
  // //           }else{
  // //             setButt(false)
  // //             break
  // //           }

  // //         }else{
  // //           setButt(true)
  // //         }

  // //       }

  // //   }
  // // }

  // // let arrr: any = [];
  // // orders?.map((el: any) => {
  // //   if (el.table_name === headArr[5]) {
  // //     arrr.push(el);
  // //   }
  // // });
  // // let arrr1: any = [];
  // // orders?.map((el: any) => {
  // //   if (el.table_name === headArr[6]) {
  // //     arrr1.push(el);
  // //   }
  // // });
  // // let arrr2: any = [];
  // // orders?.map((el: any) => {
  // //   if (el.table_name === headArr[7]) {
  // //     arrr2.push(el);
  // //   }
  // // });

  // // let arrr3: any = [];
  // // orders?.map((el: any) => {
  // //   if (el.table_name === headArr[8]) {
  // //     arrr3.push(el);
  // //   }
  // // });
  // // let arrr4: any = [];
  // // orders?.map((el: any) => {
  // //   if (el.table_name === headArr[9]) {
  // //     arrr4.push(el);
  // //   }
  // // });
  // // let arrr5: any = [];
  // // orders?.map((el: any) => {
  // //   if (el.table_name === headArr[10]) {
  // //     arrr5.push(el);
  // //   }
  // // });
  // const [value, setValue] = useState('');
  // const [value1, setValue1] = useState('');
  // const [value2, setValue2] = useState('');
  // const [value3, setValue3] = useState('');
  // const [value4, setValue4] = useState('');
  // const [value5, setValue5] = useState('');
  // const [test5,setTest5]=useState(headArr[10])

  // // function aaaa1(testing: any) {
  // //   orders?.map((el: any) => {
  // //     if (el.column_name === testing) {
  // //       setTotals([
  // //         ...totals.filter((elem: any) => {
  // //           if (elem.table_name !== el.table_name) {
  // //             return el;
  // //           }
  // //         }),
  // //         el,
  // //       ]);
  // //     }
  // //   });
  // // }
  // function navv() {
  //   if (step5 == false) {
  //     sessionStorage.removeItem("setp5");
  //     sessionStorage.setItem("step5", "true");
  //     const stepp5: any = sessionStorage.getItem("step5");
  //     step5 = JSON.parse(stepp5);
  //     setStep5(step5)
  //   }
  // }
  function navving() {
    if (step4 == true) {
      sessionStorage.removeItem("setp4");
      sessionStorage.setItem("step4", "false");
      const stepp4: any = sessionStorage.getItem("step4");
      step4 = JSON.parse(stepp4);
      setStep4(step4)
    }
  }
  function navv() {
    if (final == false) {
      sessionStorage.setItem("final", "true");
      const finalSession: any = sessionStorage.getItem("final");
      final = JSON.parse(finalSession);
      setFinal(final)
      sessionStorage.setItem("arr", JSON.stringify(headArr));

    }
  }
  //  console.log(arrr5);



  console.log(stepArr);
  function ChangeItem(tableName: string, id: number, index: number, e: any) {
    e.preventDefault()

   
    const newArr: any =[]
    for(let i=0;i<stepArr?.length;i++){
      console.log(index,"ssss");
      
      if(stepArr[i].table_name===tableName&&stepArr[i]?.id===id ){
        stepArr[i].is_active=!stepArr[i].is_active
        if(index === 55 && stepArr[i].is_active){
          stepArr[i+1].is_active=false
        }
        if(index === 56 && stepArr[i].is_active){
          stepArr[i-1].is_active=false
        }
        if(index === 57 && stepArr[i].is_active){
          stepArr[i+1].is_active=false
        }
        if(index === 58 && stepArr[i].is_active){
          stepArr[i-1].is_active=false
        }
        
      }
    
      newArr.push(stepArr[i]) 
    }

    sessionStorage.setItem('orders', JSON.stringify(newArr))
    setStepArr(null)

  }
  return (
    <>
      {final ? <FinalOrder/>
        // <Step5
        //   step5={step5}
        //   final={final}
        //   setStep5={setStep5}
        //   setFinal={setFinal}
        //   totals={totals}
        //   setTotals={setTotals}
        //   orders={orders}
        // />
        : (
          <div className="step4">
            <div className="step4_option">
              <div className="step4_optionDiv1">
                <h2>{headArr[10]}</h2>
                {stepArr?.length > 0 &&
                  stepArr?.map((el: any, index: number) =>
                    el?.table_name === headArr[10] &&

                    <div key={el.id} className="optionDiv1_item">
                      <input type="checkbox" id={el.id} checked={el.is_active} value={el.column_name} onChange={(e: any) => { ChangeItem(el?.table_name, el?.id, index, e) }} />
                      <label htmlFor={el.id}>
                        <span>{el.column_name}</span>
                        <span></span>
                      </label>

                    </div>)
                }

              <div className="step4_buttons">
                <button onClick={() => { navving() }}>Go back</button>
                <button onClick={() => { navv() }}>Next</button>
              </div>
              </div>
            </div>
            <div className="step4_image">
              <img src="./image/1.webp" alt="" />
            </div>
          </div>
        )}
    </>
  );
};
