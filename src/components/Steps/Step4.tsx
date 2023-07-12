import "./Steps.scss";
import { useEffect, useState } from "react";
import FinalOrder from "./FinalOrder";

export const Step4 = ({
  headArr,
  stepArr,
  setStepArr,
  step4,
  final,
  setStep4,
  setFinal,

}: any) => {
  let arr: any = sessionStorage.getItem('orders')
  useEffect(() => {
    if (arr !== null && arr !== '[]' && stepArr === null) {
      setStepArr(JSON.parse(arr))
    }
  }, [stepArr, arr])
 
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



  function ChangeItem(tableName: string, id: number, index: number, e: any) {
    e.preventDefault()

   
    const newArr: any =[]
    for(let i=0;i<stepArr?.length;i++){
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
              <img src="../../../images/3.webp" alt="" />
            </div>
          </div>
        )}
    </>
  );
};
