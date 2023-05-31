import "./Aaa.scss";
import { useEffect, useState } from "react";
import { Step4 } from "./Step4";
import { useAppDispatch } from "../../hooks/redux";
import { fetchOrders } from "../../store/action/OrderAction";

export const Step3 = ({
  step3,
  step4,
  step5,
  final,
  setStep3,
  setStep4,
  setStep5,
  setFinal,
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
    for (let i = 0; i < arr1?.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }
  const headArr = removeDuplicates(arr1);

  let arr: any = sessionStorage?.getItem('step3_1')
  const [arrr, setArrr] = useState(JSON?.parse(arr))
  const [butt,setButt]=useState(false)
  useEffect(() => {
    if (arr == null || arr == '[]') {
      const arr2: any = []
      sessionStorage.removeItem('step3_1')

      orders?.map((el: any) => {

        if (el.table_name == headArr[3]) {
          arr2.push(el)
        }

      })
      sessionStorage.setItem('step3_1', JSON.stringify(arr2))
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
        if(arrr2[i]?.value !== null ){
          if(arrr2[i]?.value?.length >0 ){
            setButt(true)
          }else{
            setButt(false)
            break
          }

        }else{
          setButt(true)
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
      sessionStorage.setItem('step3_1', JSON.stringify(ar2))
      let x: any = sessionStorage.getItem('step3_1')
      setArrr(JSON.parse(x))
    }
  }
  
  function addOrder2(id: number, e: any) {
    if (arrr2) {
      let ar2 = arrr2?.map((el: any) => {
        if(el.is_active!==null){
        if(el.id===id){
          el.is_active =true
          return el
        }else {
          el.is_active = false
          return el
        }}else{
          return el
        }
      })
      sessionStorage.setItem('step3_2', JSON.stringify(ar2))
      let x: any = sessionStorage.getItem('step3_2')
      setArrr2(JSON.parse(x))
    }
  
  }

  function addOrder3(id:number,event:any){
    if (arrr2) {
      let ar2 = arrr2?.map((el: any) => {
        if(el.is_active ===null&&el.id===id){
          el.value=event
          return el
        }else{
          return el
        }
      })
      sessionStorage.setItem('step3_2', JSON.stringify(ar2))
      let x: any = sessionStorage.getItem('step3_2')
      setArrr2(JSON.parse(x))
    }
  }

  let arr2: any = sessionStorage?.getItem('step3_2')
  const [arrr2, setArrr2] = useState(JSON?.parse(arr2))
  console.log(arrr2);

  useEffect(() => {
    if (arr2 == null || arr2 == '[]') {
      const arr2: any = []
      sessionStorage.removeItem('step3_2')

      orders?.map((el: any) => {

        if (el.table_name == headArr[4]) {
          arr2.push(el)
        }

      })
      sessionStorage.setItem('step3_2', JSON.stringify(arr2))
    }
  }, [orders, headArr, arr2])

  useEffect(() => {

    if (arr2 !== null && arr2 !== '[]' && arrr === null) {
      setArrr2(JSON.parse(arr2))
    }

  }, [arr2, arrr2])

  function navv(){
    if(step4==false){
      sessionStorage.removeItem("setp4");
      sessionStorage.setItem("step4","true");
      const stepp4:any = sessionStorage.getItem("step4");
      step4=JSON.parse(stepp4); 
      setStep4(step4)
    } 
  }
  function navving(){
    if(step3==true){
      sessionStorage.removeItem("setp3");
      sessionStorage.setItem("step3","false");
      const stepp3:any = sessionStorage.getItem("step3");
      step3=JSON.parse(stepp3); 
      setStep3(step3)
    } 
  }
   
  return (
    <div>
      {step4 ? (
        <Step4
          step4={step4}
          step5={step5}
          final={final}
          setStep4={setStep4}
          setStep5={setStep5}
          setFinal={setFinal}
          totals={totals}
          setTotals={setTotals}
          orders={orders}
        />
      ) : (
        <div className="Step3">
          <div className="Aaa">
            <div>
              {
                <div>
                  <h2>{headArr[3]}</h2>
                  <div className="step3_map" >
                    <select onChange={
                      (e) => {
                        addOrder1(e.target.value)
                      }
                      }>
                      {arrr?.map((item: any, index: number) => (
                        <option value={item.column_name} key={item.id}>
                          {item.column_name}
                        </option>
                      ))}
                    </select>
                     <h2>{headArr[4]}</h2>
                    {
                      arrr2?.map((item: any) => 
                        item?.is_active === null&&
                          
                              <div key={item?.id}>
                              <label key={item?.id} >{item?.column_name}</label>
  
                                <input
                                  type="text"
                                  value={item?.value}
                                  onChange={(e: any) => {
                                    addOrder3(
                                      item.id,
                                      e.target.value
                                    );
                                    saveButton()
                                  }}
                                />
                              </div>
                      )}{
                      arrr2?.map((item: any, index: number) => 
                        item?.is_active !== null&&
                        <label onChange={() => {addOrder2(item.id,item.column_name)}}>
                        <input type="radio" name="check" id="" checked={item.is_active} value={item.is_active} />{item.column_name}</label>
                      )
                      }
                  </div>
                </div>
              }
            </div>
            <>
              <button disabled={!butt} onClick={() => { navv()}}>
                save
              </button>
              <button onClick={()=>{navving()}}>go back</button></>
            
          </div>
        </div>
      )}
    </div>
  );
};
