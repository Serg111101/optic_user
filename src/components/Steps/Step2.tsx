/*eslint-disable*/

import "./Steps.scss";
import { useState, useEffect } from "react";
import { Step3 } from "./Step3";


export const Step2 = ({
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
  }, [stepArr,arr])


  const [btnCheck, setBtnCheck] = useState(false)
  const [clip, setClip] = useState(false)

  function ChangeItem(tableName: string, id: number) {

    if(stepArr.length>0){


    const newArr: any = stepArr?.map((el: any) => {
      if (el.table_name === tableName && el.id === id) {

        el.is_active = !el.is_active
        setClip(el.is_active)

        if (el.is_active === true) {

          stepArr.length>0&&
          stepArr?.map((elem: any) => {
            if (elem.table_name === headArr[2]) {
              elem.is_active = false
            }
            return elem
          })
        }else{
          stepArr.length>0&&
          stepArr?.map((elem: any) => {
            if (elem.table_name === headArr[3]&&elem?.value!=='') {
              elem.value=null
            }
            return elem
          })
        }
      }
      return el
    })
    sessionStorage.setItem('orders', JSON.stringify(newArr))
    setStepArr(null)


    }

  }
  function ChangeItem2(tableName: string, id: number) {

    if(stepArr?.length>0){
      const newArr: any = stepArr?.map((el: any) => {
        if (el.table_name === tableName) {
          if (el.id === id) {
            el.is_active = true
          } else {
            el.is_active = false
          }
        }
        return el
      })
      sessionStorage.setItem('orders', JSON.stringify(newArr))
      setStepArr(null)
  
  
    }
    
     }
  function ChangeInput(elem: string, tableName: string, id: number) {



    if(stepArr.length>0){
      const newArr: any = stepArr?.map((el: any) => {
        if (el.table_name === tableName && el.id === id) {
          el.value = elem
        }
        return el
      })
      sessionStorage.setItem('orders', JSON.stringify(newArr))
      setStepArr(newArr)
    }
    
  }
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
  useEffect(() => {
    saveButton()
  }, [stepArr, btnCheck])

  let btn1 = false
  let btn2 = false
  function saveButton() {
    if (clip) {
      for (let i = 0; i < stepArr?.length; i++) {
        if (stepArr[i].table_name === headArr[3] && stepArr[i]?.is_active === null) {
          if (stepArr[i]?.value !== null && stepArr[i]?.value !== '') {
            btn1 = true
          }
          else {
            btn1 = false
            break
          }
        }
      }
    } else {
      for (let i = 0; i < stepArr?.length; i++) {
        if (stepArr[i]?.table_name === headArr[2]) {
          if (stepArr[i].is_active) {
            btn1 = true
            break
          }
          else {
            btn1 = false
          }
        }
      }
    }
    for (let i = 0; i < stepArr?.length; i++) {
      if (stepArr[i].table_name === headArr[4]) {
        if (stepArr[i]?.is_active === true) {
          btn2 = true
          break
        } else {
          btn2 = false
        }
      }
    }
    setBtnCheck(btn1 && btn2)
  }

  return (
    <div>
      {step3 ? (
        <Step3
          headArr={headArr}
          stepArr={stepArr}
          setStepArr={setStepArr}
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
        <div className="step2">
          <div className="step2_option">
            <div className="step2_optionDiv1">
              <h2>{headArr[2]}</h2>
              {
                stepArr?.length>0&&
                stepArr?.map((el: any) => {
                  if (el?.table_name === headArr[3] && el?.is_active !== null) {
                    if (el.is_active !== clip) { setClip(el.is_active) }
                    return <div key={el.id} className="optionDiv1_item">
                      <input type="checkbox" id={el.column_name} checked={el.is_active} value={el.column_name} onChange={() => { ChangeItem(el.table_name, el.id) }} />
                      <label htmlFor={el.column_name}>
                        <h3>{el.table_name}</h3>
                        <span></span>
                      </label>
                    </div>
                  }
                })
              }
              <div className="optionDiv1_item_1">
                {stepArr?.length>0&&clip ? stepArr?.map((element: any) =>
                  element?.table_name === headArr[3] && element?.is_active === null &&
                  <div key={element.id} className="item_input">
                    <span>{element.column_name}</span>
                    <input type="text" value={element.value} onChange={(e: any) => ChangeInput(e.target.value, element.table_name, element.id)} />
                  </div>)
                  :
                  stepArr?.length>0&&
                  stepArr?.map((elem: any) =>
                    elem?.table_name === headArr[2] &&
                    <div key={elem.id} >
                      <input type="checkbox" id={elem.column_name} checked={elem.is_active} value={elem.column_name} onChange={() => { ChangeItem2(elem.table_name, elem.id) }} />
                      <label htmlFor={elem.column_name}>
                        <span>{elem.column_name}</span>
                        <span></span>
                      </label>
                    </div>)
                }
              </div>
            </div>
            <div className="step2_optionDiv2">
              <h2>{headArr[4]}</h2>
              <div className="step2_optionDiv2_2">{
                stepArr?.length>0&&
                stepArr?.map((el: any) =>
                  el?.table_name === headArr[4] && (

                    <div className={el.is_active ? "optionDiv2_item_active" : "optionDiv2_item"} key={el.id} onClick={() => { ChangeItem2(el.table_name, el.id) }} >
                      <span>{el.column_name}</span>
                      <img src={el.value} alt="" />
                    </div>)
                )
              }
              </div>
              <div className="step2_buttons">
                <button onClick={() => { navving() }}>Go back</button>
                <button disabled={!btnCheck} onClick={() => { navv() }}>Next</button>

              </div>
            </div>
          </div>
          <div className="step2_image">
            {stepArr?.length>0 &&  stepArr?.map((el: any) =>
              el?.table_name === headArr[4] && el?.is_active &&
              <img src={el.value} alt="" />
            )
            }
          </div>
        </div>
      )}
    </div>
  );
};
