import "./Steps.scss";
import { useState, useEffect } from "react";
import { Step2 } from "./Step2";
export const Step1 = ({
  
  headArr,
  stepArr,
  setStepArr,
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

  let arr:any=sessionStorage.getItem('orders')
  const [btnCheck,setBtnCheck]=useState(false);
useEffect(()=>{
  if(arr !==null && arr !== '[]'&& stepArr===null ){
    setStepArr(JSON.parse(arr))
  }
},[stepArr,arr])

  function ChangeItem(tableName: string, id: number,index:number,e:any) {
 
      e.preventDefault();
    
      // Create a mutable copy of the stepArr object
      const newArr = [...stepArr];
    
      if (newArr.length > 0) {
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].table_name === tableName && newArr[i].id === id) {
            // Update the is_active property on the mutable copy
            newArr[i] = { ...newArr[i], is_active: !newArr[i].is_active };
    
            if (index === 0 && newArr[i].is_active) {
              newArr[i+1] = { ...newArr[i+1], is_active: false };
            }
            if (index === 1 && newArr[i].is_active) {
              newArr[i - 1] = { ...newArr[i - 1], is_active: false };

            }
            if (index === 6 && newArr[i].is_active) {
              newArr[i + 1] = { ...newArr[i + 1], is_active: false };

            }
            if (index === 7 && newArr[i].is_active) {
              newArr[i - 1] = { ...newArr[i - 1], is_active: false };

            }
            if (index === 10 && newArr[i].is_active) {
              newArr[i + 1] = { ...newArr[i + 1], is_active: false };

            }
            if (index === 11 && newArr[i].is_active) {
              newArr[i - 1] = { ...newArr[i - 1], is_active: false };

            }
          }
        }
    
        sessionStorage.removeItem("orders");
        sessionStorage.setItem("orders", JSON.stringify(newArr));
        setStepArr(null);
      }
    }
    
  function ChengeInput(elem: string, tableName: string, id: number) {
    
    if(stepArr.length>0){

      const newArr: any = stepArr.map((el: any) => {
        if (el.table_name === tableName && el.id === id) {
         
          el = {...el, value : elem}
        }
        return el
      
      }
      
      )
      sessionStorage.setItem('orders', JSON.stringify(newArr))
      setStepArr(newArr)

    }

  }


  useEffect(()=>{
    saveButton()
  },[stepArr,btnCheck])

  function saveButton(){
        for(let i=0;i<stepArr?.length;i++){
          if(stepArr[i]?.table_name===headArr[1]){
          if(stepArr[i]?.value?.length >0 ){
            setBtnCheck(true)
          }else{
            setBtnCheck(false)
            break
          }
        }
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
  
    

  return (
    <div className="steping">
      {step2 === true ? (
        <Step2
          headArr={headArr}
          stepArr={stepArr}
          setStepArr={setStepArr}
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
        />
      ) : (
        <div className="step1">
          <div className="step1_option">
            <div className="step1_optionDiv1">
              <h2>{headArr[0]}</h2>
      
              {stepArr?.length>0 && 
                stepArr?.map((el: any,index:number) =>{
                  if(el?.table_name === headArr[0] ){
                    return <div key={el.id} className="optionDiv1_item">
                      <p>{el?.column_name}</p>
                    <input type="checkbox" id={el?.id} checked={el?.is_active} value={el?.column_name} onChange={(e:any)=>{ChangeItem(el?.table_name,el?.id,index,e) }} />
                      <label htmlFor={el?.id}>
                        <span></span>
                      </label>


                  </div>
                  }

                }

                  )
              }

            </div>
            <div className="step1_optionDiv2">
              <h2>{headArr[1]}</h2>
              {
                stepArr?.length >0 &&
                stepArr?.map((el: any) =>
                  el?.table_name === headArr[1] &&
                  <div className="optionDiv2_item">
                    <span>{el.column_name}</span>
                    <input type="text" placeholder={el.column_name} value={el.value} onChange={(e) =>{ ChengeInput(e.target.value, el.table_name, el.id)}} />
                  </div>
                )
              }
              <div className="step1_buttons">
                <button disabled={!btnCheck} onClick={()=>{navv()}}>Next</button>
              </div>
            </div>
          </div>
          <div className="step1_image">
            <img src="../../../images/glas.png" alt="image not found" />
          </div>
        </div>
      )}
    </div>
  );
}