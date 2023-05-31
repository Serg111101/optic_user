import "./Aaa.scss";
import { useState, useEffect } from "react";
import { Step2 } from "./Step2";
import { fetchOrders } from "../../store/action/OrderAction";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
export const Step1 = ({
  step2,
  step3,
  step4,
  step5,
  final,
  setStep2,
  setStep3,
  setStep4,
  setStep5,
  setFinal
}: any) => {

  const { orders }: any = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const [butt,setButt]=useState(false)

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch])
console.log(orders);

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
  let arr: any = sessionStorage?.getItem('step1_1')
  const [arrr, setArrr] = useState(JSON?.parse(arr))

  useEffect(() => {
    if (arr == null || arr == '[]') {
      const arr2: any = []
      sessionStorage.removeItem('step1_1')

      orders?.map((el: any) => {

        if (el.table_name == headArr[0]) {
          arr2.push(el)
        }

      })
      sessionStorage.setItem('step1_1', JSON.stringify(arr2))
    }
  }, [orders, headArr, arr])

  useEffect(() => {

    if (arr !== null && arr !== '[]' && arrr === null) {
      setArrr(JSON.parse(arr))
    }

  }, [arr, arrr])
useEffect(()=>{
  saveButton()
},[arrr])

function saveButton(){
  
  if(arrr?.length>0){
    // arrr?.map((item:any)=>{
      for(let i=0;i<arrr.length;i++){

        if(arrr[i]?.value?.length >0 ){
          setButt(true)
          console.log(butt)
  
        }else{
          setButt(false)
          break
          // console.log(butt)
           
        }
      }
    
  }
}

  function addOrder1(id: number, e: any) {
    if (arrr) {
      let ar2 = arrr?.map((el: any) => {
        if (el.id == id) {
          el.value = e
        }
        return el
      })
      sessionStorage.setItem('step1_1', JSON.stringify(ar2))
      let x: any = sessionStorage.getItem('step1_1')
      setArrr(JSON.parse(x))
    }
  }


  function navv() {
    if (step2 === false) {
      sessionStorage.removeItem("setp2");
      sessionStorage.setItem("step2", "true");
      const stepp2: any = sessionStorage.getItem("step2");
      step2 = JSON.parse(stepp2);
      setStep2(step2)
    }
  }

  console.log(orders);
  

  return (
    <div className="steping">
      {step2 === true ? (
        <Step2
          step2={step2}
          step3={step3}
          step4={step4}
          step5={step5}
          final={final}
          setStep2={setStep2}
          setStep3={setStep3}
          setStep4={setStep4}
          setStep5={setStep5}
          setFinal={setFinal}
          // totals={totals}
          // setTotals={setTotals}
          orders={orders}
        />
      ) : (
        <div className="Aaa">
          <div  >
            {
              <div key={headArr[0]}>
                <h2>{headArr[0]}</h2>
                {arrr?.map((item: any, index: number) => 
                  // input.includes(index) &&
                    <div key={item.id}>
                      <label>{item.column_name}</label>
                      <input
                        value={item?.value}
                        type="text"
                        onChange={(e: any) => {
                          addOrder1(
                            item.id,
                            e.target.value
                          );
                        }}
                      />
                    </div>)}
              </div>}
          </div>
          <button onClick={() => {navv()}} disabled={!butt} > save </button> 
        </div>
      )}
    </div>
  );
}